'use client'

import MenuBar from "@/components/MenuBar";
import { useEffect, useState } from "react"

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
        <MenuBar theme={theme} setTheme={setTheme}/>
      </div>
    </>
  )
}

export default page
