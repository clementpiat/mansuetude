"use client"
import Definition from "../components/Definition"
import React, { useState, useEffect } from 'react';

export default function SavedWords(props) {
  const key = "savedWords";
  const [savedWords, setSavedWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState();

  useEffect(() => {
    let _savedWords = localStorage.getItem(key);
    _savedWords = _savedWords ? JSON.parse(_savedWords) : [];
    setSavedWords(_savedWords);
    setSelectedWord(_savedWords ? _savedWords[0] : null);
  }, []);

  return (
    <div className="w-[70vw] items-center">
      <Definition selectedWord={props.definitions[selectedWord]}></Definition>
      <ul className="mt-[25vh] text-slate-100 overflow-y-auto w-[70vw] sm:w-[20vw] bg-slate-900 rounded-lg text-slate-100 max-h-[45vh] pl-[2vh] pt-[2vh] pb-[1vh]">
          {
              savedWords.map(
                  el => 
                  <li key={el} className="mb-[1vh]">
                      <span className="hover:font-extrabold cursor-help" onMouseEnter={() => setSelectedWord(el)}>{el}</span>
                  </li>
              )
          }
      </ul>
    </div>
  )
}
