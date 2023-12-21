"use client";
import Sentence from "../components/Sentence"
import Definition from "../components/Definition"
import React, { useState, useEffect } from 'react';

export default function Main(props) {
    // https://blog.logrocket.com/guide-state-management-next-js/ : SWR
    const [element, setElement] = useState();
    const [selectedWord, setSelectedWord] = useState();

    useEffect(() => {
      setElement(props.data[Math.floor(Math.random()*props.data.length)])
    }, [])

    const generate = () => {
      setSelectedWord(null);
      let newElement = props.data[Math.floor(Math.random()*props.data.length)];
      while (newElement == element) {
        newElement = props.data[Math.floor(Math.random()*props.data.length)];
      } 
      setElement(newElement);
    }

    return (
      <main className="flex h-[100vh] flex-col items-center justify-between custom-bg">
        <div className="w-[70vw] items-center">
          <Definition selectedWord={selectedWord}></Definition>
          <Sentence element={element} setSelectedWord={setSelectedWord}></Sentence>
          <span
            className="fixed transform translate-x-[-50%] top-[86vh] sm:top-[76vh] left-[50%] cursor-pointer px-5 py-3 mt-2 text-base font-medium text-center text-slate-300 bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:ring-blue-900"
            onClick={() => generate()}
          >
            Générer
          </span>
        </div>
      </main>
    )
}