"use client";

export default function Synonyms(props) {

    return (
        props.synonyms
        ?
        <>
            <br></br>
            <span className="underline">Synonymes:</span>
            <span> {', '.join(props.synonyms)}</span>
        </>
        :
        <></>
    )
}