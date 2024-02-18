"use client";
import Quote from "../components/Quote"
import WordModal from "../components/WordModal";
import React, { useState, useEffect } from 'react';

export default function QuotesScroll(props) {
    const [index, setIndex] = useState(0);
    const [locked, setLocked] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [selectedWord, setSelectedWord] = useState();


    const slideUp = () => {
        if (locked) {
            return
        }
        setLocked(true);
        const media1 = document.getElementById('media1');
        const media2 = document.getElementById('media2');

        scroll(media1, 55);
        scroll(media2, 55, () => {
            const parentDiv = document.getElementById("medias");
            const media3 = parentDiv.lastElementChild;
            parentDiv.removeChild(media3);
            parentDiv.insertBefore(media3, parentDiv.firstChild);
            media1.style.transform = "";
            media2.style.transform = "";

            media1.id = "media2";
            media2.id = "media3";
            media3.id = "media1";

            const newIndex = getPrevIndex(index);
            setMedia(media3, getPrevIndex(newIndex));
            setMedia(media2, getNextIndex(newIndex));

            setIndex(newIndex);
            setLocked(false);
        });
    }

    const slideDown = () => {
        if (locked) {
            return
        }
        setLocked(true);
        const media2 = document.getElementById('media2');
        const media3 = document.getElementById('media3');

        scroll(media2, -55);
        scroll(media3, -55, () => {
            const parentDiv = document.getElementById("medias");
            // Récupérer la première div enfant
            const media1 = parentDiv.firstElementChild;
            parentDiv.removeChild(media1);
            parentDiv.appendChild(media1);
            media3.style.transform = "";
            media2.style.transform = "";

            media3.id = "media2";
            media2.id = "media1";
            media1.id = "media3";

            const newIndex = getNextIndex(index);
            setMedia(media1, getNextIndex(newIndex));
            setMedia(media2, getPrevIndex(newIndex));

            setIndex(newIndex);
            setLocked(false);
        });
    }

    function scroll(element, distance, callback) {
        const duration = 500;
        const startTime = performance.now();
    
        function update(time) {
          const elapsed = time - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easing = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
          const ease = easing(progress);
          const translateY = ease * distance;
    
          element.style.transform = `translateY(${translateY}vh)`;
    
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            if (callback) {
                callback(); // Appel de la fonction de rappel lorsque l'animation est terminée
            }
          }
        }
    
        requestAnimationFrame(update);
    }

    const setMedia = (media, _index) => {
        console.log(media.getElementsByClassName("date-quote")[0], props.quotes[_index][1]["date"]);
        media.getElementsByClassName("text-quote")[0].textContent = props.quotes[_index][1]["text"];
        media.getElementsByClassName("author-quote")[0].textContent = props.quotes[_index][1]["author"];
        media.getElementsByClassName("title-quote")[0].textContent = props.quotes[_index][1]["title"];
        media.getElementsByClassName("date-quote")[0].textContent = props.quotes[_index][1]["date"];

        media.getElementsByTagName("h2")[0].textContent = props.quotes[_index][0].toUpperCase();
    }

    const getNextIndex = i => {
        const quotesLength = props.quotes.length
        return (i == (quotesLength - 1)) ? 0 : (i + 1)
    }

    const getPrevIndex = i => {
        return (i == 0) ? (props.quotes.length - 1) : (i - 1)
    }

    useEffect(() => {
        const indices = [getPrevIndex(index), index, getNextIndex(index)]
        for (let i = 0; i < 3; i++) {
            setMedia(document.getElementById("media" + (i + 1)), indices[i])
        }
        setLoaded(true);
    }, [])

    return (
        <div className="w-[100vw] flex flex-col items-center h-[65vh]">
            <div className="text-white cursor-pointer first-bg rounded-3xl p-[1vh] border-2 border-slate-900 hover:bg-slate-900" onClick={slideUp}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[2vh] h-[2vh]">
                    <path d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
            </div>

            <div id="medias" className="overflow-hidden h-[55vh] w-[100vw] flex flex-col items-center">
                <div id="media1" className="mediaContainer">
                    <Quote definitions={props.definitions} loaded={loaded} setSelectedWord={setSelectedWord}></Quote>
                </div>
                <div id="media2" className="mediaContainer">
                    <Quote definitions={props.definitions} loaded={loaded} setSelectedWord={setSelectedWord}></Quote>
                </div>
                <div id="media3" className="mediaContainer">
                    <Quote definitions={props.definitions} loaded={loaded} setSelectedWord={setSelectedWord}></Quote>
                </div>
            </div>

            <div className="text-white cursor-pointer first-bg mb-[5vh] rounded-3xl p-[1vh] border-2 border-slate-900 hover:bg-slate-900" onClick={slideDown}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[2vh] h-[2vh]">
                    <path d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                </svg>
            </div>

            <WordModal selectedWord={selectedWord} canBeRemovedFromLearningWords="true"></WordModal>
        </div>
    )
}