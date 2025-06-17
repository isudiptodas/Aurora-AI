'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "sonner";

function page() {

  const[email, setEmail] = useState('');
  const[name, setName] = useState('');
  const[password, setPassword] = useState('');
  const[confirm, setConfirm] = useState('');
  const router = useRouter();

  const register = async () => {
    if(!email || !name || !password || !confirm){
      toast.error("All fields are required");
      return;
    }
    if(password.length < 8){
      toast.error("Password must be 8 or more");
      return;
    }
    if(password !== confirm){
      toast.error("Password & confirm password should match");
      return;
    }

    if(!email.includes('@gmail.com') && !email.includes('@outlook.com')){
      toast.error("Enter a valid email");
      return;
    }

    let id = toast.loading("Processing");

    try {
      const res = await axios.post(`/api/auth`, {
        name, email, password, type: "register"
      });

      console.log(res);
      if(res.status === 200){
        toast.dismiss(id);
        toast.success("Registered");
        setTimeout(() => {
          router.push('/auth/login');
        }, 1500);
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

        <div className={`w-full z-30 mb-12 mt-32 md:mt-36 px-5`}>
          <h1 className={`w-full text-center text-sm z-30 mb-1 text-white font-Montserrat`}>Be a Little Smarter</h1>
          <h1 className={`w-full text-center text-4xl z-30 text-white font-bold font-Conquer`}>Join With Us </h1>
        </div>

        <div className={`w-[90%] backdrop-blur-3xl rounded-lg sm:w-[70%] md:w-[60%] lg:w-[40%] z-30 flex flex-col justify-start items-center gap-2 py-4 px-4`}>
          <input onChange={(e) => setName(e.target.value)} type="text" className={`w-full rounded-md lg:rounded-lg bg-white font-Montserrat px-3 py-2 outline-none`} placeholder="Enter full name" />
          <input onChange={(e) => setEmail(e.target.value)} type="email" className={`w-full rounded-md lg:rounded-lg bg-white font-Montserrat px-3 py-2 outline-none`} placeholder="Enter email" />
          <input onChange={(e) => setPassword(e.target.value)} type="password" className={`w-full rounded-md lg:rounded-lg bg-white font-Montserrat px-3 py-2 outline-none`} placeholder="Set a password" />
          <input onChange={(e) => setConfirm(e.target.value)} type="password" className={`w-full rounded-md lg:rounded-lg bg-white font-Montserrat px-3 py-2 outline-none`} placeholder="Re enter password" />
          <p className={`w-full flex justify-center items-center gap-2 rounded-md lg:rounded-lg bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-700 text-black py-2 cursor-pointer font-Montserrat`} onClick={register}>Create <IoIosLogOut /></p>
        </div>

        <Link href='/auth/login' className={`w-auto text-center text-white z-30 font-Conquer text-sm py-2 px-5 rounded-full border-b-2 my-2 border-white cursor-pointer hover:underline`}>Go to login</Link>
        <Link href='/' className={`w-auto text-center text-white z-30 font-Conquer text-sm py-2 px-5 rounded-full border-b-2 border-white cursor-pointer hover:underline`}>Back to landing page</Link>
      </div>
    </>
  )
}

export default page
