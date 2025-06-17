'use client'
import { IoIosArrowDropright } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import Marquee from "react-fast-marquee";
import { LuSparkle } from "react-icons/lu";
import Link from "next/link";

function page() {
  return (
    <>
      <div className={`w-full min-h-screen flex flex-col justify-start items-center relative overflow-hidden`}>

        <div className={`w-full h-screen overflow-hidden flex justify-center relative items-center`}>
          <img src='/assets/aurora-phone.jpg' className={`md:hidden motion-preset-fade motion-duration-2000 w-full h-full object-cover`} />
          <img src='/assets/aurora-landscape.jpg' className={`hidden md:block motion-preset-fade motion-duration-2000 w-full h-full object-cover`} />
          <div className={`w-full md:backdrop-blur-xl md:bg-white/5 md:rounded-b-4xl h-full absolute bg-transparent flex flex-col justify-center items-center`}>
            <h1 className={`text-white absolute sm:text-lg top-7 font-NewYork md:px-5 md:py-2 md:rounded-full md:backdrop-blur-3xl md:bg-white/20`}>AURORA AI</h1>
            <h2 className={`w-full text-center px-4 text-white text-3xl md:text-5xl font-Conquer motion-scale-in-[1.74] motion-translate-x-in-[-3%] motion-translate-y-in-[1%] motion-duration-[1.50s] motion-duration-[0.84s]/translate`}>Unlock Insights, Effortlessly</h2>
            <h2 className={`w-full sm:text-lg md:text-xl text-center px-4 text-white text-sm mt-2 font-Montserrat motion-preset-shrink motion-duration-2500`}>Chat with your data</h2>
            <Link href='/auth/register' className={`w-auto text-center text-sm mt-5 bg-white text-emerald-500 font-Conquer px-4 py-2 rounded-full cursor-pointer flex overflow-hidden justify-center items-center group gap-3 motion-scale-in-[0.3] motion-rotate-in-[-10deg] motion-blur-in-[10px] motion-delay-[0.75s]/rotate motion-delay-[0.75s]/blur`}>Try for free <span className={``}><IoIosArrowDropright /></span></Link>
          </div>
        </div>

        <div className={`w-full h-auto py-5 px-4 bg-black flex flex-col justify-start items-center relative`}>
          <h2 className={`bg-gradient-to-r from-white via-emerald-300 to-emerald-600 bg-clip-text text-transparent px-7 font-Conquer sm:px-10 md:text-2xl xl:text-3xl xl:mt-8 text-center text-lg mt-5 `}>Get Access To Intelligent Retrieval & Endless Possibilities</h2>

          <h1 className={`w-full text-center absolute text-white font-Montserrat font-bold text-8xl hidden lg:block mt-[105px]`}>RETRIEVE</h1>

          <div className={`w-full bg-transparent lg:mt-16 md:px-5 grid grid-cols-1 md:grid-cols-3 justify-items-center gap-2 md:gap-4 lg:top-36`}>
            <div className={`w-full md:px-3 rounded-lg lg:rounded-2xl flex flex-col justify-center items-center backdrop-blur-[4px] bg-white/10 mt-10 h-44`}>
              <span className={`text-white text-4xl opacity-50`}><FaYoutube /></span>
              <h2 className={`w-full text-center text-white font-Montserrat text-xl md:text-lg mt-1 font-bold`}>YouTube Video URL</h2>
              <p className={`w-full text-center text-white font-Montserrat text-[10px]`}>Paste youtube video URls and start a new chat</p>
            </div>
            <div className={`w-full md:px-3 rounded-lg lg:rounded-2xl flex flex-col justify-center items-center backdrop-blur-[4px] bg-white/10 mt-10 h-44`}>
              <span className={`text-white text-4xl opacity-50`}><FaFilePdf /></span>
              <h2 className={`w-full text-center text-white font-Montserrat text-xl md:text-lg mt-1 font-bold`}>PDF</h2>
              <p className={`w-full text-center text-white font-Montserrat text-[10px]`}>Upload PDF document and wait until chatbox loads</p>
            </div>
            <div className={`w-full md:px-3 rounded-lg lg:rounded-2xl flex flex-col justify-center items-center backdrop-blur-[4px] bg-white/10 mt-10 h-44`}>
              <span className={`text-white text-4xl opacity-50`}><CiGlobe /></span>
              <h2 className={`w-full text-center text-white font-Montserrat text-xl md:text-lg mt-1 font-bold`}>Website URL</h2>
              <p className={`w-full text-center text-white font-Montserrat text-[10px]`}>Enter a website link and start chatting</p>
            </div>
          </div>
        </div>

        <div className={`w-full md:pt-12 bg-black h-auto py-10 flex justify-center items-center relative`}>
          <div className={`w-[20%] h-full absolute left-0 bg-gradient-to-r from-black to-transparent z-20`}></div>
          <Marquee pauseOnHover={true} speed={70}>
            <p className={`text-4xl lg:text-6xl cursor-pointer font-Montserrat font-bold bg-gradient-to-br from-white via-emerald-300 to-emerald-600 bg-clip-text text-transparent px-4`}>CHAT</p>
            <p className={`text-2xl lg:text-3xl cursor-pointer font-Montserrat text-white px-4`}><LuSparkle /></p>
            <p className={`text-4xl lg:text-6xl cursor-pointer font-Montserrat font-bold bg-gradient-to-br from-white via-emerald-300 to-emerald-600 bg-clip-text text-transparent px-4`}>Q&A</p>
            <p className={`text-2xl lg:text-3xl cursor-pointer font-Montserrat text-white px-4`}><LuSparkle /></p>
            <p className={`text-4xl lg:text-6xl cursor-pointer font-Montserrat font-bold bg-gradient-to-br from-white via-emerald-300 to-emerald-600 bg-clip-text text-transparent px-4`}>SUMMARIZE</p>
            <p className={`text-2xl lg:text-3xl cursor-pointer font-Montserrat text-white px-4`}><LuSparkle /></p>
          </Marquee>
          <div className={`w-[20%] h-full absolute right-0 bg-gradient-to-l from-black to-transparent z-20`}></div>
        </div>
      </div>
    </>
  )
}

export default page
