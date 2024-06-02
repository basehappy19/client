"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  
  return (
    <main className="h-screen flex flex-col md:items-center md:flex-row justify-center">
      <div className="flex flex-col md:flex-row gap-2 md:gap-5 px-5">
        <div className="bg-white group cursor-pointer transition-all ease-in-out hover:scale-105 duration-300 relative border-2 shadow-md shadow-pink-300 border-pink-500 text-black md:w-80 w-full h-80 rounded-lg mb-3 flex flex-col">
          <Link href={"/enroll"}>
            <div className="p-5 font-medium text-4xl">ลงทะเบียน</div>
            <div className="w-full h-full absolute">
              <svg
                className="transition-all ease-in-out duration-300 absolute bottom-24 md:left-6 right-10 opacity-45"
                viewBox="0 0 24 24"
                fill="none"
                width="250px"
                height="250px"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#878787"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M14 4L17.5 4C20.5577 4 20.5 8 20.5 12C20.5 16 20.5577 20 17.5 20H14M15 12L3 12M15 12L11 16M15 12L11 8"
                    stroke="#878787"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          </Link>
        </div>
        {!session ? (
          <div className="bg-white group transition-all ease-in-out hover:scale-105 duration-300 relative border-2 shadow-md shadow-blue-300	 border-blue-500 text-black md:w-80 w-full h-80 rounded-lg mb-3 flex flex-col">
            <Link href="/login">
              <div className="p-5 font-medium text-4xl">ล็อคอิน</div>
              <div className="w-full h-full absolute right-12">
                <svg
                  className="transition-all ease-in-out duration-300 absolute bottom-28 md:left-28 right-10 opacity-45"
                  viewBox="0 0 24 24"
                  width="200px"
                  height="200px"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                      stroke="#878787"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
            </Link>
          </div>
        ) : (
          <div className="bg-white group transition-all ease-in-out hover:scale-105 duration-300 relative border-2 shadow-md shadow-blue-300	 border-blue-500 text-black md:w-80 w-full h-80 rounded-lg mb-3 flex flex-col">
            <Link href="/post">
              <div className="p-5">
                <div className="font-medium text-xl">
                  สวัสดี {session?.user?.name}
                </div>
                <div>โพสต์ จัดการข้อมูลต่างๆ</div>
              </div>
              <div className="w-full h-full absolute">
                <svg
                  className="transition-all ease-in-out duration-300 absolute bottom-32 md:left-16 right-10 opacity-45"
                  viewBox="0 0 16 16"
                  width="200px"
                  height="200px"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g fill="#878787" fill-rule="evenodd" clip-rule="evenodd">
                      {" "}
                      <path d="M8.675 4.173a.75.75 0 00-1.35 0l-1.14 2.359-2.546.38a.75.75 0 00-.418 1.273l1.85 1.84-.437 2.6a.75.75 0 001.094.786L8 12.19l2.272 1.22a.75.75 0 001.094-.785l-.437-2.602 1.85-1.839a.75.75 0 00-.418-1.273l-2.545-.38-1.14-2.359zM7.362 7.542L8 6.222l.638 1.32a.75.75 0 00.565.415l1.459.218-1.066 1.059a.75.75 0 00-.21.656l.247 1.476-1.278-.686a.75.75 0 00-.71 0l-1.278.686.248-1.476a.75.75 0 00-.211-.656l-1.066-1.06 1.46-.217a.75.75 0 00.564-.415z"></path>{" "}
                      <path d="M12 .75a.75.75 0 00-1.5 0V1h-5V.75a.75.75 0 00-1.5 0V1H2.25A2.25 2.25 0 000 3.25v10.5A2.25 2.25 0 002.25 16h11.5A2.25 2.25 0 0016 13.75V3.25A2.25 2.25 0 0013.75 1H12V.75zm-8 2.5V2.5H2.25a.75.75 0 00-.75.75v10.5c0 .414.336.75.75.75h11.5a.75.75 0 00.75-.75V3.25a.75.75 0 00-.75-.75H12v.75a.75.75 0 01-1.5 0V2.5h-5v.75a.75.75 0 01-1.5 0z"></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </div>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
