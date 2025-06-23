'use client'

import MenuBar from "@/components/MenuBar";
import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { HiMiniSparkles } from "react-icons/hi2";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";

function page() {

    const [theme, setTheme] = useState<string>('');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        if (theme !== '') {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    return (
        <>
            <div className={`${theme === 'dark' ? "bg-black" : "bg-white"} duration-200 ease-in-out w-full min-h-screen flex flex-col justify-start items-center overflow-hidden relative`}>
                <MenuBar theme={theme} setTheme={setTheme} />

                {/* <h1 className={`${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out font-bold text-center lg:text-3xl capitalize mt-28 text-2xl font-Montserrat`}>Start chat with your data</h1> */}

                <Link href='/user/home' className={`absolute hidden lg:block top-28 left-5 text-3xl cursor-pointer ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out`}><IoIosArrowRoundBack /></Link>

                <div className={`w-[95%] lg:w-full h-[90vh] mt-20 lg:mt-32 lg:h-[80vh] flex flex-col justify-start items-center gap-3 lg:gap-7 lg:flex-row lg:items-center py-3 px-3 md:px-7`}>
                    <div className={`w-full overflow-hidden lg:w-[30%] h-auto flex flex-col justify-start items-center px-3 pb-10 lg:pb-0 py-4 rounded-md`}>
                        <p className={`w-full text-start ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out font-Montserrat font-semibold text-sm md:text-lg pb-2 `}>Set : <span className={`font-normal`}>Your set name</span></p>
                        <p className={`w-full text-start ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out font-Montserrat font-semibold text-sm md:text-lg pb-2 mt-1 `}>Type : <span className={`font-normal`}>Youtube URL</span></p>
                        <p className={`w-full text-start ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out font-Montserrat font-semibold text-sm md:text-lg mt-1 mb-1`}>Source : <span className={`font-normal`}>https://www.youtube.com/hbe7bdehh?v=673hbhbh</span></p>
                        <p className={`w-full text-start ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out font-Montserrat font-semibold text-sm md:text-lg pt-2 `}>Date Created : <span className={`font-normal`}>Mon, 23 June 2025</span></p>
                    </div>

                    <div className={`w-full overflow-hidden p-[1px] flex justify-center items-center h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl rounded-md lg:rounded-lg`}>
                        <div className={`w-full relative h-full rounded-md lg:rounded-lg ${theme === 'dark' ? "bg-black" : "bg-white"} px-3 py-3`}>
                            
                            
                            <div className={`w-[90%] lg:w-[95%] flex justify-center items-center absolute left-1/2 -translate-x-1/2 bottom-5 py-2`}>
                                <textarea className={`${theme === 'dark' ? "bg-zinc-700 text-white placeholder-white" : "bg-gray-200 text-black placeholder-black"} h-24 pr-10 w-full duration-200 ease-in-out rounded-md lg:rounded-lg py-3 px-3 outline-none font-Montserrat`} placeholder="Ask your question" />
                                <span className={`absolute right-2 bottom-4 p-2 lg:p-3 rounded-md lg:rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-600 text-white cursor-pointer`}><HiMiniSparkles /></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default page
