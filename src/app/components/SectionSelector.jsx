"use client";
import Link from 'next/link'


export default function SectionSelector (props) {
    return (
        <div className="h-[10vh] flex flex-row justify-center items-center mt-[5vh]">
            <div className="m-[4vh] h-[4vh] rounded-xl flex flex-row justify-center items-center text-slate-50 text-sm p-[1vh]">

                <Link className={"section-selector-item rounded-l-full " + (props.sectionId == "1" ? "second-bg" : "cursor-pointer")} href="/fish">
                    Furetage
                </Link>

                <Link className={"section-selector-item " + (props.sectionId == "2" ? "second-bg" : "cursor-pointer")} href="/radio">
                    Assimilation
                </Link>

                <Link className={"section-selector-item rounded-r-full " + (props.sectionId == "3" ? "second-bg" : "cursor-pointer")} href="/memo">
                    Registre
                </Link>

            </div>
        </div>
    )
}