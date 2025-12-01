"use client"
import { useState } from "react"
import { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid'
import Link from "next/link";
import Image from 'next/image';

export default function Home() {
  const [url, seturl] = useState("")
  const [shorturl, setshorturl] = useState("")
  const [isUrlGenerated, setisUrlGenerated] = useState(false)
  const [finalUrl, setFinalUrl] = useState("")
  const shortUrlRef = useRef(null);
  const urlRef = useRef(null);
  const notify = (p) => toast(p);
  const generateApi = process.env.NEXT_PUBLIC_GENERATE_API

  const raw = JSON.stringify({
    "url": url,
    "shorturl": shorturl
  });

  const copyClipbord = () => {
    navigator.clipboard.writeText(finalUrl).then(() => notify("Link Copied!"))

  }


  const generateUrl = async () => {
    try {
      const response = await fetch(generateApi, {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result)

      if (result.success == true) {
        setisUrlGenerated(true)
        setFinalUrl(process.env.NEXT_PUBLIC_HOST + shorturl)

        notify("Shorting successful!");

        // clear inputs
        seturl("")
        setshorturl("")
      } else {
        notify(`Shorting failed! ${result.message}`);
      }


    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="bg-[url('/bg.jpg')] bg-cover bg-center h-screen flex justify-center items-center">

      <div className="backdrop-blur-md border border-white outline outline-yellow-300 w-fit m-auto p-8 rounded-3xl">
        <div className="flex gap-3 justify-center items-center">
          {/* logo */}
          <div className="size-16">

            <img src="/shorting-link.png" alt="" width={80} height={10} />
          </div>
          {/* App Name */}
          <div className="bg-gradient-to-r from-yellow-600  via-[#ffd700] to-[#f24f0e] bg-clip-text text-transparent text-[50px] font-bold text-center">
            Shorting Link
          </div>
        </div>
        <div className="italic text-white text-sm text-center">Make your every link short and easy to read.</div>


        <div className="form flex flex-col gap-2 w-fit m-auto">
          {/* long link input */}
          <div className=" w-fit m-auto">
            <label htmlFor="shortUrl" className="block mx-1 my-1 text-sm font-medium text-heading  text-yellow-500">Enter Link</label>
            <input onChange={e => { seturl(e.target.value) }} value={url} type="text" id="shortUrl" ref={urlRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (url === "") {
                    notify("Please enter URL")
                    urlRef.current.focus()
                  } else if (shorturl === "") {
                    notify("Please enter short URL")
                    shortUrlRef.current.focus()
                  } else {
                    generateUrl();
                  }
                }
              }}
              className="block w-[40vw] focus:outline-none focus:border-white  px-2.5 py-2.5 rounded-xl m-auto text-white  border border-yellow-500  text-heading  outline-amber-500 focus:ring-yellow-800 shadow-xs placeholder:text-body placeholder:italic" placeholder="Your original link here..." required />
          </div>

          {/* short link input */}
          <div className=" w-fit m-auto">
            <label htmlFor="shortUrl" className="block mx-1 my-1 text-sm font-medium text-heading  text-yellow-500">Enter Preffered Link Endpoint</label>
            <div>
              <div onClick={() => { shortUrlRef.current.focus() }} className="flex w-[40vw] focus:border shadow-xs rounded-base border border-yellow-500 rounded-xl outline-amber-500 focus:text-yellow-500 focus:ring-yellow-800">
                <span className="inline-flex items-center pl-3 pr-1  text-[#f6f6f6] text-body bg-neutral-tertiary rounded-xl">
                  {process.env.NEXT_PUBLIC_HOST}
                </span>

                <input onChange={e => { setshorturl(e.target.value) }} ref={shortUrlRef} value={shorturl} onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (url === "") {
                      notify("Please enter URL")
                      urlRef.current.focus()
                    } else if (shorturl === "") {
                      notify("Please enter short URL")
                      shortUrlRef.current.focus()
                    } else {
                      generateUrl();
                    }
                  }
                }} type="text" id="shortUrl" className="w-full rounded-xl focus:outline-none focus:border focus:border-0.2 pr-3 pl-0.5 py-2.5  m-auto text-white   text-heading   placeholder:text-body placeholder:italic" placeholder="your-endpoint-here" required />
              </div>
            </div>

          </div>

          <button onClick={generateUrl} type="button" className="my-4  bg-gradient-to-r from-yellow-500 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-yellow-800  rounded-3xl  px-4 py-2.5 text-center leading-5 text-black font-semibold">Create URL</button>

        </div>
        {isUrlGenerated &&

          <div className="w-fit m-auto text-center mt-3">

            <h2 className="text-gray-200 py-1 font-semibold">Your New Shorted URL</h2>

            <div className="generatedUrl bg-green-950  w-fit m-auto text-center border border-green-400 p-2 px-6  rounded-xl text flex items-center gap-3">
              <Link href={finalUrl} target="_blank" className="hover:text-green-200 hover:underline text-green-500 text-xl font-semibold"><span>{finalUrl}</span>
              </Link>
              <ClipboardDocumentIcon className="size-5 text-green-500 cursor-pointer hover:text-green-200" onClick={copyClipbord} />
            </div>
          </div>
        }

      </div>

      <ToastContainer />
    </div>

  );
}
