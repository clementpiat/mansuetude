"use client";

import React, { useState, useEffect } from 'react';
import YoutubeScroll from './YoutubeScroll';


export default function YoutubeScrollWrap(props) {
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

    const getLinks = () => {
        if (typeof window !== 'undefined') {
            let _learningWords = localStorage.getItem("learningWords");
            _learningWords = _learningWords ? JSON.parse(_learningWords) : [];

            let _links = _learningWords.map(
                (word) => props.youtubeLinks[word].map((_link) => [word, youtubeLinkToEmbedLink(_link)])
            )
            _links = _links.reduce((x, y) => x.concat(y))
            return shuffle(_links)
        }

        return []
    }

    const links = getLinks()

    return (
        <YoutubeScroll links={links} definitions={props.definitions}></YoutubeScroll>
    )
}