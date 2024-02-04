"use client";
import Loading from '../components/Loading'

export default function Video(props) {
    // TODO: WordModal on click
    return (
        <>
            <div className="videoSubContainer">
                <div className="h-[5vh]">
                    <h2 className="font-semibold text-xl pb-[2vh] text-slate-300">
                    </h2>
                </div>
                <iframe 
                    width="100%" height="100%"
                    allow={"accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" + (props.autoplay ? "; autoplay" : "")}
                    allowFullScreen>
                </iframe>
                <Loading></Loading>
            </div>
        </>
        
    )
}