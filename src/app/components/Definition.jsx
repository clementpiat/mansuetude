"use client";
import Synonyms from "../components/Synonyms"

export default function Definition(props) {
    const handleClick = () => {
        
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
                    <span onClick={handleClick}>
                        <svg className="w-[2vh] ml-[5px] float-right" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/>
                        </svg>
                    </span>
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