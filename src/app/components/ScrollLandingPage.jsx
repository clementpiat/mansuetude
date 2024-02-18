"use client";

import Fishing from "../components/Fishing"
import { useEffect } from 'react';
import { interpolateColor } from "../../utils/colorUtils"
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TextPlugin from "gsap/TextPlugin"
import MotionPathPlugin from "gsap/MotionPathPlugin"
import ScrollTrigger from "gsap/ScrollTrigger"

export default function ScrollLandingPage(props) {
    gsap.registerPlugin(TextPlugin, MotionPathPlugin, ScrollTrigger);
    const router = useRouter();

    const onScroll = () => {
        const initialColor = getComputedStyle(document.body).getPropertyValue("--first-color");
        const finalColor = getComputedStyle(document.body).getPropertyValue("--france-blue-dark");
        const scrollY = window.scrollY;
        const color = interpolateColor(scrollY, initialColor, finalColor);
        var el = document.getElementById("scroll-landing-page")
        if (el) {
          el.style.background=color;
        }
    }
    const container = useRef();

    useGSAP(() => {
      var tl = gsap.timeline({delay: 0.5, repeat: -1, repeatDelay: 4});
      tl.to("#subTitle", {
        duration: 0.45,
        text: "Car c'est",
        ease: "none",
      });
      tl.to("#subTitle", {
        duration: 0.25,
        text: {
          value: "Car c'est cool",
          type: "diff"
        },
        ease: "none",
        yoyo: "true",
        repeat: 1,
        repeatDelay: 2,
      });
      tl.to("#subTitle", {
        duration: 0,
        yoyo: true,
        repeat: 4,
        repeatDelay: .5,
        borderRight: "solid rgb(248 250 252)"
      }, "<0.25")

      tl.to("#subTitle", {
        delay: 0.2,
        duration: 1,
        text: {
          value: "Car c'est une belle vanité que de cultiver le support de la pensée.",
          type: "diff"
        },
        ease: "none",
      });
      tl.to("#subTitle", {
        duration: 0,
        yoyo: true,
        repeat: -1,
        repeatDelay: .5,
        borderRight: "solid rgb(248 250 252)"
      })
    })

    useEffect(() => {
        // TODO: use gsap
        window.addEventListener("scroll", onScroll, { passive: true });

        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
          window.removeEventListener("scroll", onScroll, { passive: true });
        }
      }, []);

  return (
    <main className="flex flex-col items-center first-bg" id="scroll-landing-page" ref={container}>
      <div id="title" className="w-[70vw] h-[65vh] sm:h-[60vh] pt-[20vh] sm:pt-[25vh] items-center z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-50">
          <span>Apprentissage de vocabulaire </span>
          <span>français </span>
          <span>rare et précieux</span>
        </h1>
        <p className="text-xl mt-3 text-slate-400">
          <span id="subTitle" className="pr-[5px]"></span>
        </p>
      </div>
      <div className="flex flex-col items-center mb-[15vh] sm:mb-[20vh]">
        <Link href="/fish">
          <span
          className="generate-button button-grow cursor-pointer px-4 py-2 text-sm sm:text-base font-medium text-center text-slate-300 rounded-3xl"
          >
            Commencer
          </span>
        </Link>
      </div>
      {
        window.innerWidth >= 1024
        ?
      <>
        <div id="pathContainer" className="w-[100vw] h-[30vh] flex flex-col items-center text-slate-50">
          <svg id="luciole" fill="currentColor" viewBox="0 0 24 24" className="w-[3vh] h-[3vh]">
              <circle cx="50%" cy="50%" r=".5vh" />
          </svg>
        </div>

        <div className="w-[80vw] sm:w-[70vw]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
            <Link href="/fish" className="hover:underline cursor-pointer">Furète</Link>
          </h2>
          <p className="text-base sm:text-xl mt-3 text-slate-400">
            Découvre de nouveaux mots rares de la langue française, et sélectionne ceux que tu souhaiterais connaître.
          </p>
        </div>
        <div className="first-bg rounded-2xl mb-[10vh] sm:mb-[15vh] mt-[3vh] w-[85vw] sm:w-[70vw] p-[5vw] sm:p-[2.5vw]">
          <Fishing data={props.data}></Fishing>
        </div>

        <div className="w-[85vw] sm:w-[100vw] sm:px-[5vw] sm:flex">
          <div className="w-[80vw] sm:w-[25vw] sm:mx-[5vw] mt-[10vh] 2xl:mt-[15vh]">
            <h2 className="cursor-pointer text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
              <Link href="/memo" className="hover:underline cursor-pointer">Assimile</Link>
            </h2>
            <p className="sm:text-xl mt-3 text-slate-400">
              Retrouve ces mots utilisés dans divers contextes.
            </p>
          </div>
          <div className="w-[85vw] w-[60vw] 2xl:mb-[15vh] z-20 2xl:mt-[10vh]">
            <img src="/hourvari2.png" className="fade-out-image w-full rounded-2xl">
            </img>
          </div>
        </div>

        <div className="w-[100vw] px-[5vw] flex mt-[5vh]">
          <div className="halo-background h-[35vh] w-[95vw] absolute"></div>
          <div className="overflow-hidden halo-border w-[50vw] mb-[10vh] sm:mb-[15vh] z-20 sm:mt-[10vh]">
            <img src="/registre.png" className="w-full rounded-2xl ring-1 ring-transparent">
            </img>
          </div>
          <div className="w-[30vw] ml-[10vw] mt-[15vh]">
            <h2 className="cursor-pointer text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
              <Link href="/memo" className="hover:underline cursor-pointer">Enregistre</Link>
            </h2>
            <p className="sm:text-xl mt-3 text-slate-400">
              Consigne les mots que tu as appris.
            </p>
          </div>
        </div>


        <div id="goButton" className="flex flex-col items-center mb-[10vh] sm:mb-[15vh]">
          <Link href="/fish">
            <span
            className="generate-button button-grow cursor-pointer px-5 py-3 mt-2 text-lg sm:text-xl font-medium text-center text-slate-300 rounded-3xl"
            >
              C&apos;est parti !
            </span>
          </Link>
        </div>
      </>
      :
      <></>
      }

    </main>
  )
}
