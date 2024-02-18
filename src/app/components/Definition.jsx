"use client";
import Synonyms from "../components/Synonyms"
import React, { useState, useEffect } from 'react';

export default function Definition(props) {
    const [learningWords, setLearningWords] = useState([]);
    const [learnedWords, setLearnedWords] = useState([]);

    useEffect(() => {
        const learningWords = localStorage.getItem("learningWords");
        setLearningWords(learningWords ? JSON.parse(learningWords) : []);

        const learnedWords = localStorage.getItem("learnedWords");
        setLearnedWords(learnedWords ? JSON.parse(learnedWords) : []);
    }, []);

    const addWord = () => {
        let newLearningWords = learningWords.concat([props.selectedWord.word]);
        localStorage.setItem("learningWords", JSON.stringify(newLearningWords));
        setLearningWords(newLearningWords);
    }

    const removeWord = () => {
        let newLearningWords = learningWords.filter(item => item !== props.selectedWord.word)
        localStorage.setItem("learningWords", JSON.stringify(newLearningWords));
        setLearningWords(newLearningWords);
    }

    return (
        props.selectedWord && props.selectedWord.definitions
        ?
        <div className={"overflow-y-auto mb-[4vh] p-[1vh] w-[75vw] sm:w-[35vw] h-[20vh] rounded-xl text-slate-100 " + (props.modal ? "first-bg" : "second-bg float-right")}>
            <div className="p-[1vh] sm:p-[3vh]">
                <h1 className="font-extrabold mb-[2vh]">
                    <a target="_blank" href={"https://www.cnrtl.fr/definition/" + props.selectedWord.word}>
                        <span className="inline-flex hover:underline">
                            {props.selectedWord.word}
                            <svg className="w-[2vh] ml-[5px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor">
                                <path d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z"></path>
                            </svg>
                        </span>
                    </a>
                    {   
                        props.canBeRemovedFromLearningWords ? (
                            learningWords.includes(props.selectedWord.word)
                            ?
                            <span onClick={removeWord} className="cursor-pointer">
                                <svg className="w-[3vh] ml-[5px] float-right" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
                                    <path d="M64 96H0c0 123.7 100.3 224 224 224v144c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320C288 196.3 187.7 96 64 96zm384-64c-84.2 0-157.4 46.5-195.7 115.2 27.7 30.2 48.2 66.9 59 107.6C424 243.1 512 147.9 512 32h-64z"></path>
                                </svg>
                            </span>
                            :
                            <span onClick={addWord} className="cursor-pointer">
                                <svg id="addIcon" className="w-[3vh] ml-[5px] float-right" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </span>
                        ) : <></>
                    }
                </h1>
                <span>
                    <span>{props.selectedWord.definitions[0].text}</span>
                    <Synonyms synonyms={props.selectedWord.definitions[0].synonymes}></Synonyms>
                </span>
            </div>
        </div>
        :
        <div className="h-[20vh] mb-[4vh]"></div>
    )
}