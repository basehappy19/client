"use client";
import React, { FC, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { editUser, fetchUserData, removeUser } from "@/app/functions/User";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

const TableUsers: FC = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [selectCanManageUsers, setSelectCanManageUsers] = useState(null);
  const [login, setLogin] = useState(false);
  const router = useRouter();
  const options = [
    { value: true, label: "อนุญาติ" },
    { value: false, label: "ไม่อนุญาติ" },
  ];
  const { data: session } = useSession();

  const userId = session?.user?.userId;
  const token = session?.user?.accessToken;

  const fetchUser = async (userId, token) => {
    const result = await fetchUserData(userId, token);
    if (result) {
      setUser(result);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser(userId, token);
    }
  }, [token]);

  useEffect(() => {
    if (session) {
      if (!session || session.user.canManageUsers !== true) {
        router.push("/");
      }
      if (user) {
        setLogin(true);
      }
    }
  }, [session]);

  const handleDelete = (id) => {
    Swal.fire({
      title: `ยืนยันจะลบผู้ใช้ id ${id} หรือไม่`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      confirmButtonColor: "#53ed7c",
      cancelButtonText: "ยังก่อน",
      cancelButtonColor: `#f05164`,
    }).then((result) => {
      try {
        const resultFromServer = removeUser(userId,token,id);
        const { type, message } = resultFromServer;
        toast[type](message);
        router.push(`/users?refreshId=${new Date().getTime()}`);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleUserNameChange = async (e, index) => {
    const newUsernameList = [...user];
    newUsernameList[index].username = e.target.value;
    setUsername(newUsernameList);
  };

  const handleSubmitUserName = async (id) => {
    const userToUpdate = user.find((u) => u.id === id);
    try {
      const result = await editUser(token,id,{ userId: userId, username: userToUpdate.username });
      const { type, message } = result;
      toast[type](message);
      router.push(`/users?refreshId=${new Date().getTime()}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = async (e, index) => {
    const newNameList = [...user];
    newNameList[index].name = e.target.value;
    setName(newNameList);
  };

  const handleSubmitName = async (id) => {
    const userToUpdate = user.find((u) => u.id === id);
    try {
      const result = await editUser(token,id,{userId : userId, name: userToUpdate.name });
      const { type, message } = result;
      toast[type](message);
      router.push(`/users?refreshId=${new Date().getTime()}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectCanManageUsersChange = async (e, index) => {
    const newCanManageUsersList = [...user];
    newCanManageUsersList[index].canManageUsers = e.target.value;
    setSelectCanManageUsers(newCanManageUsersList);
  };

  const handleSubmitSelectCanManageUsers = async (id: number) => {
    try {
      const result = await editUser(token,id, {
        userId: userId,
        canManageUsers: selectCanManageUsers,
      });
      const { type, message } = result;
      toast[type](message);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  if (login == true) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <th scope="col" className="px-6 py-3">
              ชื่อผู้ใช้
            </th>
            <th scope="col" className="px-6 py-3">
              ชื่อ
            </th>
            <th scope="col" className="px-6 py-3">
              สามารถจัดการผู้ใช้ได้
            </th>
            <th scope="col" className="px-6 py-3">
              จัดการ
            </th>
          </thead>
          <tbody>
            {user.length > 0 ? (
              user.map((u, index) => (
                <tr key={u.id} className="bg-white border-b">
                  <td className="px-6 py-4">
                    <div className="flex flex-warp items-center gap-3">
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => handleUserNameChange(e, index)}
                        value={u.username}
                      />
                      <div>
                        <button
                          type="button"
                          onClick={(e) => handleSubmitUserName(u.id)}
                        >
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
                            className="inline-flex icon icon-tabler icons-tabler-outline icon-tabler-check"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-warp items-center gap-3">
                      <input
                        type="text"
                        value={u.name}
                        onChange={(e) => handleNameChange(e, index)}
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                      <div>
                        <button
                          type="button"
                          onClick={(e) => handleSubmitName(u.id)}
                        >
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
                            className="inline-flex icon icon-tabler icons-tabler-outline icon-tabler-check"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-warp items-center gap-3">
                      <select
                        onChange={(e) =>
                          handleSelectCanManageUsersChange(e, index)
                        }
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        defaultValue={u.canManageUsers == 1 ? "1" : "0"}
                      >
                        {options.map((option, index) => (
                          <option
                            key={index}
                            value={option.value == 1 ? "1" : "0"}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div>
                        <button
                          type="button"
                          onClick={(e) =>
                            handleSubmitSelectCanManageUsers(u.id)
                          }
                        >
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
                            className="inline-flex icon icon-tabler icons-tabler-outline icon-tabler-check"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <button
                        type="submit"
                        onClick={() => handleDelete(u.id)}
                        className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default TableUsers;
