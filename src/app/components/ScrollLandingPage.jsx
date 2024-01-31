"use client";

import Fishing from "../components/Fishing"
import Radio from "../components/Radio"
import { useEffect } from 'react';
import { interpolateColor } from "../../utils/colorUtils"

export default function ScrollLandingPage(props) {
    const onScroll = () => {
        const initialColor = getComputedStyle(document.body).getPropertyValue("--first-color");
        const finalColor = getComputedStyle(document.body).getPropertyValue("--france-blue-dark");
        const scrollY = window.scrollY;
        const color = interpolateColor(scrollY, initialColor, finalColor);
        document.getElementById("scroll-landing-page").style.background=color;
    }

    useEffect(() => {
        //add eventlistener to window
        window.addEventListener("scroll", onScroll, { passive: true });
        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
           window.removeEventListener("scroll", onScroll, { passive: true });
        }
      }, []);

  return (
    <main className="flex flex-col items-center first-bg" id="scroll-landing-page">
      <div className="w-[70vw] h-[60vh] pt-[25vh] items-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-50">
          Module d'apprentissage de vocabulaire français.
        </h1>
      </div>
      <div className="items-center flex flex-cols h-[20vh] animate-bounce text-white mt-[5vh]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
        </svg>
      </div>
      <div className="w-[70vw]">
        <h2 className="font-semibold text-xl mt-[15vh] mb-[2vh] text-slate-300">
          PÊCHE AUX MOTS
        </h2>
      </div>
      <div className="first-bg rounded-3xl mb-[10vh] p-[5vh]">
        <Fishing data={props.data}></Fishing>
      </div>
    </main>
  )
}
