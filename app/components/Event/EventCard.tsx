import { FC } from "react";
import { EventCardProps } from "@/app/interface/Props/Event";
import Link from "next/link";
export const EventCard: FC<EventCardProps> = ({ event }) => {
  
  return (
    <div className="relative border-2 border-gray-300 p-5 rounded-lg drop-shadow-sm">
      <div className="mb-6">
        <h1 className="text-3xl font-medium text-black">{event.name}</h1>
      </div>
      <div className="flex flex-wrap gap-2">
        <div>
          <div className="flex gap-1 text-black">
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-user"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>
            <p>{event.User.name}</p>
          </div>
        </div>
        <div className="flex gap-1 text-black">
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-clock"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10.5 21h-4.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" />
            <path d="M16 3v4" />
            <path d="M8 3v4" />
            <path d="M4 11h10" />
            <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M18 16.5v1.5l.5 .5" />
          </svg>
          {new Date(new Date(event.createdAt).getTime()).toLocaleDateString(
            "th-TH",
            {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }
          )}
        </div>
      </div>
      {event.Sections.map((s, index) => (
        <div
          key={index}
          className={`p-2 absolute right-1.5 top-1.5 ${
            event.is_enabled === true ? s.attendantCount < s.limit ? "bg-pink-500 " : "bg-red-500" : "bg-red-500"
          } rounded-lg text-white font-medium`}
        >
          <p>
            {event.is_enabled === true ? s.attendantCount < s.limit
              ? `${s.attendantCount || 0}/${s.limit} คน`
              : "เต็มแล้ว"
            : "ปิดรับ"
            }
          </p>
        </div>
      ))}
      <div className="absolute right-3 bottom-3.5">
        <Link href={`/event/detail/${event.id}`}>
          {event.Sections.map((s, index) => (
            <button
              key={index}
              className={`p-2 text-white rounded-lg drop-shadow-lg ${
                event.is_enabled === true
                  ? s.attendantCount < s.limit
                    ? "bg-pink-500"
                    : "bg-blue-500"
                  : "bg-blue-500"
              }`}
            >
              {event.is_enabled === true ? (
                s.attendantCount < s.limit ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                    <path d="M16 19h6" />
                    <path d="M19 16v6" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-info-circle"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                    <path d="M12 9h.01" />
                    <path d="M11 12h1v4h1" />
                  </svg>
                )
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-info-circle"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                  <path d="M12 9h.01" />
                  <path d="M11 12h1v4h1" />
                </svg>
              )}
            </button>
          ))}
        </Link>
      </div>
    </div>
  );
};
