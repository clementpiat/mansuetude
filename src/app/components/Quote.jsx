"use client";
import Loading from '../components/Loading'

export default function Quote(props) {
    const openModal = (event) => {
        const word = event.target.innerText.toLowerCase();
        var _selectedWord = props.definitions[word];
        _selectedWord["learning"] = true;
        props.setSelectedWord(_selectedWord);
        document.getElementById("word-modal").classList.remove("hidden");
        document.getElementById("word-overlay").classList.remove("hidden");
    }

    return (
        <>
            <div className="mediaSubContainer">
                <div className="h-[5vh]">
                    <h2 className="font-semibold text-xl pb-[2vh] text-slate-300 cursor-help" onClick={(event) => openModal(event)}>
                    </h2>
                </div>
                <div className="overflow-scroll h-[35vh] mt-[5vh] p-[1em] rounded-lg border-[1px] border-slate-300 pt-[7vh] sm:pt-[12vh]">
                    <blockquote className="quote-border text-slate-50 text-lg flex items-center px-[2vw] text-center border-s-4">
                        <p className="text-quote italic"></p>
                    </blockquote>
                    <div class="text-slate-300 pt-[2vh] sm:pt-[5vh] float-right">
                        <span class="author-quote text-sm"></span>
                        <span class="title-quote text-sm"></span>
                        <span class="date-quote text-sm"></span>
                    </div>
                </div>

                {
                    props.loaded ? <></> : <Loading></Loading>
                }
            </div>
        </>
        
    )
}