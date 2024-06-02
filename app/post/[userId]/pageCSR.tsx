"use client"

import { EventByUserCard } from "@/app/components/Event/EventByUserCard"
import { eventByUser } from "@/app/functions/Event"
import { useSession } from "next-auth/react"
import { FC, useEffect, useState } from "react"

const PageCSR:FC = ({userId}) => {  
  const [event, setEvent] = useState({});
  const { data: session } = useSession();
  const user = session?.user?.userId;
  const token = session?.user?.accessToken;
  
  const fetchEvent = async (user: number, userId: string, token: string) => {
    const result = await eventByUser(user, userId, token);
    if (result) {
      setEvent(result);
    }
  };

  useEffect(() => {
    if(token){
      fetchEvent(user, userId, token);
    }
  },[token]);

  
  return (
    <main>
      <div className="container md:p-0 mx-auto drop-shadow-md">
        <section className="min-h-screen p-9 border-2">
          <div>
            <h1 className="font-bold text-2xl">
              รายการที่คุณสร้าง ({event.length})
            </h1>
          </div>
          <hr />
          <div className="py-10">
            <div className="grid grid-cols-2 gap-5 md:gap-5">
              {event && event.length > 0
                ? event.map((e) => (
                    <div
                      key={e.id}
                      className="col-span-2 md:col-span-1 lg:col-span-1"
                    >
                      <EventByUserCard event={e} />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default PageCSR