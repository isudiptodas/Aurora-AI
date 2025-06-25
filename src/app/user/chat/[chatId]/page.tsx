'use client'

import MenuBar from "@/components/MenuBar";
import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { HiMiniSparkles } from "react-icons/hi2";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaUser } from "react-icons/fa6";
import { IoSparklesSharp } from "react-icons/io5";

interface SetData {
  setName: string,
  userEmail: string,
  setType: string,
  vectorCollectionName: string,
  dateCreated: string,
  original: string,
  chat: {role: string, content: string}[] | []
}

const chats = [
    {
        role: 'user',
        content: 'hello how are you'
    },
    {
        role: 'ai',
        content: 'hello how are you'
    },
    {
        role: 'user',
        content: 'hello how are you'
    },
    {
        role: 'ai',
        content: 'hello how are you'
    },
    {
        role: 'user',
        content: 'hello how are you'
    },
    {
        role: 'ai',
        content: 'hello how are you'
    },
]

function page() {

    const [theme, setTheme] = useState<string>('');
    const search = useSearchParams();
    const result = search.get('data') as string;
    const set = JSON.parse(result);
    const[input, setInput] = useState('');
    const [data, setData] = useState<SetData>();
    const router = useRouter();

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

    useEffect(() => {
        const fetchSetData = async () => {
            try {
                const res = await axios.get(`/api/set/?set=${set.setName}`, {
                    withCredentials: true
                });

                if(res.status === 200){
                    setData(res.data.data);
                }
            } catch (err) {
                //console.log(err);
                router.push('/user/home');
            }
        }

        fetchSetData();
    }, []);

    const type = (type: string | undefined) => {
        if(type === 'youtube'){
            return "Youtube URL";
        }
        else if(type === 'pdf') {
            return "PDF";
        }
        else if(type === 'web'){
            return "Web URL";
        }
    }

    const ask = async () => {
        if(!input){
            toast.error("Please enter your question");
            return;
        }

        input.trim();

        let id = toast.loading("Processing . . .");

        try {
            const res = await axios.put(`/api/set`, {
                userEmail: data?.userEmail, setName: data?.setName, input
            }, {
                withCredentials: true
            });

            if(res.status === 200){
                toast.dismiss(id);
                setInput('');
                setData(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
        finally{
            toast.dismiss(id);
        }
    }

    return (
        <>
            <div className={`${theme === 'dark' ? "bg-black" : "bg-white"} duration-200 ease-in-out w-full min-h-screen flex flex-col justify-start items-center overflow-hidden relative`}>
                <MenuBar theme={theme} setTheme={setTheme} />

                {/* <h1 className={`${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out font-bold text-center lg:text-3xl capitalize mt-28 text-2xl font-Montserrat`}>Start chat with your data</h1> */}

                <Link href='/user/home' className={`absolute hidden lg:block top-28 left-5 text-3xl cursor-pointer ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out`}><IoIosArrowRoundBack /></Link>

                <div className={`w-[95%] lg:w-full h-[90vh] mt-20 lg:mt-32 lg:h-[80vh] flex flex-col justify-start items-center gap-3 lg:gap-7 lg:flex-row lg:items-center py-3 px-3 md:px-7`}>
                    <div className={`w-full overflow-hidden lg:w-[40%] h-auto flex flex-col justify-start items-center px-3 pb-10 lg:pb-0 py-4 rounded-md`}>
                        <p className={`w-full text-start ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out font-Montserrat font-semibold text-sm md:text-lg pb-2 `}>Set : <span className={`font-normal`}>{data?.setName}</span></p>
                        <p className={`w-full text-start ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out font-Montserrat font-semibold text-sm md:text-lg pb-2 mt-1 `}>Type : <span className={`font-normal`}>{type(data?.setType)}</span></p>
                        <p className={`w-full text-start ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out font-Montserrat font-semibold text-sm md:text-lg mt-1 mb-1`}>Source : <span className={`font-normal`}>{data?.original}</span></p>
                        <p className={`w-full text-start ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out font-Montserrat font-semibold text-sm md:text-lg pt-2 `}>Date Created : <span className={`font-normal`}>{data?.dateCreated}</span></p>
                    </div>

                    <div className={`w-full overflow-hidden p-[1px] flex justify-center items-center h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl rounded-md lg:rounded-lg`}>
                        <div className={`w-full relative h-full rounded-md lg:rounded-lg ${theme === 'dark' ? "bg-black" : "bg-white"} px-3 py-3`}>
                            
                            <div className={`w-full flex flex-col justify-start items-center overflow-y-auto gap-3 h-[80%] px-3 rounded-md lg:rounded-lg`}>

                                {(data?.chat ?? []).map((chat, index) => {
                                    return <div key={index} className={`w-full py-3 flex ${chat.role === 'user' ? "justify-end items-center" : "items-center justify-start"} gap-2`}>
                                        <span className={`${chat.role === 'ai' ? "block" : "hidden"} p-2 rounded-full bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 text-white lg:text-xl`}><IoSparklesSharp/></span>
                                        <p className={`${chat.role === 'user' ? "bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-b-lg rounded-tl-lg text-end text-white" : "text-start"} ${chat.role === 'ai' && theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out font-Montserrat text-sm md:text-lg w-[90%] md:w-[70%] py-3 px-3`}>{chat.content}</p>
                                        <span className={`${chat.role === 'user' ? "block" : "hidden"} lg:text-xl ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out`}><FaUser /></span>
                                    </div>
                                })}
                            </div>
                            
                            <div className={`w-[90%] lg:w-[95%] flex justify-center items-center absolute left-1/2 -translate-x-1/2 bottom-5 py-2`}>
                                <textarea value={input} onChange={(e) => setInput(e.target.value)} className={`${theme === 'dark' ? "bg-zinc-700 text-white placeholder-white" : "bg-gray-200 text-black placeholder-black"} h-24 pr-10 w-full duration-200 ease-in-out rounded-md lg:rounded-lg py-3 px-3 outline-none font-Montserrat`} placeholder="Ask your question" />
                                <span className={`absolute right-2 bottom-4 p-2 lg:p-3 rounded-md lg:rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-600 text-white cursor-pointer`} onClick={ask}><HiMiniSparkles /></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default page
