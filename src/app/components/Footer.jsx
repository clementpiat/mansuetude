"use client";
import 'flowbite';
import Logo from '../components/Logo';
import Link from 'next/link'

export default function Footer(props) {
    return (
        <footer>
            <div class="flex justify-between border-slate-600 border-t-1 p-[1vh] sm:p-[4vh] first-bg">
                <Logo></Logo>
                <div class="grid gap-[1vw] sm:gap-[5vw] grid-cols-2 ml-[5vw] my-[3vh]">
                    <div>
                        <h2 class="mb-6 text-xs sm:text-sm font-semibold uppercase text-white">Modules</h2>
                        <ul class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-2 hover:underline">
                                <Link  href="/fish">Choix des graines</Link>
                            </li>
                            <li className="mb-2 hover:underline">
                                <Link  href="/radio">Arrosage</Link>
                            </li>
                            <li className="hover:underline">
                                <Link  href="/memo">Récolte des fruits</Link>
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
                </div>
            </div>
        </footer>
    )
}