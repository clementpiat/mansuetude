"use client";
import Video from "../components/Video"
import React, { useState, useEffect } from 'react';

export default function YoutubeScroll(props) {
    const [index, setIndex] = useState(0);
    const [locked, setLocked] = useState(false);
    const [loaded, setLoaded] = useState(false);


    const slideUp = () => {
        if (locked) {
            return
        }
        setLocked(true);
        const vid1 = document.getElementById('vid1');
        const vid2 = document.getElementById('vid2');

        vid1.getElementsByTagName("iframe")[0].src += "&autoplay=1"
        vid2.getElementsByTagName("iframe")[0].src += "&mute=1"

        scroll(vid1, 60);
        scroll(vid2, 60, () => {
            const parentDiv = document.getElementById("videos");
            // Récupérer la première div enfant
            const vid3 = parentDiv.lastElementChild;
            parentDiv.removeChild(vid3);
            parentDiv.insertBefore(vid3, parentDiv.firstChild);
            vid1.style.transform = "";
            vid2.style.transform = "";

            vid1.id = "vid2";
            vid2.id = "vid3";
            vid3.id = "vid1";

            const newIndex = getPrevIndex(index);
            setVideo(vid3, getPrevIndex(newIndex));
            setVideo(vid2, getNextIndex(newIndex));

            setIndex(newIndex);
            setLocked(false);
        });
    }

    const slideDown = () => {
        if (locked) {
            return
        }
        setLocked(true);
        const vid2 = document.getElementById('vid2');
        const vid3 = document.getElementById('vid3');

        vid2.getElementsByTagName("iframe")[0].src += "&mute=1"
        vid3.getElementsByTagName("iframe")[0].src += "&autoplay=1"

        scroll(vid2, -60);
        scroll(vid3, -60, () => {
            const parentDiv = document.getElementById("videos");
            // Récupérer la première div enfant
            const vid1 = parentDiv.firstElementChild;
            parentDiv.removeChild(vid1);
            parentDiv.appendChild(vid1);
            vid3.style.transform = "";
            vid2.style.transform = "";

            vid3.id = "vid2";
            vid2.id = "vid1";
            vid1.id = "vid3";

            const newIndex = getNextIndex(index);
            setVideo(vid1, getNextIndex(newIndex));
            setVideo(vid2, getPrevIndex(newIndex));

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

    const setVideo = (vid, _index) => {
        vid.getElementsByTagName("iframe")[0].setAttribute("src", props.links[_index][1]);
        vid.getElementsByTagName("h2")[0].textContent = props.links[_index][0].toUpperCase();
    }

    const getNextIndex = i => {
        const linksLength = props.links.length
        return (i == (linksLength - 1)) ? 0 : (i + 1)
    }

    const getPrevIndex = i => {
        return (i == 0) ? (props.links.length - 1) : (i - 1)
    }

    useEffect(() => {
        const indices = [getPrevIndex(index), index, getNextIndex(index)]
        for (let i = 0; i < 3; i++) {
            setVideo(document.getElementById("vid" + (i + 1)), indices[i])
        }
        setLoaded(true);
    }, [])

    return (
        <div className="w-[100vw] flex flex-col items-center h-[80vh]">
            <div className="text-white cursor-pointer second-bg-light rounded-3xl p-[1vh]" onClick={slideUp}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[2vh] h-[2vh]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
            </div>

            <div id="videos" className="overflow-hidden h-[60vh] w-[100vw] flex flex-col items-center">
                <div id="vid1" className="videoContainer">
                    <Video definitions={props.definitions} loaded={loaded}></Video>
                </div>
                <div id="vid2" className="videoContainer">
                    <Video definitions={props.definitions} loaded={loaded} autoplay="true"></Video>
                </div>
                <div id="vid3" className="videoContainer">
                    <Video definitions={props.definitions} loaded={loaded}></Video>
                </div>
            </div>

            <div className="text-white mt-[5vh] cursor-pointer second-bg-light rounded-3xl p-[1vh]" onClick={slideDown}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[2vh] h-[2vh]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        </div>
    )
}