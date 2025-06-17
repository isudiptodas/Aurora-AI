'use client'
import Link from "next/link";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

function page() {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const router = useRouter();

  const login = async () => {
    if(!email || !password){
      toast.error("All fields are required");
      return;
    }

    let id = toast.loading("Processing");

    try {
      const res = await axios.post(`/api/auth`, {
        email, password, type: "login"
      });

      if(res.status === 200){
        toast.dismiss(id);
        router.push('/auth/login');
      }
    } catch (err: any) {
      toast.dismiss(id);
      if(err?.response && err?.response?.data){
        toast.error(err.response.data);
      }
      else{
        toast.error("Something went wrong")
      }
    }
    finally{
      toast.dismiss(id);
    }
  }

  return (
    <>
      <div className={`w-full h-screen flex flex-col justify-start items-center relative overflow-hidden`}>
        <h1 className={`text-white z-30 absolute sm:text-lg top-7 font-NewYork md:px-5 md:py-2 md:rounded-full md:backdrop-blur-3xl md:bg-white/20`}>AURORA AI</h1>
        <img src='/assets/aurora-phone.jpg' className={`absolute motion-preset-fade motion-duration-2000 w-full h-full object-cover`} />

        <div className={`w-full z-30 mb-12 mt-32 px-5`}>
          <h1 className={`w-full text-center text-sm z-30 mb-1 text-white font-Montserrat`}>Happy to see you back</h1>
          <h1 className={`w-full text-center text-4xl z-30 text-white font-bold font-Conquer`}>Resume Retrieval</h1>
        </div>

        <div className={`w-[90%] backdrop-blur-3xl rounded-lg sm:w-[70%] md:w-[60%] lg:w-[40%] z-30 flex flex-col justify-start items-center gap-2 py-4 px-4`}>
          <input type="email" className={`w-full rounded-md lg:rounded-lg bg-white font-Montserrat px-3 py-2 outline-none`} placeholder="Enter email" />
          <input type="text" className={`w-full rounded-md lg:rounded-lg bg-white font-Montserrat px-3 py-2 outline-none`} placeholder="Re enter password" />
          <p className={`w-full flex justify-center items-center gap-2 rounded-md lg:rounded-lg bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-700 text-black py-2 cursor-pointer font-Montserrat`} onClick={login}>Enter <IoIosLogOut /></p>
        </div>

        <Link href='/auth/register' className={`w-auto text-center text-white z-30 font-Conquer text-sm py-2 px-5 rounded-full border-b-2 my-2 border-white cursor-pointer hover:underline`}>Go to register</Link>
        <Link href='/' className={`w-auto text-center text-white z-30 font-Conquer text-sm py-2 px-5 rounded-full border-b-2 border-white cursor-pointer hover:underline`}>Back to landing page</Link>
      </div>
    </>
  )
}

export default page
