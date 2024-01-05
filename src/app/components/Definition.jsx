"use client";
import Synonyms from "../components/Synonyms"
import React, { useState, useEffect } from 'react';

export default function Definition(props) {
    const key = "savedWords";
    const [savedWords, setSavedWords] = useState([]);

    useEffect(() => {
        const savedWords = localStorage.getItem(key);
        setSavedWords(savedWords ? JSON.parse(savedWords) : []);
    }, []);

    const addWord = () => {
        let newSavedWords = savedWords.concat([props.selectedWord.word]);
        localStorage.setItem(key, JSON.stringify(newSavedWords));
        setSavedWords(newSavedWords);
    }

    const removeWord = () => {
        let newSavedWords = savedWords.filter(item => item !== props.selectedWord.word)
        localStorage.setItem(key, JSON.stringify(newSavedWords));
        setSavedWords(newSavedWords);
    }

    return (
        props.selectedWord
        ?
        <div className="fixed overflow-y-auto left-[15vw] sm:left-[45vw] p-[1vh] top-[15vh] w-[70vw] sm:w-[40vw] h-[20vh] bg-slate-900 rounded-lg text-slate-100">
            <div className="p-[1vh] sm:p-[3vh]">
                <h1 className="font-extrabold mb-[2vh]">
                    <a target="_blank" href={"https://dictionnaire.lerobert.com/definition/" + props.selectedWord.word}>
                        <span className="inline-flex">
                            {props.selectedWord.word}
                            <svg className="w-[2vh] ml-[5px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor">
                                <path d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z"></path>
                            </svg>
                        </span>
                    </a>
                    {
                        savedWords.includes(props.selectedWord.word)
                        ?
                        <span onClick={removeWord}>
                            <svg className="w-[3vh] ml-[5px] float-right" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
                            </svg>
                        </span>
                        :
                        <span onClick={addWord}>
                            <svg className="w-[3vh] ml-[5px] float-right" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M15.653 19.415c-1.162 1.141-2.389 2.331-3.653 3.585-6.43-6.381-12-11.147-12-15.808 0-4.005 3.098-6.192 6.281-6.192 2.197 0 4.434 1.042 5.719 3.248 1.279-2.195 3.521-3.238 5.726-3.238 3.177 0 6.274 2.171 6.274 6.182 0 1.269-.424 2.546-1.154 3.861l-1.483-1.484c.403-.836.637-1.631.637-2.377 0-2.873-2.216-4.182-4.274-4.182-3.257 0-4.976 3.475-5.726 5.021-.747-1.54-2.484-5.03-5.72-5.031-2.315-.001-4.28 1.516-4.28 4.192 0 3.442 4.742 7.85 10 13l2.239-2.191 1.414 1.414zm7.347-5.415h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z"/>
                            </svg>
                        </span>
                    }
                </h1>
                <span>
                    <span>{props.selectedWord.definition.def} </span>
                    <Synonyms synonyms={props.selectedWord.definition.synonyms}></Synonyms>
                </span>
            </div>
        </div>
        :
        <></>
    )
}