import React from "react";
import TableUsers from "../components/users/TableUsers";
import Link from "next/link";


export const metadata = {
  title: `จัดการผู้ใช้ ${process.env.NEXT_PUBLIC_META_TITLE}`,
  description: "จัดการผู้ใช้",
  openGraph: {
    title: `จัดการผู้ใช้ ${process.env.NEXT_PUBLIC_META_TITLE}`,
    description: "จัดการผู้ใช้",
  },
};

export default async function UsersManage() {
  
  return (
    <main>
      <div className="container md:p-0 mx-auto drop-shadow-md">
        <div className="relative min-h-screen p-9 border-2">
          <div className="mb-6">
            <h1 className="font-bold text-center text-2xl">
              รายชื่อผู้ใช้ทั้งหมด
            </h1>
            <div className="text-end">
              <Link href="/users/add" className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  เพิ่มผู้ใช้
              </Link>
            </div>
          </div>
          <TableUsers/>
        </div>
      </div>
    </main>
  );
}
