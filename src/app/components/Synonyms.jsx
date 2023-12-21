"use client";

export default function Synonyms(props) {

    return (
        props.synonyms.length
        ?
        <>
            <br></br>
            <span className="underline">Synonymes:</span>
            <span>{props.synonyms.join(', ')}</span>
        </>
        :
        <></>
    )
}