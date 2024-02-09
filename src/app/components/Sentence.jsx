"use client";
import Loading from "../components/Loading";
import Word from "../components/Word"

export default function Sentence(props) {
    return (
        props.element ?
        <div className="overflow-y-auto w-[75vw] h-[40vh] sm:pt-[5vh] sm:w-[65vw] font-semibold tracking-tight text-lg sm:text-2xl lg:text-3xl text-slate-200">
          {
            props.element.message.split(' ').map(
              (word, index) =>
              props.element.words.some((specialWord) => word.includes(specialWord.match))
              ? (<Word key={index} word={word} setSelectedWord={props.setSelectedWord} element={props.element}></Word>)
              : (<span key={index}>{word} </span>)
            )
          }
        </div>
        :
        <Loading></Loading>
    )
}