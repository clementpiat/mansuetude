"use client";
import Sentence from "../components/Sentence"
import Definition from "../components/Definition"
import React, { useState, useEffect } from 'react';

export default function Fishing(props) {
    // https://blog.logrocket.com/guide-state-management-next-js/ : SWR
    const [element, setElement] = useState();
    const [selectedWord, setSelectedWord] = useState();

    useEffect(() => {
      let newElement = props.data[Math.floor(Math.random()*props.data.length)];
      setElement(newElement);
      setSelectedWord(newElement.words[0]);
    }, [])

    const generate = () => {
      let newElement = props.data[Math.floor(Math.random()*props.data.length)];
      while (newElement == element) {
        newElement = props.data[Math.floor(Math.random()*props.data.length)];
      } 
      setElement(newElement);
      setSelectedWord(newElement.words[0]);
    }

    return (
        <div className="w-[80vw] sm:w-[65vw] h-[70vh] items-center">
            <Definition selectedWord={selectedWord} canBeRemovedFromLearningWords="true"></Definition>
            <Sentence element={element} setSelectedWord={setSelectedWord}></Sentence>
            <div className="flex flex-col items-center">
              <span
                className="generate-button button-grow cursor-pointer px-5 py-3 text-base font-medium text-center text-slate-300 rounded-3xl"
                onClick={() => generate()}
              >
                Générer
              </span>
            </div>
        </div>
    )
}