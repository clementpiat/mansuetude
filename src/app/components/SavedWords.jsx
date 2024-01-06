"use client"
import Definition from "../components/Definition"
import React, { useState, useEffect } from 'react';

export default function SavedWords(props) {
  const key = "savedWords";
  const [savedWords, setSavedWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState();

  useEffect(() => {
    const _savedWords = localStorage.getItem(key);
    setSavedWords(_savedWords ? JSON.parse(_savedWords) : []);
  }, []);

  return (
    <main className="flex h-[100vh] flex-col items-center justify-between custom-bg">
      <div className="w-[70vw] items-center">
        <Definition selectedWord={props.definitions[selectedWord]}></Definition>
        <ul className="text-slate-100 fixed overflow-y-auto top-[40vh] sm:top-[40vh] left-[15vw] sm:left-[15vw] w-[70vw] sm:w-[20vw] bg-slate-900 rounded-lg text-slate-100 max-h-[45vh] pl-[2vh] pb-[1vh]">
            {
                savedWords.map(
                    el => 
                    <li key={el} className="mt-[1vh]">
                        <span className="hover:text-pink-700 cursor-help" onMouseEnter={() => setSelectedWord(el)}>{el}</span>
                    </li>
                )
            }
        </ul>
      </div>
    </main>
  )
}
