"use client";
import Link from "next/link"

export default function DotNavButton(props) {
    return (
        <Link href={props.href} className={"cursor-pointer w-5 h-5 fixed top-[50vh] " + (props.left ? "left-[5vw]": "left-[95vw]")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white">
                <circle cx="5" cy="5" r="5" />
            </svg>
        </Link>
    )
}