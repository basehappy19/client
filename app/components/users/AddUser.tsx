"use client";
import { FC, useState, useEffect } from "react";
import { AddUser as AddUserToBackend } from "@/app/functions/User";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const AddUser: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [conPassword, setConPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const { data: session } = useSession();

  const userId = session?.user?.userId
  const token = session?.user?.accessToken

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConPasswordChange = (e) => {
    setConPassword(e.target.value);
  };

  useEffect(() => {
    if (password.length < 8) {
      setError("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
    } else if (password !== conPassword) {
      setError("รหัสผ่านกับรหัสยืนยันไม่ตรงกัน");
    } else {
      setError("");
    }
  }, [password, conPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!error) {
      try {
        const userData = {
          userId: userId,
          username: username,
          name: name,
          password: password,
        };

        const result = await AddUserToBackend(userData,token);
        const { type, message } = result;
        toast[type](message);
        if (type == "error") {
          return;
        }
        router.push(`/users?refreshId=${new Date().getTime()}`);
        router.refresh();
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
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
            ชื่อผู้ใช้
          </label>
          <input
            type="text"
            onChange={(e) => handleUsernameChange(e)}
            value={username}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="ชื่อผู้ใข้"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            ชื่อ
          </label>
          <input
            type="text"
            onChange={(e) => handleNameChange(e)}
            value={name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="ชื่อจริง"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            รหัสผ่าน
          </label>
          <input
            type="password"
            onChange={(e) => handlePasswordChange(e)}
            value={password}
            className={`bg-gray-50 border transition-all duration-300  ${
              error ? "border-red-600" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            ยืนยันรหัสผ่าน
          </label>
          <input
            type="password"
            onChange={(e) => handleConPasswordChange(e)}
            value={conPassword}
            min="0"
            className={`bg-gray-50 border transition-all duration-300 ${
              error ? "border-red-600" : "border-gray-300"
            }  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
            required
          />
          <div className="mt-5 mb-0 rounded-md font-bold text-red-500">
            {error ? error : null}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-center items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-pink-500 rounded-lg focus:ring-4 focus:ring-pink-200 hover:bg-pink-600"
      >
        เพิ่มผู้ใช้
      </button>
    </form>
  );
};

export default AddUser;
