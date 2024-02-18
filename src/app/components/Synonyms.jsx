"use client";

export default function Synonyms(props) {

    return (
        props.synonyms && props.synonyms.startsWith("Synon. ")
        ?
        <>
            <br></br>
            <span className="underline">Synonymes:</span>
            <span> {props.synonyms.split("Synon. ")[1]}</span>
        </>
        :
        <></>
    )
}