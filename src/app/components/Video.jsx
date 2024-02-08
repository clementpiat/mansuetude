"use client";
import Loading from '../components/Loading'

export default function Video(props) {
    const openModal = (event) => {
        // TODO
        const word = event.target.innerText.toLowerCase();
        var _selectedWord = props.definitions[word];
        _selectedWord["learning"] = true;
        props.setSelectedWord(_selectedWord);
        document.getElementById("word-modal").classList.remove("hidden");
        document.getElementById("word-overlay").classList.remove("hidden");
    }

    return (
        <>
            <div className="videoSubContainer">
                <div className="h-[5vh]">
                    <h2 className="font-semibold text-xl pb-[2vh] text-slate-300 cursor-help" onClick={(event) => openModal(event)}>
                    </h2>
                </div>
                <iframe 
                    width="100%" height="100%"
                    allow={"accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" + (props.autoplay ? "; autoplay" : "")}
                    allowFullScreen>
                </iframe>
                {
                    props.loaded ? <Loading></Loading> : <></>
                }
            </div>
        </>
        
    )
}