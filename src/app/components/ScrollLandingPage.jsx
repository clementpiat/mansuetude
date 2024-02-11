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

      // const luciole = document.querySelector("#luciole").getBoundingClientRect();
      // const goButton = document.querySelector("#goButton").getBoundingClientRect();
      // const initialLuciole2 = document.querySelector("#luciole2").getBoundingClientRect();
      // const luciole3 = document.querySelector("#luciole3").getBoundingClientRect();

      var tl2 = gsap.timeline();
      // tl2.to("#luciole", {
      //   duration: 1,
      //   x: initialLuciole2.left - luciole1.left,
      //   y: initialLuciole2.top - luciole1.top,
      // })
      // tl2.set("#luciole", {
      //   fill: "none"
      // })
      // tl2.to("#luciole2", {
      //   duration: 5,
      //   motionPath: {
      //     path: "#path",
      //     end: 0.9,
      //   }
      // })

      tl2.to("#luciole", {
        duration: .2,
        y: 100
      })
      // tl2.to("#luciole", {
      //   duration: 4,
      // })
      // tl2.to("#luciole", {
      //   duration: 4,
      // })
      // tl2.to("#luciole", {
      //   delay: 1.4,
      //   duration: .2,
      //   x: () => document.documentElement.clientWidth * 0.4,
      //   y: () => - document.documentElement.clientHeight * 0.1,
      // })
      // tl2.to("#luciole", {
      //   delay: 1,
      //   duration: .2,
      //   x: () => - document.documentElement.clientWidth * 0.45,
      //   y: () => - document.documentElement.clientHeight * 0.1,
      // })

      ScrollTrigger.create({
        trigger: "#title",
        start: "30% top",
        end: () => document.documentElement.scrollHeight - window.innerHeight,
        animation: tl2,
        scrub: true,
        //pin: "#luciole",
      })
    }, { scope: container });

    useEffect(() => {
        // TODO: use gsap
        window.addEventListener("scroll", onScroll, { passive: true });

        // MotionPathHelper.create("#luciole")
        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
          window.removeEventListener("scroll", onScroll, { passive: true });
        }
      }, []);

  return (
    <main className="flex flex-col items-center first-bg" id="scroll-landing-page" ref={container}>
      <div id="title" className="w-[70vw] h-[60vh] pt-[20vh] sm:pt-[25vh] items-center mb-[15vh]">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-50">
          <span>Apprentissage de vocabulaire </span>
          <div id="highlight"></div>
          <span>français </span>
          <span>avancé</span>
        </h1>
        <p className="text-xl mt-3 text-slate-400">
          <span id="subTitle" className="pr-[5px]"></span>
        </p>
      </div>

      <div id="pathContainer" className="w-[100vw] h-[30vh] flex flex-col items-center text-slate-50">
        <svg id="luciole" fill="currentColor" viewBox="0 0 24 24" className="w-[3vh] h-[3vh]">
            <circle cx="5" cy="5" r="5" />
        </svg>
        {/* <svg width="100%" height="100%" viewBox="-1 -34 116 35">
          <path id="path" stroke="none" fill="none" d="M0 0Q4.5-16.5 9-33 12-6 24-33C21-18 24 15 36-12A3 3 90 0030-6C34-4 36-7 36-12 38 3 39-14 43-12 44-10 43.6667-8.6667 44-7 43-11 46-15 47-10 48-7 49-12 50-12 56-10 51-7 49-7 53-7 57-8 57-13 56-6 56-4 60-6 62-8 62-10 63-13 63.6667-10.6667 63-6 65-6 68-7 68-9 69-11A1 1 0 0067-10C67-8 67-6 68-6 72-5 72.6667-19.3333 75-26 73-19 70 0 75-6 77-8 78-10 78-12 78-10 77-5 79-6 82-5 82-9 83-12 83-10 82-6 83-6 88-5 90-8 90-11A1 1 0 0086-11C86-9 86-6 87-6 92-9 91-19 92-26 91-18 91-5 94-6 95.6667-7.6667 98-9 99-11A1 1 0 0095-11C95-9 95-4 97-4 103-4 108.3333-5.3333 114-6"/>
          <g id="luciole2" fill="currentColor">
              <circle cx="5" cy="5" r=".5" />
          </g>
        </svg> */}
      </div>

      <div className="w-[70vw] mt-[10vh]">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
          <Link href="/fish" className="hover:underline cursor-pointer">Furète</Link>
        </h2>
        <p className="text-lg sm:text-xl mt-3 text-slate-400">
          Découvre de nouveaux mots rares de la langue française, et sélectionne ceux que tu souhaiterais connaître.
        </p>
      </div>
      <div className="first-bg rounded-3xl mb-[5vh] mt-[3vh] w-[85vw] sm:w-[70vw] p-[5vw] sm:p-[2.5vw]">
        <Fishing data={props.data}></Fishing>
      </div>

      <div className="w-[70vw] mt-[10vh]">
        <h2 className="cursor-pointer text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
          <Link href="/radio" className="hover:underline cursor-pointer">Assimile</Link>
        </h2>
        <p className="text-lg sm:text-xl mt-3 text-slate-400">
          Retrouve ces mots utilisés dans divers contextes.
        </p>
      </div>
      <div className="w-[85vw] sm:w-[70vw] h-[40vh] sm:h-[75vh] first-bg rounded-3xl mb-[15vh] mt-[3vh] flex flex-col items-center justify-center">
        <img src="/radio_mansuetude.png" className="sm:max-h-[75vh] max-w-[80vw] max-h-[35vh] sm:max-w-[70vw]">
        </img>
      </div>

      <div className="w-[70vw]">
        <h2 className="cursor-pointer text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
          <Link href="/memo" className="hover:underline cursor-pointer">Enregistre</Link>
        </h2>
        <p className="text-lg sm:text-xl mt-3 text-slate-400">
          Consigne les mots que tu as appris.
        </p>
      </div>
      <div className="w-[85vw] sm:w-[70vw] h-[35vh] sm:pt-0 sm:h-[75vh] first-bg rounded-3xl mb-[15vh] mt-[3vh] flex flex-col items-center justify-center">
        <img src="/registre2.png" className="sm:max-h-[75vh] max-w-[80vw] max-h-[30vh] sm:max-w-[70vw]">
        </img>
      </div>

      <div id="goButton" className="flex flex-col items-center mb-[15vh]">
          <Link href="/fish">
            <span
            className="generate-button button-grow cursor-pointer px-5 py-3 mt-2 text-lg sm:text-xl font-medium text-center text-slate-300 rounded-3xl"
            >
              C&apos;est parti !
            </span>
          </Link>
        </div>
    </main>
  )
}
