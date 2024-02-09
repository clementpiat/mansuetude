"use client";
import 'flowbite';
import Logo from '../components/Logo'
import NAModal from '../components/NAModal'
import Link from 'next/link'

export default function Navbar() {
    const openModal = () => {
        document.getElementById("not-available-modal").classList.remove("hidden");
        document.getElementById("not-available-overlay").classList.remove("hidden");
    }

    return (
        <nav className="first-bg h-[10vh] w-full z-20 left-0 mb-[3vh] sm:mb-[10vh] ">
            <div className="flex justify-between items-center px-[4vw] p-[2vh]">
                <div className="w-[10vw]"></div>

                <Link href="/" className="cursor-pointer flex items-center">
                    <Logo></Logo>
                </Link>

                <button onClick={openModal} className="cursor-pointer" type="button">
                    <span className="connect-button serif-font text-sm px-[1.5vh] py-[1.5vh] font-medium text-center text-slate-50 rounded-3xl inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[2.5vh] h-[2.5vh]">
                            <path className="footprint" d="M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 0 1-.82-1.256A8 8 0 0 1 18 9a22.47 22.47 0 0 1-1.228 7.351.75.75 0 1 1-1.417-.49A20.97 20.97 0 0 0 16.5 9 6.5 6.5 0 0 0 10 2.5ZM4.333 4.416a.75.75 0 0 1 .218 1.038A6.466 6.466 0 0 0 3.5 9a7.966 7.966 0 0 1-1.293 4.362.75.75 0 0 1-1.257-.819A6.466 6.466 0 0 0 2 9c0-1.61.476-3.11 1.295-4.365a.75.75 0 0 1 1.038-.219ZM10 6.12a3 3 0 0 0-3.001 3.041 11.455 11.455 0 0 1-2.697 7.24.75.75 0 0 1-1.148-.965A9.957 9.957 0 0 0 5.5 9c0-.028.002-.055.004-.082a4.5 4.5 0 0 1 8.996.084V9.15l-.005.297a.75.75 0 1 1-1.5-.034c.003-.11.004-.219.005-.328a3 3 0 0 0-3-2.965Zm0 2.13a.75.75 0 0 1 .75.75c0 3.51-1.187 6.745-3.181 9.323a.75.75 0 1 1-1.186-.918A13.687 13.687 0 0 0 9.25 9a.75.75 0 0 1 .75-.75Zm3.529 3.698a.75.75 0 0 1 .584.885 18.883 18.883 0 0 1-2.257 5.84.75.75 0 1 1-1.29-.764 17.386 17.386 0 0 0 2.078-5.377.75.75 0 0 1 .885-.584Z" />
                        </svg>
                    
                            <span className="hidden sm:block sm:ml-2">Se connecter</span>
                    </span>
                </button>
                <NAModal></NAModal>
            </div>
        </nav>
    )
}
