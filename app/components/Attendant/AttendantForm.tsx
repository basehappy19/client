"use client";
import { FC, useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { AttendantFormProps } from "@/app/interface/Props/AttendantFromProps";
import { Attendant } from "@/app/functions/Attendant";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchUserData } from "@/app/functions/User";

const AttendantForm: FC<AttendantFormProps> = ({ eventId }) => {
  const [user, setUser] = useState({});
  const [selectedUser, setSelectedUser] = useState<string>("");
  const router = useRouter();

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

  const onSelectionChange = (id: string) => {
    setSelectedUser(id);
  };

  const onInputChange = (value: string) => {
    setSelectedUser(value);
  };

  const handleSubmit = async () => {
    if (!selectedUser) {
      toast.error("กรุณาระบุชื่อผู้เข้าร่วม");
      return;
    }
    try {
      const result = await Attendant(eventId, selectedUser);
      const { type, message } = result;
      toast[type](message);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user.length > 0 ? (
        <div className="my-3">
          <Autocomplete
            isRequired
            label="ชื่อ"
            defaultItems={user}
            allowsCustomValue
            selectedKey={selectedUser}
            onSelectionChange={setSelectedUser}
            placeholder="ค้นหาชื่อของคุณ"
            className="w-full"
          >
            {user.map((user) => (
              <AutocompleteItem value={user.id} key={user.id}>
                {user.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <div className="my-3">
            <button
              onClick={handleSubmit}
              className={`${
                selectedUser ? "" : "opacity-50"
              } w-full bg-pink-500 py-2 rounded-2xl text-white transition-all hover:bg-pink-600`}
              disabled={!selectedUser}
            >
              {selectedUser ? "เข้าร่วม" : "กรุณาเลือกชื่อของคุณ"}
            </button>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default AttendantForm;
