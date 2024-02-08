"use client";
import Link from "next/link"

export default function DotNavButton(props) {
    return (
        <Link href={props.href} className={"button-grow cursor-pointer w-[5vw] px-[1.5vw] fixed top-[40vh] py-[10vh] " + (props.left ? "left-[0vw]": "left-[95vw]")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white">
                <circle cx="5" cy="5" r="5" />
            </svg>
        </Link>
    )
}