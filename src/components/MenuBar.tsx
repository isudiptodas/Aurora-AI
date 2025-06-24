'use client'

interface props {
    theme: string;
    setTheme: (theme: string) => void;
}

import { FaSun } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { VscLayoutSidebarLeftOff } from "react-icons/vsc";

function MenuBar({ theme, setTheme }: props) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();

    const switchTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const logout = async () => {
        try {
            const res = await axios.post(`/api/auth`, {type: 'logout'}, {
                withCredentials: true
            });

            if(res.status === 200){
                router.push('/');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className={`${theme === 'dark' ? "bg-black" : "bg-white"} w-full z-50 fixed top-0 duration-150 ease-in-out border-b-2 border-cyan-700 rounded-b-4xl md:rounded-none flex justify-center lg:px-10 lg:justify-between shadow-lg items-center pt-5 md:pt-6 md:pb-5 pb-4`}>
                <p className={`text-xl font-Conquer ${theme === 'dark' ? "text-white" : "text-black"}`}>AURORA AI</p>
                <div onClick={() => setVisible(!visible)} className={`flex lg:hidden flex-col absolute top-1/3 text-xl cursor-pointer right-5 justify-center items-center ${theme === 'dark' ? "text-white" : "text-black"}`}>
                    <span><VscLayoutSidebarLeftOff /></span>
                </div>

                <div className={`w-auto hidden lg:flex justify-evenly items-center gap-8 ${theme === 'dark' ? "text-white" : "text-black"}`}>
                    <p className={`text-lg font-Montserrat cursor-pointer hover:text-cyan-500 duration-200 ease-in-out`}>Home</p>
                    <p className={`text-lg font-Montserrat cursor-pointer hover:text-cyan-500 duration-200 ease-in-out flex justify-start items-center gap-2`} onClick={switchTheme}>Theme {theme === 'dark' ? <IoMdMoon className="opacity-50 duration-200 ease-in-out rotate-45" /> : <FaSun className="opacity-50 duration-200 ease-in-out rotate-45" />}</p>
                    <p className={`text-lg font-Montserrat cursor-pointer hover:text-cyan-500 duration-200 ease-in-out`}>About</p>
                    <p className={`text-lg font-Montserrat cursor-pointer hover:text-cyan-500 duration-200 ease-in-out`}>Privacy Policy</p>
                    <p className={`text-lg font-Montserrat cursor-pointer hover:text-cyan-500 duration-200 ease-in-out`}>Usage</p>
                    <p className={`text-lg font-Montserrat cursor-pointer text-red-500 font-semibold duration-200 ease-in-out`} onClick={logout}>Logout</p>
                </div>
            </div>

            {/* menu */}
            <div className={`${visible ? "translate-y-0 " : "-translate-y-full"} z-50 lg:hidden duration-300 ease-in-out transition-all w-full backdrop-blur-3xl bg-cyan-400/10 h-auto py-5 flex flex-col justify-start items-start gap-3 border-b-2 border-cyan-800 rounded-b-4xl absolute top-0`}>
                <p className={`w-full text-start font-Montserrat px-5 text-2xl ${theme === 'dark' ? "text-white" : "text-black"}`}>Home</p>
                <p className={`w-full text-start font-Montserrat px-5 text-2xl ${theme === 'dark' ? "text-white" : "text-black"} flex justify-start items-center gap-2`} onClick={switchTheme}>Theme {theme === 'dark' ? <IoMdMoon className="opacity-50 duration-200 ease-in-out rotate-45" /> : <FaSun className="opacity-50 duration-200 ease-in-out rotate-45" />}</p>
                <p className={`w-full text-start font-Montserrat px-5 text-2xl ${theme === 'dark' ? "text-white" : "text-black"}`}>About</p>
                <p className={`w-full text-start font-Montserrat px-5 text-2xl ${theme === 'dark' ? "text-white" : "text-black"}`}>Privacy Policy</p>
                <p className={`w-full text-start font-Montserrat px-5 text-2xl ${theme === 'dark' ? "text-white" : "text-black"}`}>Usage</p>
                <p className={`w-full text-start font-Montserrat px-5 text-2xl text-red-500 font-semibold`} onClick={logout}>Logout</p>
                <p onClick={() => setVisible(false)} className={`w-full text-start font-Conquer px-5 py-5 text-xl opacity-60 ${theme === 'dark' ? "text-white" : "text-black"}`}>Close</p>
            </div>
        </>
    )
}

export default MenuBar
