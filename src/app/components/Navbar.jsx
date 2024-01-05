"use client";
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    return (
        <nav className="bg-black h-[10vh] fixed w-full z-20 top-0 left-0">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <a onClick={() => router.push("/")} className="flex items-center cursor-pointer">
                    <span className="cursor-pointer inline-flex items-center justify-center text-lg text-end$ font-semibold whitespace-nowrap text-white">
                        <svg className="w-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#D514E7" d="M41.8,24.4C30.3,44.3,-19.7,42.2,-33,21.3C-46.4,0.5,-23.2,-39.2,1.8,-38.2C26.7,-37.2,53.4,4.5,41.8,24.4Z" transform="translate(100 100)" />
                        </svg>
                        Mansuétude
                    </span>
                </a>
                <a onClick={() => router.push("/liste")} className="flex items-center cursor-pointer float-right">
                    <span className="cursor-pointer inline-flex items-center justify-center text-white">
                        Ma liste
                    </span>
                </a>
            </div>
        </nav>
    )
}
