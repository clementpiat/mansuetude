"use client"
import WordsColumn from "../components/WordsColumn"
import React, { useState, useEffect } from 'react';
import WordModal from '../components/WordModal'

export default function SavedWords(props) {
  const [learningWords, setLearningWords] = useState([]);
  const [learnedWords, setLearnedWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState();

  const openModal = (word) => {
      var _selectedWord = props.definitions[word];
      _selectedWord["learned"] = learnedWords.includes(word);
      _selectedWord["learning"] = learningWords.includes(word);
      setSelectedWord(_selectedWord);
      document.getElementById("word-modal").classList.remove("hidden");
      document.getElementById("word-overlay").classList.remove("hidden");
  }

  useEffect(() => {
    var _learningWords = localStorage.getItem("learningWords");
    _learningWords = _learningWords ? JSON.parse(_learningWords) : [];
    setLearningWords(_learningWords);

    var _learnedWords = localStorage.getItem("learnedWords");
    _learnedWords = _learnedWords ? JSON.parse(_learnedWords) : [];
    setLearnedWords(_learnedWords);
  }, []);

  return (
    <div className="w-[70vw] sm:grid-cols-2 flex flex-col sm:flex-row justify-between sm:mx-[20vw]">
      <WordsColumn title="Mots en cours d'apprentissage" words={learningWords} openModal={openModal}></WordsColumn>
      <WordsColumn title="Fruits mûrs" words={learnedWords} openModal={openModal}></WordsColumn>
      <WordModal selectedWord={selectedWord} definitions={props.definitions} setLearningWords={setLearningWords} setLearnedWords={setLearnedWords}></WordModal>
    </div>
  )
}
