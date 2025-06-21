'use client'

import MenuBar from "@/components/MenuBar";
import { useEffect, useState } from "react"
import { IoSearchSharp } from "react-icons/io5";
import { LuArrowDownUp } from "react-icons/lu";
import { MdOutlineMarkChatUnread } from "react-icons/md";

function page() {

  const [theme, setTheme] = useState<string>('');
  const [option, setOption] = useState('pdf');
  const [filter, setFilter] = useState('newest');

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

        <div className={`mt-20 lg:hidden w-full flex justify-start items-center py-3 px-5 `}>
          <p onClick={() => setOption('pdf')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'pdf' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>PDF</p>
          <p onClick={() => setOption('youtube')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'youtube' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>YouTube URL</p>
          <p onClick={() => setOption('web')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'web' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>Web URl</p>
        </div>

        <div className={`mt-20 hidden w-full lg:flex justify-start items-center py-3 px-5 lg:px-10 `}>
          <p onClick={() => setOption('pdf')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'pdf' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>PDF</p>
          <p onClick={() => setOption('youtube')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'youtube' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>YouTube URL</p>
          <p onClick={() => setOption('web')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'web' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>Web URl</p>
        </div>

        <div className={`w-full mt-3 flex flex-col md:flex-row justify-center items-center md:justify-start md:gap-3 px-4 py-2 md:px-8 lg:px-10`}>
          <div className={`w-full flex relative md:w-[60%]`}>
            <input type="text" className={`${theme === 'dark' ? "bg-zinc-700 text-white" : "bg-gray-200 text-black"} outline-none px-3 pr-11 py-4 w-full`} placeholder="Search your sets " />
            <span className={`${theme === 'dark' ? "text-gray-300" : "text-gray-800"} absolute top-5 lg:text-xl right-8 cursor-pointer`}><IoSearchSharp /></span>
          </div>

          <p className={` ${theme === 'dark' ? "text-white" : "text-black"} w-full text-sm lg:text-lg md:w-auto px-5 text-center font-bold mt-3 md:mt-0 py-3 md:py-4 cursor-pointer bg-gradient-to-br from-emerald-400 to-emerald-700 duration-200 ease-in-out font-Montserrat capitalize flex justify-center items-center gap-2`}>{filter} <LuArrowDownUp /></p>
          <p className={` ${theme === 'dark' ? "text-white" : "text-black"} w-full text-sm lg:text-lg md:w-auto px-5 text-center font-bold mt-3 md:mt-0 py-3 md:py-4 cursor-pointer bg-gradient-to-br from-purple-400 to-pink-700 duration-200 ease-in-out font-Montserrat flex justify-center items-center gap-2`}>Create New Set <MdOutlineMarkChatUnread /></p>
        </div>

      </div>
    </>
  )
}

export default page
