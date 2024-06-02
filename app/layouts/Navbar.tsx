"use client";
import React, { FC, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div className="border-b-2 bg-white border-gray-950">
      <nav className="p-2 container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="text-black font-medium">
          <img src={"/logo.png"} width={50} height={50} alt="logo" />
        </Link>
        <div className="flex gap-3 items-center lg:hidden">
          <button
            className="border-0 focus:outline-0 focus:shadow-none active:outline-0 active:shadow-none"
            type="button"
            onClick={() => toggleMenu()}
          >
            <span
              className={`w-7 h-1 block transition-all rounded-md ${
                isMenuOpen
                  ? "bg-red-500 rotate-45 origin-[10%_10%]"
                  : "rotate-0 bg-slate-500"
              }`}
            ></span>
            <span
              className={`w-7 h-1 block transition-all rounded-md ${
                isMenuOpen ? "bg-red-500 opacity-0" : "opacity-100 bg-slate-500"
              }`}
              style={{ margin: "3.5px auto" }}
            ></span>
            <span
              className={`w-7 h-1 block transition-all rounded-md ${
                isMenuOpen
                  ? "bg-red-500 -rotate-45 origin-[10%_90%]"
                  : "rotate-0 bg-slate-500"
              }`}
            ></span>
          </button>
        </div>
        <div className="hidden lg:flex space-x-4 m-0">
          <ul className="lg:flex gap-5 m-0 p-0">
            <li className="cursor-pointer my-2 py-2 rounded-sm transition-all ease-in-out duration-300 group hover:bg-pink-300">
              <Link
                href="/"
                className="text-slate-700 group-hover:px-2 transition-all ease-in-out duration-300 font-medium"
              >
                หน้าหลัก
              </Link>
            </li>
            <li className="cursor-pointer my-2 py-2 rounded-sm transition-all ease-in-out duration-300 group hover:bg-pink-300">
              <Link
                href="/enroll"
                className="text-slate-700 group-hover:px-2 transition-all ease-in-out duration-300 font-medium"
              >
                ลงทะเบียน
              </Link>
            </li>
            {session ? (
              <li className="relative cursor-pointer my-2 py-2 rounded-sm transition-all ease-in-out group duration-300">
                <button
                  onClick={() => toggleDropDown()}
                  id="dropdownDefaultButton"
                  className="text-slate-700 group-hover:px-2 transition-all ease-in-out duration-300 font-medium focus:outline-none rounded-lg text-center inline-flex items-center"
                  type="button"
                >
                  {session?.user?.name}
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  className={`z-10 ${
                    isDropDownOpen ? "" : "hidden"
                  } bg-white divide-y absolute divide-gray-100 rounded-lg shadow w-32`}
                >
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        href="/post"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        เพิ่มรายการ
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/post/${session?.user?.userId}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        รายการของฉัน
                      </Link>
                    </li>
                    {session?.user?.canManageUsers == 1 ? (
                      <li>
                        <Link
                          href="/users"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          จัดการผู้ใช้
                        </Link>
                      </li>
                    ) : null}
                    <li>
                      <a
                        onClick={() => signOut()}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        ออกจากระบบ
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            ) : (
              <li className="cursor-pointer my-2 py-2 rounded-sm transition-all ease-in-out duration-300 group hover:bg-pink-300">
                <Link
                  href="/login"
                  className="text-slate-700 group-hover:px-2 transition-all ease-in-out duration-300 font-medium flex"
                >
                  ล็อคอิน
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="inline-flex icon icon-tabler icons-tabler-outline icon-tabler-login-2"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                    <path d="M3 12h13l-3 -3" />
                    <path d="M13 15l3 -3" />
                  </svg>
                </Link>
              </li>
            )}
          </ul>
        </div>
        {isMenuOpen ? (
          <div className="basis-full flex-col lg:hidden lg:space-x-4 m-0 mt-3">
            <ul className="m-0 p-0">
              <li className="cursor-pointer w-full my-2 py-2 rounded-sm transition-all ease-in-out duration-300 group hover:bg-pink-300">
                <Link
                  href="/"
                  className="text-slate-700 group-hover:px-2 transition-all ease-in-out duration-300 font-medium"
                >
                  หน้าหลัก
                </Link>
              </li>
              <li className="cursor-pointer w-full my-2 py-2 rounded-sm transition-all ease-in-out duration-300 group hover:bg-pink-300">
                <Link
                  href="/enroll"
                  className="text-slate-700 group-hover:px-2 transition-all ease-in-out duration-300 font-medium"
                >
                  ลงทะเบียน
                </Link>
              </li>
              {session ? (
                <li className="relative cursor-pointer my-2 py-2 rounded-sm transition-all ease-in-out group duration-300">
                  <button
                    onClick={() => toggleDropDown()}
                    id="dropdownDefaultButton"
                    className="text-slate-700 group-hover:px-2 transition-all ease-in-out duration-300 font-medium focus:outline-none rounded-lg text-center inline-flex items-center"
                    type="button"
                  >
                    {session?.user?.name}
                    <svg
                      className="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <div
                    className={`z-10 ${
                      isDropDownOpen ? "" : "hidden"
                    } bg-white divide-y absolute divide-gray-100 rounded-lg shadow w-32`}
                  >
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <Link
                          href="/post"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          เพิ่มรายการ
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/post/${session?.user?.userId}`}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          รายการของฉัน
                        </Link>
                      </li>
                      {session?.user?.canManageUsers == 1 ? (
                        <li>
                          <Link
                            href="/users"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            จัดการผู้ใช้
                          </Link>
                        </li>
                      ) : null}
                      <li>
                        <a
                          onClick={() => signOut()}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          ออกจากระบบ
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <li className="cursor-pointer my-2 py-2 rounded-sm transition-all ease-in-out duration-300 group hover:bg-pink-300">
                  <Link
                    href="/login"
                    className="text-slate-700 group-hover:px-2 transition-all ease-in-out duration-300 font-medium flex"
                  >
                    ล็อคอิน
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="inline-flex icon icon-tabler icons-tabler-outline icon-tabler-login-2"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                      <path d="M3 12h13l-3 -3" />
                      <path d="M13 15l3 -3" />
                    </svg>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        ) : null}
      </nav>
    </div>
  );
};

export default Navbar;
