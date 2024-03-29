"use client";


export default function WordsColumn(props) {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-lg sm:text-3xl font-bold tracking-tight text-slate-100 mt-[3vh]">{props.title}</h2>
            <div className="second-bg w-[40vw] sm:w-[25vw] py-[1vh] mt-[3vh] rounded-lg  mb-[2vh]">
                <ul className="h-[50vh] text-slate-100 overflow-y-auto w-[40vw] sm:w-[25vw] second-bg">
                    {
                        props.words.map(
                            el => 
                            <li key={el} onClick={() => props.openModal(el)} className="flex flex-col items-center mx-[2vw] my-[1vh] py-[1vh] first-bg rounded-lg cursor-pointer">
                                <span>{el}</span>
                            </li>
                        )
                    }
                </ul>
            </div>    
      </div>
    )
}