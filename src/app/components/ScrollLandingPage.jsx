"use client";

import Fishing from "../components/Fishing"
import Radio from "./YoutubeScroll"
import { useEffect } from 'react';
import { interpolateColor } from "../../utils/colorUtils"
import { useRouter } from 'next/navigation';
import Link from 'next/link'

export default function ScrollLandingPage(props) {
    const router = useRouter();

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
      <div className="w-[70vw] h-[60vh] pt-[20vh] sm:pt-[25vh] items-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-50">
          Apprentissage de vocabulaire français avancé
        </h1>
        <p className="text-xl mt-3 text-slate-400">
          Car c'est une belle vanité que de cultiver le support de la pensée.
        </p>
      </div>
      <div className="items-center flex flex-cols h-[20vh] text-slate-50 mt-[5vh]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <circle cx="5" cy="5" r="5" />        
        </svg>
      </div>

      <div className="w-[70vw] mt-[20vh]">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
          <Link href="/fish" className="hover:underline cursor-pointer">Choix des graines</Link>
        </h2>
        <p className="text-xl mt-3 text-slate-400">
          Découvre de nouveaux mots rares de la langue française, et sélectionne ceux que tu souhaiterais connaître.
        </p>
      </div>
      <div className="first-bg rounded-3xl mb-[5vh] mt-[3vh] w-[70vw] p-[2.5vw]">
        <Fishing data={props.data}></Fishing>
      </div>

      <div className="w-[70vw] mt-[20vh]">
        <h2 className="cursor-pointer text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
          <Link href="/radio" className="hover:underline cursor-pointer">Arrosage</Link>
        </h2>
        <p className="text-xl mt-3 text-slate-400">
          Retrouve ces mots utilisés dans divers contextes.
        </p>
      </div>
      <div className="w-[70vw] h-[75vh] first-bg rounded-3xl mb-[15vh] mt-[3vh] flex flex-col items-center">
        <img src="/radio_mansuetude.png" className="max-h-[75vh] max-w-[70vw]">
        </img>
      </div>

      <div className="flex flex-col items-center mb-[15vh]">
          <Link href="/fish">
            <span
            className="generate-button button-grow cursor-pointer px-5 py-3 mt-2 text-xl font-medium text-center text-slate-300 rounded-3xl"
            >
              C'est parti !
            </span>
          </Link>
        </div>
    </main>
  )
}
