"use client";

export default function Word(props) {
    const handleMouseEnter = () => {
        props.setSelectedWord(props.element.words.find((specialWord) => props.word.includes(specialWord.match)));
    }

    const handleMouseLeave = () => {
    }

    return (
        <>
            <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="hover-trigger special-word cursor-help">
                {[',', '.'].includes(props.word[props.word.length - 1]) ? props.word.slice(0, props.word.length - 1) : props.word}
            </span>
            <span>{[',', '.'].includes(props.word[props.word.length - 1]) ? props.word[props.word.length - 1] + ' ' : ' '}</span>
        </>
    )
}