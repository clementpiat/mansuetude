"use client";

import React, { useState, useEffect } from 'react';
import YoutubeScroll from './YoutubeScroll';
import QuoteScroll from './QuotesScroll';


export default function ContentScrollWrap(props) {
    const [contentType, setContentType] = useState("quotes");

    const youtubeLinkToEmbedLink = (youtubeLink) => {
        const secBefore = 3;
        var embedLink = youtubeLink.replace("watch?v=", "embed/")
        var timeStr = embedLink.split("&t=")[1].slice(0,-1)
        var startTime = Math.max(0, parseInt(timeStr) - secBefore)
        embedLink = embedLink.replace("&t=" + timeStr + "s", "?start=" + startTime)
  
        return embedLink
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    const getData = () => {
        if (typeof window !== 'undefined') {
            let _learningWords = localStorage.getItem("learningWords");
            _learningWords = _learningWords ? JSON.parse(_learningWords) : [];
            const placeholderWord = "mansuétude";
            _learningWords = _learningWords.length ?  _learningWords : [placeholderWord];

            // links
            let _links = _learningWords.map(
                (word) => (
                    props.youtubeLinks[word]
                    ? props.youtubeLinks[word].map(_link => [word, youtubeLinkToEmbedLink(_link)])
                    : []
                )
            )
            _links = _links.reduce((x, y) => x.concat(y))
            _links = (
                _links.length
                ? _links
                : props.youtubeLinks[placeholderWord].map(_link => [placeholderWord, youtubeLinkToEmbedLink(_link)])
            )

            // quotes
            let _quotes = _learningWords.map(
                (word) => props.definitions[word] ? props.definitions[word].definitions.map(
                    _definition => _definition.examples.map(example => [word, example])
                ).reduce((x, y) => x.concat(y)) : []
            ).reduce((x, y) => x.concat(y))

            return [shuffle(_links), shuffle(_quotes)]
        }

        return [], []
    }

    let data = getData()
    const links = data[0]
    const quotes = data[1]
    console.log(quotes)

    return (
        <div className="w-[100vw] flex flex-col items-center h-[70vh]">
            <div className="h-[7vh] flex flex-row justify-center items-center pb-[3vh]">
                <div className="h-[4vh] rounded-xl flex flex-row justify-center items-center text-slate-50 text-sm">
                    <span onClick={() => setContentType("youtube")} className={"section-selector-item border-2 rounded-l-full " + (contentType == "youtube" ? "second-bg" : "cursor-pointer")}>
                        Youtube
                    </span>
                    <span onClick={() => setContentType("quotes")} className={"section-selector-item border-2 rounded-r-full border-l-0 " + (contentType == "quotes" ? "second-bg" : "cursor-pointer")}>
                        Citations
                    </span>
                </div>
            </div>

            {
                contentType == "youtube"
                ? <YoutubeScroll links={links} definitions={props.definitions}></YoutubeScroll>
                : <QuoteScroll quotes={quotes} definitions={props.definitions}></QuoteScroll>
            }
            
        </div>
    )
}