"use client";
import { FC, useState, useEffect } from "react";
import { AddEvent, EditEvent } from "@/app/functions/Event";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Event } from "@/app/interface/Event/Event";

const FromPostEdit: FC<Event> = ({ event, eventId }) => {
  const [name, setName] = useState<string>("");
  const [limit, setLimit] = useState<string>("");
  const [isEnabled, setIsEnabled] = useState<Boolean>(event.is_enabled);
  const [isShow, setIsShow] = useState<Boolean>(event.is_show);
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const { data: session } = useSession()

  const user = session?.user?.userId
  const token = session?.user?.accessToken

  useEffect(()=>{
    if(session) {
      if(session.user.userId != event.userId){
        router.push("/")
      }
      setLogin(true)
    }
  },[session])
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  const handleIsEnabledChange = (value) => {
    setIsEnabled(value);
  };

  const handleIsShowChange = (value) => {
    setIsShow(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        userId: user,
        name: name || event.name,
        limit: limit || event.Sections[0].limit,
        is_enabled: isEnabled,
        is_show: isShow,
      };
      const result = await EditEvent(eventData, eventId, token);
      const { type, message } = result;
      toast[type](message);
      router.push(
        `/post/${session?.user?.userId}?refreshId=${new Date().getTime()}`
      );
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  if(login){
    return (
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              ชื่อโพสต์
            </label>
            <input
              type="text"
              onChange={(e) => handleNameChange(e)}
              value={name || event.name}
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
              value={limit || event.Sections[0].limit}
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={event.is_enabled}
                defaultValue={event.is_enabled}
                value={isEnabled == "1" ? "0" : "1"}
                onChange={(e) => handleIsEnabledChange(e.target.value)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                เปิดโพสต์
              </span>
            </label>
            <label className="inline-flex mx-2 items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={event.is_show}
                defaultValue={event.is_show}
                value={isShow == "1" ? "0" : "1"}
                onChange={(e) => handleIsShowChange(e.target.value)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                แสดงโพสต์
              </span>
            </label>
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
  } else {
    return(
      <div>loading...</div>
    )
  }
};

export default FromPostEdit;
