"use client";
import Link from 'next/link'


export default function SectionSelector (props) {
    return (
        <div className="h-[10vh] flex flex-row justify-center items-center mt-[5vh]">
            <div className="h-[4vh] rounded-xl flex flex-row justify-center items-center text-slate-50 text-sm">

                <Link className={"section-selector-item border-2 rounded-l-full " + (props.sectionId == "1" ? "second-bg" : "cursor-pointer")} href="/fish">
                    Furetage
                </Link>

                <Link className={"section-selector-item border-2 border-l-0 " + (props.sectionId == "2" ? "second-bg" : "cursor-pointer")} href="/radio">
                    Assimilation
                </Link>

                <Link className={"section-selector-item border-2 border-l-0 rounded-r-full " + (props.sectionId == "3" ? "second-bg" : "cursor-pointer")} href="/memo">
                    Registre
                </Link>

            </div>
        </div>
    )
}