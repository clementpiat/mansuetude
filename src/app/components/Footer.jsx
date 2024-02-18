"use client";
import 'flowbite';
import Logo from '../components/Logo';
import Link from 'next/link'

export default function Footer(props) {
    return (
        typeof window !== 'undefined' && window.innerWidth >= 1024 ?
        <footer>
            <div class="flex justify-between border-slate-600 border-t-1 p-[1vh] sm:p-[4vh] first-bg">
                <Logo></Logo>
                <div class="grid gap-[1vw] sm:gap-[5vw] grid-cols-3 ml-[5vw] my-[3vh]">
                    <div>
                        <h2 class="mb-6 text-xs sm:text-sm font-semibold uppercase text-white">Modules</h2>
                        <ul class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-2 hover:underline">
                                <Link  href="/fish">Furetage</Link>
                            </li>
                            <li className="mb-2 hover:underline">
                                <Link  href="/radio">Assimilation</Link>
                            </li>
                            <li className="hover:underline">
                                <Link  href="/memo">Registre</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-xs sm:text-sm font-semibold uppercase text-white">Contact</h2>
                        <ul class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <li class="mb-2">
                                <span>Contact</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-xs sm:text-sm font-semibold uppercase text-white">Ressources</h2>
                        <ul class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-2 hover:underline">
                                <Link  href="https://mistral.ai/">Mistral AI</Link>
                            </li>
                            <li className="mb-2 hover:underline">
                                <Link  href="https://www.cnrtl.fr/">CNTRL</Link>
                            </li>
                            <li className="hover:underline">
                                <Link  href="https://filmot.com/">Filmot</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
        : <></>
    )
}