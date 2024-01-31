"use client";
import 'flowbite';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    return (
        <nav className="first-bg h-[10vh] w-full z-20 left-0 mb-[10vh]">
            <div className="flex justify-between items-center px-[4vw] p-[2vh]">
                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="serif-font pr-[8vw] py-3 font-medium text-center text-white rounded-lg inline-flex items-center" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"/>
                    </svg>
                </button>
                <div id="dropdown" className="hidden second-bg divide-y divide-gray-100 rounded-lg shadow p-[.5vh]">
                    <ul className="text-sm text-white" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <a href="#" onClick={() => router.push("/memo")} className="dropdown-element">
                            <svg className="w-5 h-5 mr-5" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" stroke="#ffffff">
                            <path d="M25.6,14c0-2.8,2.2-5,5-5H86c2.8,0,5,2.2,5,5s-2.2,5-5,5H30.6C27.8,19,25.6,16.8,25.6,14z M86,41H30.6 c-2.8,0-5,2.2-5,5s2.2,5,5,5H86c2.8,0,5-2.2,5-5S88.8,41,86,41z M86,73H30.6c-2.8,0-5,2.2-5,5s2.2,5,5,5H86c2.8,0,5-2.2,5-5 S88.8,73,86,73z M9,39.4c-3.9,0-7,3.2-7,7.1s3.1,7.1,7,7.1c3.9,0,7-3.2,7-7.1S12.8,39.4,9,39.4z M9,7c-3.9,0-7,3.2-7,7.1 c0,3.9,3.1,7.1,7,7.1c3.9,0,7-3.2,7-7.1C16,10.2,12.8,7,9,7z M9,70.8c-3.9,0-7,3.2-7,7.1C2,81.8,5.1,85,9,85c3.9,0,7-3.2,7-7.1 C16,74,12.8,70.8,9,70.8z"></path>
                            </svg>
                                Mémo
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => router.push("/fish")} className="dropdown-element">
                            <svg className="w-5 h-5 mr-5" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" stroke="#ffffff">
                                <path d="M500.241,40.147c0-4.41-1.752-8.64-4.872-11.759L471.853,4.869c-6.49-6.491-17.026-6.493-23.518,0 c-7.509,7.509-414.51,414.51-421.987,421.987c-19.453,19.452-19.453,51.103,0,70.556c19.451,19.451,51.103,19.452,70.556,0 l69.883-69.883c25.996,25.997,68.075,25.999,94.074,0c25.936-25.936,25.936-68.137,0-94.074 c-17.473-17.473-42.044-23.143-64.263-17.227l-6.293-6.293l47.037-47.038l11.759,11.76c6.493,6.495,17.023,6.495,23.518,0 c6.495-6.495,6.495-17.024,0-23.518l-11.759-11.76l47.038-47.037l11.759,11.76c6.493,6.495,17.022,6.495,23.518,0 c6.495-6.495,6.495-17.024,0-23.518l-11.759-11.76l47.038-47.038l11.759,11.76c6.493,6.495,17.022,6.495,23.518,0 c6.495-6.495,6.495-17.024,0-23.518L401.97,98.27l58.124-58.124l6.888,6.888v411.465c0,10.282-8.366,18.648-18.648,18.648 c-10.282,0-18.647-8.365-18.647-18.648v-11.76c0-9.184-7.446-16.63-16.63-16.63c-9.184,0-16.63,7.446-16.63,16.63v11.76 c0,28.621,23.286,51.908,51.908,51.908s51.907-23.285,51.907-51.908V40.147H500.241z M149.596,397.682l-76.211,76.211 c-6.485,6.486-17.035,6.485-23.519,0s-6.485-17.035,0-23.519l116.92-116.919C149.414,350.826,143.697,375.491,149.596,397.682z M237.34,356.973c12.967,12.968,12.967,34.068,0,47.037c-12.998,12.998-34.038,12.999-47.037,0 c-12.967-12.968-12.967-34.068,0-47.037C203.302,343.975,224.341,343.973,237.34,356.973z"></path>
                            </svg>
                            Pêche aux mots
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => router.push("/radio")} className="dropdown-element">
                                <svg className="w-5 h-5 mr-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" stroke="#ffffff">
                                    <path d="m1.75 11.75c0-2.5 3.5-2 3.5-2v4.5s-3.5.5-3.5-2.5v-3.5c0-3 .5-6.5 6.25-6.5s6.25 3.5 6.25 6.5v3.5c0 3-3.5 2.5-3.5 2.5v-4.5s3.5-.5 3.5 2"></path>
                                </svg>
                                Radio mansuétude
                            </a>
                        </li>
                    </ul>
                </div>
                <a onClick={() => router.push("/")} className="cursor-pointer">
                    <span className="inline-flex items-center text-2xl text-white cursive-font">
                        <svg className="w-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#D514E7" d="M41.8,24.4C30.3,44.3,-19.7,42.2,-33,21.3C-46.4,0.5,-23.2,-39.2,1.8,-38.2C26.7,-37.2,53.4,4.5,41.8,24.4Z" transform="translate(100 100)" />
                        </svg>
                        Mansuétude
                    </span>
                </a>
                <a onClick={() => router.push("/")} className="cursor-pointer">
                    <span className="connect-button serif-font text-sm px-5 py-3 mt-2 font-medium text-center text-white rounded-3xl inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                            <path d="M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 0 1-.82-1.256A8 8 0 0 1 18 9a22.47 22.47 0 0 1-1.228 7.351.75.75 0 1 1-1.417-.49A20.97 20.97 0 0 0 16.5 9 6.5 6.5 0 0 0 10 2.5ZM4.333 4.416a.75.75 0 0 1 .218 1.038A6.466 6.466 0 0 0 3.5 9a7.966 7.966 0 0 1-1.293 4.362.75.75 0 0 1-1.257-.819A6.466 6.466 0 0 0 2 9c0-1.61.476-3.11 1.295-4.365a.75.75 0 0 1 1.038-.219ZM10 6.12a3 3 0 0 0-3.001 3.041 11.455 11.455 0 0 1-2.697 7.24.75.75 0 0 1-1.148-.965A9.957 9.957 0 0 0 5.5 9c0-.028.002-.055.004-.082a4.5 4.5 0 0 1 8.996.084V9.15l-.005.297a.75.75 0 1 1-1.5-.034c.003-.11.004-.219.005-.328a3 3 0 0 0-3-2.965Zm0 2.13a.75.75 0 0 1 .75.75c0 3.51-1.187 6.745-3.181 9.323a.75.75 0 1 1-1.186-.918A13.687 13.687 0 0 0 9.25 9a.75.75 0 0 1 .75-.75Zm3.529 3.698a.75.75 0 0 1 .584.885 18.883 18.883 0 0 1-2.257 5.84.75.75 0 1 1-1.29-.764 17.386 17.386 0 0 0 2.078-5.377.75.75 0 0 1 .885-.584Z" />
                        </svg>
                        Se connecter
                    </span>
                </a>
            </div>
        </nav>
    )
}
