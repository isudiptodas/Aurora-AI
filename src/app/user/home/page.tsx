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
import { IoMdChatboxes } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface setData {
  setName: string,
  userEmail: string,
  setType: string,
  vectorCollectionName: string,
  dateCreated: string,
  original: string,
  chat?: [{ role: string, content: string }]
}

function page() {

  const demoData = [
    {
      setName: `random_set_name`,
      userEmail: `sudipto@gmail.com`,
      setType: `pdf`,
      vectorCollectionName: `random_set_name`,
      dateCreated: `mon, 23 june 2025`,
      original: `sudipto resume.pdf`,
    },
    {
      setName: `random_set_name`,
      userEmail: `sudipto@gmail.com`,
      setType: `youtube`,
      vectorCollectionName: `random_set_name`,
      dateCreated: `mon, 23 june 2025`,
      original: `sudipto resume.pdf`,
    },
    {
      setName: `random_set_name`,
      userEmail: `sudipto@gmail.com`,
      setType: `web`,
      vectorCollectionName: `random_set_name`,
      dateCreated: `mon, 23 june 2025`,
      original: `sudipto resume.pdf`,
    },
    {
      setName: `random_set_name`,
      userEmail: `sudipto@gmail.com`,
      setType: `pdf`,
      vectorCollectionName: `random_set_name`,
      dateCreated: `mon, 23 june 2025`,
      original: `sudipto resume.pdf`,
    },
    {
      setName: `random_set_name`,
      userEmail: `sudipto@gmail.com`,
      setType: `pdf`,
      vectorCollectionName: `random_set_name`,
      dateCreated: `mon, 23 june 2025`,
      original: `sudipto resume.pdf`,
    },
    {
      setName: `random_set_name`,
      userEmail: `sudipto@gmail.com`,
      setType: `youtube`,
      vectorCollectionName: `random_set_name`,
      dateCreated: `mon, 23 june 2025`,
      original: `sudipto resume.pdf`,
    },
    {
      setName: `random_set_name`,
      userEmail: `sudipto@gmail.com`,
      setType: `web`,
      vectorCollectionName: `random_set_name`,
      dateCreated: `mon, 23 june 2025`,
      original: `sudipto resume.pdf`,
    },
  ]

  const [theme, setTheme] = useState<string>('');
  const [option, setOption] = useState('pdf');
  const [uploadOption, setUploadOption] = useState('pdf');
  const [filter, setFilter] = useState('newest');
  const [file, setFile] = useState<File | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [youtube, setYoutube] = useState('');
  const [allSets, setAllSets] = useState<setData[]>([]);
  const [web, setWeb] = useState('');
  const [name, setName] = useState('');
  const [today, setToday] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  const days = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'];
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    const fetchSetData = async () => {
      try {
        const res = await axios.get(`/api/all-set/?user=${encodeURIComponent(userEmail)}`, {
          withCredentials: true
        });

        if (res.status === 200) {
          setAllSets(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchSetData();
  }, [userEmail]);

  useEffect(() => {
    if (theme !== '') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const createSet = async () => {

    const date = new Date().getDate();
    const month = months[new Date().getMonth()];
    const day = days[new Date().getDay()];
    const year = new Date().getFullYear();
    const todayDate = `${day}, ${date} ${month} ${year}`;
    setToday(`${day}, ${date} ${month} ${year}`);

    // pdf
    if (uploadOption === 'pdf') {
      if (!file || !name) {
        toast.error("Empty fields not allowed");
        return;
      }

      if (name.includes(" ")) {
        toast.error("Space not allowed in name");
        return;
      }

      let id = toast.loading("Creating");

      try {

        const form = new FormData();
        form.append('file', file);

        const output = await axios.post(`https://api.apyhub.com/extract/text/pdf-file`, form, {
          headers: {
            'apy-token': `${process.env.NEXT_PUBLIC_APUHUB_API2}`,
            'Content-Type': `multipart/form-data`
          }
        });

        //console.log(output.data.data);

        const res = await axios.post(`/api/upload`, {
          name, type: 'pdf', pdfText: output.data.data, today: todayDate, userEmail, original: file?.name
        }, {
          withCredentials: true
        });

        if (res.status === 200) {
          const temp: setData = res.data.data;
          setAllSets([...allSets, temp]);
          toast.dismiss(id);
          toast.success("New Set Created");
          setPopupVisible(false);
          setName('');
          setFile(null);
          setWeb('');
          setYoutube('');
        }

        //console.log(res);
      } catch (err: any) {
        console.log(err);
        if (err?.response && err?.response?.data) {
          toast.dismiss(id);
          toast.error(err.response.data.message);
        }
        else {
          toast.error("Something went wrong");
        }
      }
      finally {
        toast.dismiss(id);
      }
    }
    // web
    else if (uploadOption === 'web') {
      if (!web || !name) {
        toast.error("Empty fields not allowed");
        return;
      }

      if (name.includes(" ")) {
        toast.error("Space not allowed in name");
        return;
      }

      if (!web.startsWith("https://")) {
        toast.error("Please enter valid web URL");
        return;
      }

      let id = toast.loading("Creating");

      try {

        const result = await axios.get(`https://api.apyhub.com//extract/text/webpage`, {
          params: {
            url: web.trim()
          }, headers: {
            'Content-Type': 'application/json',
            'apy-token': `${process.env.NEXT_PUBLIC_APUHUB_API1}`
          }
        });

        //console.log(result.data.data);

        const res = await axios.post(`/api/upload`, {
          name, web: result.data.data, type: 'web', today: todayDate, userEmail, original: web
        }, {
          withCredentials: true
        });

        if (res.status === 200) {
          const temp: setData = res.data.data;
          setAllSets([...allSets, temp]);
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
          toast.error(err.response.data.message);
        }
        else {
          toast.error("Something went wrong");
        }
      }
      finally {
        toast.dismiss(id);
      }
    }

    // youtube
    else if (uploadOption === 'youtube') {
      if (!youtube || !name) {
        toast.error("Empty fields not allowed");
        return;
      }

      if (name.includes(" ")) {
        toast.error("Space not allowed in name");
        return;
      }

      if (!youtube.startsWith("https://")) {
        toast.error("Please enter valid youtube URL");
        return;
      }

      let id = toast.loading("Creating");

      try {
        const res = await axios.post(`/api/upload`, {
          name, youtube: youtube.trim(), type: 'youtube', today: todayDate, userEmail
        }, { withCredentials: true });

        if (res.status === 200) {
          const temp: setData = res.data.data;
          setAllSets([...allSets, temp]);
          toast.dismiss(id);
          toast.success("New Set Created");
          setPopupVisible(false);
          setName('');
          setFile(null);
          setWeb('');
          setYoutube('');
        }
      } catch (err: any) {
        console.log(err);
        if (err?.response && err?.response?.data) {
          toast.dismiss(id);
          toast.error(err.response.data.message);
        }
        else {
          toast.error("Something went wrong");
        }
      }
      finally {
        toast.dismiss(id);
      }
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/auth`, {
          withCredentials: true
        });

        //console.log(res);
        setUserEmail(res.data.found.email);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUser();
  }, []);

  const navigate = (setName: string) => {
    const data = { setName };
    router.push(`/user/chat/${setName}?data=${encodeURIComponent(JSON.stringify(data))}`);
  }

  useEffect(() => {
    const filterType = () => {
      if (option === 'youtube') {
        const temp = allSets.filter((data) => {
          return data.setType === 'youtube'
        });

        setAllSets(temp);
      }
      else if (option === 'web') {
        const temp = allSets.filter((data) => {
          return data.setType === 'web'
        });

        setAllSets(temp);
      }
      else if (option === 'pdf') {
        const temp = allSets.filter((data) => {
          return data.setType === 'pdf'
        });

        setAllSets(temp);
      }
    }

    filterType();
  }, [option]);


  return (
    <>
      <div className={`${theme === 'dark' ? "bg-black" : "bg-white"} duration-200 ease-in-out w-full min-h-screen flex flex-col justify-start items-center overflow-hidden relative`}>
        <MenuBar theme={theme} setTheme={setTheme} />

        {/* popup */}
        <div className={`${popupVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"} duration-500 ease-in-out transition-all w-full h-full px-5 md:px-10 absolute z-30 backdrop-blur-3xl bg-black/40 flex flex-col justify-start pt-32 items-center`}>
          <div className={`w-full rounded-md lg:rounded-lg md:w-[60%] lg:w-[40%] py-4 px-3 ${theme === 'dark' ? "bg-zinc-800" : "bg-white"} duration-200 ease-in-out flex flex-col justify-start items-center`}>
            <p className={`${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out font-Montserrat pb-2 border-b-2 border-cyan-700 text-lg font-semibold`}>Create Your New Set</p>
            <div className={`w-full mt-8 mb-5 flex px-4 justify-center items-center gap-2`}>
              <span onClick={() => setUploadOption('pdf')} className={`font-Montserrat px-5 py-2 ${uploadOption === 'pdf' ? "border-b-2 border-cyan-500" : "border-b-0"} ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out flex justify-center items-center gap-2 cursor-pointer`}>PDF <FaFilePdf /></span>
              <span onClick={() => setUploadOption('web')} className={`font-Montserrat px-5 py-2 ${uploadOption === 'web' ? "border-b-2 border-cyan-500" : "border-b-0"} ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out flex justify-center items-center gap-2 cursor-pointer`}>Web <CiGlobe /></span>
              <span onClick={() => setUploadOption('youtube')} className={`font-Montserrat px-5 py-2 ${uploadOption === 'youtube' ? "border-b-2 border-cyan-500" : "border-b-0"} ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out flex justify-center items-center gap-2 cursor-pointer`}>YouTube <FaYoutube /></span>
            </div>

            {/* web */}
            <div className={`${uploadOption === 'web' ? "block" : "hidden"} w-full flex flex-col justify-center items-center gap-2`}>
              <p className={` font-Montserrat text-center px-5 opacity-65 text-[10px] md:text-sm mt-1 mb-1 ${theme === 'dark' ? " text-white" : " text-black"} duration-200 ease-in-out`}>Please note that the amount of time required to process depends on the content of the website </p>

              <input value={web} onChange={(e) => setWeb(e.target.value)} type="text" className={`${theme === 'dark' ? "bg-black text-white" : "bg-gray-200 text-black"} rounded-md lg:rounded-lg w-full outline-none font-Montserrat text-sm px-3 py-2 lg:py-3`} placeholder="www.wikipedia.com/stranger-things" />
              <p className={`${theme === 'dark' ? "text-white" : "text-black"} font-Montserrat text-start w-full pt-3 pb-2`}>Name your set</p>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" className={`${theme === 'dark' ? "bg-black text-white" : "bg-gray-200 text-black"} rounded-md lg:rounded-lg w-full outline-none font-Montserrat text-sm px-3 py-2 lg:py-3 mb-2`} placeholder="My_new_set" />
              <p className={`${theme === 'dark' ? "text-white" : "text-black"} font-Montserrat text-center w-full py-2 lg:py-3 bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer rounded-md lg:rounded-lg`} onClick={createSet}>Create</p>
              <p onClick={() => setPopupVisible(false)} className={`${theme === 'dark' ? "bg-white text-red-500 font-semibold" : "bg-black text-red-500 font-semibold"} font-Montserrat text-center w-full py-2 lg:py-3 cursor-pointer rounded-md lg:rounded-lg`}>Cancel</p>
            </div>

            {/* youtube */}
            <div className={`${uploadOption === 'youtube' ? "block" : "hidden"} w-full flex flex-col justify-center items-center gap-2`}>
              <p className={` font-Montserrat text-center px-5 opacity-65 text-[10px] md:text-sm mt-1 mb-1 ${theme === 'dark' ? " text-white" : " text-black"} duration-200 ease-in-out`}>Please note that the amount of time required to process depends on the video length </p>

              <input value={youtube} onChange={(e) => setYoutube(e.target.value)} type="text" className={`${theme === 'dark' ? "bg-black text-white" : "bg-gray-200 text-black"} rounded-md lg:rounded-lg w-full outline-none font-Montserrat text-sm px-3 py-2 lg:py-3`} placeholder="https://www.youtube.com/link/to/video" />
              <p className={`${theme === 'dark' ? "text-white" : "text-black"} font-Montserrat text-start w-full pt-3 pb-2`}>Name your set</p>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" className={`${theme === 'dark' ? "bg-black text-white" : "bg-gray-200 text-black"} rounded-md lg:rounded-lg w-full outline-none font-Montserrat text-sm px-3 py-2 lg:py-3 mb-2`} placeholder="My_new_set" />
              <p className={`${theme === 'dark' ? "text-white" : "text-black"} font-Montserrat text-center w-full py-2 lg:py-3 bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer rounded-md lg:rounded-lg`} onClick={createSet}>Create</p>
              <p onClick={() => setPopupVisible(false)} className={`${theme === 'dark' ? "bg-white text-red-500 font-semibold" : "bg-black text-red-500 font-semibold"} rounded-md lg:rounded-lg font-Montserrat text-center w-full py-2 lg:py-3 cursor-pointer`}>Cancel</p>
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
              <p className={` font-Montserrat text-center px-5 opacity-65 text-[10px] md:text-sm mt-1 ${theme === 'dark' ? " text-white" : " text-black"} duration-200 ease-in-out`}>Please note that the amount of time required to process depends on the pages and size of pdf</p>

              <p className={`${theme === 'dark' ? "text-white" : "text-black"} font-Montserrat text-start w-full pt-3 pb-2`}>Name your set</p>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" className={`${theme === 'dark' ? "bg-black text-white" : "bg-gray-200 text-black"} rounded-md lg:rounded-lg w-full outline-none font-Montserrat text-sm px-3 py-2 lg:py-3 mb-2`} placeholder="My_new_set" />
              <p className={`${theme === 'dark' ? "text-white" : "text-black"} font-Montserrat text-center w-full py-2 lg:py-3 bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer rounded-md lg:rounded-lg`} onClick={createSet}>Create</p>
              <p onClick={() => setPopupVisible(false)} className={`${theme === 'dark' ? "bg-white text-red-500 font-semibold" : "bg-black text-red-500 font-semibold"} font-Montserrat text-center w-full py-2 lg:py-3 cursor-pointer rounded-md lg:rounded-lg`}>Cancel</p>
            </div>
          </div>
        </div>

        <div className={`w-full mt-24 lg:mt-28 flex flex-col md:flex-row justify-center items-center md:gap-3 px-4 py-2 md:px-8 lg:px-10`}>
          <div className={`w-full flex relative md:w-[60%]`}>
            <input type="text" className={`${theme === 'dark' ? "bg-zinc-700 text-white" : "bg-gray-200 text-black"} font-Montserrat outline-none px-3 pr-11 py-4 w-full rounded-md lg:rounded-lg`} placeholder="Search your sets " />
            <span className={`${theme === 'dark' ? "text-gray-300" : "text-gray-800"} absolute top-5 lg:text-xl right-8 cursor-pointer`}><IoSearchSharp /></span>
          </div>

          <p className={` text-white w-full text-sm lg:text-lg md:w-auto px-5 text-center font-bold mt-3 md:mt-0 py-3 md:py-4 cursor-pointer bg-gradient-to-br from-emerald-400 to-emerald-700 duration-200 ease-in-out font-Montserrat capitalize flex justify-center items-center gap-2 rounded-md lg:rounded-lg`}>{filter} <LuArrowDownUp /></p>
          <p onClick={() => setPopupVisible(true)} className={` text-white w-full text-sm lg:text-lg md:w-auto px-5 text-center font-bold mt-3 md:mt-0 py-3 md:py-4 cursor-pointer bg-gradient-to-br from-purple-400 to-pink-700 duration-200 ease-in-out font-Montserrat flex justify-center items-center gap-2 rounded-md lg:rounded-lg`}>Create New Set <MdOutlineMarkChatUnread /></p>
        </div>

        <div className={`mt-5 lg:hidden w-full flex justify-center items-center py-3 px-5 `}>
          <p onClick={() => setOption('pdf')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'pdf' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>PDF</p>
          <p onClick={() => setOption('youtube')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'youtube' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>YouTube URL</p>
          <p onClick={() => setOption('web')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'web' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>Web URl</p>
        </div>

        <div className={`mt-5 hidden w-full lg:flex justify-center items-center py-3 px-5 lg:px-10 `}>
          <p onClick={() => setOption('pdf')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'pdf' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>PDF</p>
          <p onClick={() => setOption('youtube')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'youtube' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>YouTube URL</p>
          <p onClick={() => setOption('web')} className={`w-auto ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out px-4 py-2 text-lg cursor-pointer font-Montserrat ${option === 'web' ? "border-b-4 border-cyan-600" : "border-b-0"}`}>Web URL</p>
        </div>

        <div className={`w-[90%] mt-5 md:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center gap-5`}>
          {allSets.length > 0 && allSets.map((set, index) => {
            return <div key={index} className={`${theme === 'dark' ? "bg-zinc-800" : "bg-gray-200"} duration-200 ease-in-out w-full overflow-hidden rounded-md lg:rounded-lg flex flex-col justify-start items-center py-3 px-4`}>
              <h1 className={`w-full text-start ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out font-Montserrat font-semibold text-xl pb-2`}>{set.setName}</h1>
              <h1 className={`w-full text-start ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out font-Montserrat text-sm`}>Date created : {set.dateCreated}</h1>
              <h1 className={`w-full text-start ${theme === 'dark' ? "text-white" : "text-black"} duration-200 ease-in-out font-Montserrat text-sm`}>Type : {set.setType}</h1>
              <div className={`w-full flex justify-baseline mt-4 items-center gap-3`}>
                <p className={`w-full rounded-md cursor-pointer ${theme === 'dark' ? "bg-white text-black" : "bg-black text-white"} font-Montserrat duration-200 text-center flex justify-center items-center gap-2 ease-in-out py-2`} onClick={() => { navigate(set.setName) }}>Chat <IoMdChatboxes /></p>
                <p className={`w-full rounded-md cursor-pointer ${theme === 'dark' ? "bg-red-500 text-white" : "bg-red-500 text-white"} font-Montserrat duration-200 text-center flex justify-center items-center gap-2 ease-in-out py-2`}>Delete <FaRegTrashCan /></p>
              </div>
            </div>
          })}
        </div>


      </div>
    </>
  )
}

export default page
