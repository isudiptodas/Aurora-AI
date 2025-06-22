'use client'

import MenuBar from "@/components/MenuBar";
import { useEffect, useState } from "react"
import { IoSearchSharp } from "react-icons/io5";
import { LuArrowDownUp } from "react-icons/lu";
import { MdOutlineMarkChatUnread } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import { toast } from "sonner";
import axios from "axios";

function page() {

  const [theme, setTheme] = useState<string>('');
  const [option, setOption] = useState('pdf');
  const [uploadOption, setUploadOption] = useState('pdf');
  const [filter, setFilter] = useState('newest');
  const [file, setFile] = useState<File | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [youtube, setYoutube] = useState('');
  const [web, setWeb] = useState('');
  const [name, setName] = useState('');

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

  const createSet = async () => {

    // pdf
    if (uploadOption === 'pdf') {
      if (!file || !name) {
        toast.error("Empty fields not allowed");
        return;
      }

      let id = toast.loading("Creating");
      const pdfText = '';

      try {
        const res = await axios.post(`/api/upload`, {
          name, type: 'pdf', pdfText
        }, {
          withCredentials: true
        });

        if(res.status === 200){
          toast.dismiss(id);
          toast.success("New Set Created");
          setPopupVisible(false);
          setName('');
          setFile(null);
          setWeb('');
          setYoutube('');
        }
      } catch (err: any) {
        if (err?.response && err?.response?.data) {
          toast.dismiss(id);
          toast.error(err.response.data);
        }
        else {
          toast.error("Something went wrong");
        }
      }
      finally{
        toast.dismiss(id);
      }
    }
    // web
    else if (uploadOption === 'web') {
      if (!web || !name) {
        toast.error("Empty fields not allowed");
        return;
      }

      let id = toast.loading("Creating");

      try {
        const res = await axios.post(`/api/upload`, {
          name, web, type: 'web'
        }, {
          withCredentials: true
        });

         if(res.status === 200){
          toast.dismiss(id);
          toast.success("New Set Created");
          setPopupVisible(false);
          setName('');
          setFile(null);
          setWeb('');
          setYoutube('');
        }
      } catch (err: any) {
        toast.dismiss(id);
        if (err?.response && err?.response?.data) {
          toast.error(err.response.data);
        }
        else {
          toast.error("Something went wrong");
        }
      }
      finally{
        toast.dismiss(id);
      }
    }

    // youtube
    else if (uploadOption === 'youtube') {
      if (!youtube || !name) {
        toast.error("Empty fields not allowed");
        return;
      }

      let id = toast.loading("Creating");

      try {
        const res = await axios.post(`/api/upload`, {
          name, youtube, type: 'youtube'
        }, {withCredentials: true});

         if(res.status === 200){
          toast.dismiss(id);
          toast.success("New Set Created");
          setPopupVisible(false);
          setName('');
          setFile(null);
          setWeb('');
          setYoutube('');
        }
      } catch (err: any) {
        if (err?.response && err?.response?.data) {
          toast.dismiss(id);
          toast.error(err.response.data);
        }
        else {
          toast.error("Something went wrong");
        }
      }
      finally{
        toast.dismiss(id);
      }
    }
  }


  return (
    <>
      <div className={`${theme === 'dark' ? "bg-black" : "bg-white"} duration-200 ease-in-out w-full min-h-screen flex flex-col justify-start items-center overflow-hidden relative`}>
        <MenuBar theme={theme} setTheme={setTheme} />

        {/* popup */}
        <div className={`${popupVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"} duration-500 ease-in-out transition-all w-full h-full px-5 md:px-10 absolute z-30 backdrop-blur-3xl bg-black/40 flex flex-col justify-start pt-32 items-center`}>
          <div className={`w-full md:w-[60%] lg:w-[40%] py-4 px-3 ${theme === 'dark' ? "bg-zinc-800" : "bg-white"} duration-200 ease-in-out flex flex-col justify-start items-center`}>
            <p className={`${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out font-Montserrat pb-2 border-b-2 border-cyan-700 text-lg font-semibold`}>Create Your New Set</p>
            <div className={`w-full mt-8 mb-5 flex px-4 justify-center items-center gap-2`}>
              <span onClick={() => setUploadOption('pdf')} className={`font-Montserrat px-5 py-2 ${uploadOption === 'pdf' ? "border-b-2 border-cyan-500" : "border-b-0"} ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out flex justify-center items-center gap-2 cursor-pointer`}>PDF <FaFilePdf /></span>
              <span onClick={() => setUploadOption('web')} className={`font-Montserrat px-5 py-2 ${uploadOption === 'web' ? "border-b-2 border-cyan-500" : "border-b-0"} ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out flex justify-center items-center gap-2 cursor-pointer`}>Web <CiGlobe /></span>
              <span onClick={() => setUploadOption('youtube')} className={`font-Montserrat px-5 py-2 ${uploadOption === 'youtube' ? "border-b-2 border-cyan-500" : "border-b-0"} ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out flex justify-center items-center gap-2 cursor-pointer`}>YouTube <FaYoutube /></span>
            </div>

            {/* web */}
            <div className={`${uploadOption === 'web' ? "block" : "hidden"} w-full flex flex-col justify-center items-center gap-2`}>
              <input onChange={(e) => setWeb(e.target.value)} type="text" className={`${theme === 'dark' ? "bg-black text-white" : "bg-gray-200 text-black"} w-full outline-none font-Montserrat text-sm px-3 py-2 lg:py-3`} placeholder="www.wikipedia.com/stranger-things" />
              <p className={`${theme === 'dark' ? "text-white" : "text-black"} font-Montserrat text-start w-full pt-3 pb-2`}>Name your set</p>
              <input onChange={(e) => setName(e.target.value)} type="text" className={`${theme === 'dark' ? "bg-black text-white" : "bg-gray-200 text-black"} w-full outline-none font-Montserrat text-sm px-3 py-2 lg:py-3 mb-2`} placeholder="This is my new set" />
              <p className={`${theme === 'dark' ? "text-white" : "text-black"} font-Montserrat text-center w-full py-2 lg:py-3 bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer`} onClick={createSet}>Create</p>
              <p onClick={() => setPopupVisible(false)} className={`${theme === 'dark' ? "bg-white text-red-500 font-semibold" : "bg-black text-red-500 font-semibold"} font-Montserrat text-center w-full py-2 lg:py-3 cursor-pointer`}>Cancel</p>
            </div>

            {/* youtube */}
            <div className={`${uploadOption === 'youtube' ? "block" : "hidden"} w-full flex flex-col justify-center items-center gap-2`}>
              <input onChange={(e) => setYoutube(e.target.value)} type="text" className={`${theme === 'dark' ? "bg-black text-white" : "bg-gray-200 text-black"} w-full outline-none font-Montserrat text-sm px-3 py-2 lg:py-3`} placeholder="https://www.youtube.com/link/to/video" />
              <p className={`${theme === 'dark' ? "text-white" : "text-black"} font-Montserrat text-start w-full pt-3 pb-2`}>Name your set</p>
              <input onChange={(e) => setName(e.target.value)} type="text" className={`${theme === 'dark' ? "bg-black text-white" : "bg-gray-200 text-black"} w-full outline-none font-Montserrat text-sm px-3 py-2 lg:py-3 mb-2`} placeholder="This is my new set" />
              <p className={`${theme === 'dark' ? "text-white" : "text-black"} font-Montserrat text-center w-full py-2 lg:py-3 bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer`} onClick={createSet}>Create</p>
              <p onClick={() => setPopupVisible(false)} className={`${theme === 'dark' ? "bg-white text-red-500 font-semibold" : "bg-black text-red-500 font-semibold"} font-Montserrat text-center w-full py-2 lg:py-3 cursor-pointer`}>Cancel</p>
            </div>

            {/* pdf */}
            <div className={`${uploadOption === 'pdf' ? "block" : "hidden"} w-full flex flex-col justify-center items-center gap-2`}>

              <div className={`w-[90%] rounded-md lg:rounded-lg border-2 border-dotted ${theme === 'dark' ? "border-zinc-600" : "border-gray-300"} py-5 flex flex-col relative justify-center items-center overflow-hidden`}>
                <FaUpload className={`${theme === 'dark' ? " text-white" : " text-black"} opacity-50 text-6xl cursor-pointer duration-200 ease-in-out`} />
                <p className={`font-Montserrat text-[10px] md:text-sm italic mt-1 ${theme === 'dark' ? " text-white" : " text-black"} duration-200 ease-in-out`}>Upload your file</p>
                <input type="file" onChange={(e) => {
                  const selected = e.target?.files?.[0];
                  const fileSize = e.target?.files?.[0].size;
                  const limit = 3 * 1024 * 1024;
                  if ((selected && selected.type === 'application/pdf') && (fileSize && fileSize <= limit)) {
                    setFile(selected);
                  }
                  else if (fileSize && fileSize > limit) {
                    toast.error("File size exceeds 3MB");
                  }
                  else {
                    toast.error("Invalid file format");
                  }
                }} className={`absolute h-56 w-52 top-1/2 opacity-0`} />
              </div>

              <p className={`${file !== null ? "block" : "hidden"} font-Montserrat text-[10px] md:text-sm italic mt-1 ${theme === 'dark' ? " text-white" : " text-black"} duration-200 ease-in-out`}>{file?.name}</p>

              <p className={`${theme === 'dark' ? "text-white" : "text-black"} font-Montserrat text-start w-full pt-3 pb-2`}>Name your set</p>
              <input onChange={(e) => setName(e.target.value)} type="text" className={`${theme === 'dark' ? "bg-black text-white" : "bg-gray-200 text-black"} w-full outline-none font-Montserrat text-sm px-3 py-2 lg:py-3 mb-2`} placeholder="This is my new set" />
              <p className={`${theme === 'dark' ? "text-white" : "text-black"} font-Montserrat text-center w-full py-2 lg:py-3 bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer`} onClick={createSet}>Create</p>
              <p onClick={() => setPopupVisible(false)} className={`${theme === 'dark' ? "bg-white text-red-500 font-semibold" : "bg-black text-red-500 font-semibold"} font-Montserrat text-center w-full py-2 lg:py-3 cursor-pointer`}>Cancel</p>
            </div>
          </div>
        </div>

        <div className={`mt-20 lg:hidden w-full flex justify-start items-center py-3 px-5 `}>
          <p onClick={() => setOption('pdf')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'pdf' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>PDF</p>
          <p onClick={() => setOption('youtube')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'youtube' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>YouTube URL</p>
          <p onClick={() => setOption('web')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'web' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>Web URl</p>
        </div>

        <div className={`mt-20 hidden w-full lg:flex justify-start items-center py-3 px-5 lg:px-10 `}>
          <p onClick={() => setOption('pdf')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'pdf' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>PDF</p>
          <p onClick={() => setOption('youtube')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'youtube' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>YouTube URL</p>
          <p onClick={() => setOption('web')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'web' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>Web URL</p>
        </div>

        <div className={`w-full mt-3 flex flex-col md:flex-row justify-center items-center md:justify-start md:gap-3 px-4 py-2 md:px-8 lg:px-10`}>
          <div className={`w-full flex relative md:w-[60%]`}>
            <input type="text" className={`${theme === 'dark' ? "bg-zinc-700 text-white" : "bg-gray-200 text-black"} outline-none px-3 pr-11 py-4 w-full`} placeholder="Search your sets " />
            <span className={`${theme === 'dark' ? "text-gray-300" : "text-gray-800"} absolute top-5 lg:text-xl right-8 cursor-pointer`}><IoSearchSharp /></span>
          </div>

          <p className={` ${theme === 'dark' ? "text-white" : "text-black"} w-full text-sm lg:text-lg md:w-auto px-5 text-center font-bold mt-3 md:mt-0 py-3 md:py-4 cursor-pointer bg-gradient-to-br from-emerald-400 to-emerald-700 duration-200 ease-in-out font-Montserrat capitalize flex justify-center items-center gap-2`}>{filter} <LuArrowDownUp /></p>
          <p onClick={() => setPopupVisible(true)} className={` ${theme === 'dark' ? "text-white" : "text-black"} w-full text-sm lg:text-lg md:w-auto px-5 text-center font-bold mt-3 md:mt-0 py-3 md:py-4 cursor-pointer bg-gradient-to-br from-purple-400 to-pink-700 duration-200 ease-in-out font-Montserrat flex justify-center items-center gap-2`}>Create New Set <MdOutlineMarkChatUnread /></p>
        </div>

      </div>
    </>
  )
}

export default page
