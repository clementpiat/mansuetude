"use client";

export default function SavedWords(props) {
    //TODO
    return (
        <ul className="text-slate-100 mt-[20vh]">
            {
                props.savedWords.map(
                    el => <li key={el}>{el}</li>
                )
            }
        </ul>
    )
}