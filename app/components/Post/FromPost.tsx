"use client";
import { FC, useState } from "react";
import { AddEvent } from "@/app/functions/Event";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";


const FromPost: FC = () => {
  const [name, setName] = useState<string>("");
  const [limit, setLimit] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken 
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        userId: session?.user?.userId,
        name: name,
        limit: limit,
      };

      const result = await AddEvent(eventData,token);
      const { type, message } = result;
      toast[type](message);
      router.refresh();
      router.push(`/enroll?refreshId=${new Date().getTime()}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            ชื่อการจอง
          </label>
          <input
            type="text"
            onChange={(e) => handleNameChange(e)}
            value={name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="กิจกรรม...."
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            จำนวนคน
          </label>
          <input
            type="number"
            onChange={(e) => handleLimitChange(e)}
            value={limit}
            min="0"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-center items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-pink-500 rounded-lg focus:ring-4 focus:ring-pink-200 hover:bg-pink-600"
      >
        โพสต์
      </button>
    </form>
  );
};

export default FromPost;
