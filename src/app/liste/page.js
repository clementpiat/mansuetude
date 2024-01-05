"use client"
import SavedWords from "../components/SavedWords"
import React, { useState, useEffect } from 'react';

export default function List() {
  const key = "savedWords";
  const [savedWords, setSavedWords] = useState([]);

  useEffect(() => {
    const savedWords = localStorage.getItem(key);
    setSavedWords(savedWords ? JSON.parse(savedWords) : []);
  }, []);

  return (
    <main className="flex h-[100vh] flex-col items-center justify-between custom-bg">
      <div className="w-[70vw] items-center">
        <SavedWords savedWords={savedWords}></SavedWords>
      </div>
    </main>
  )
}
