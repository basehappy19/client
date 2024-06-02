import { eventById as fetchEventById } from "@/app/functions/Event";
import { Event } from "@/app/interface/Event/Event";
import AttendantForm from "@/app/components/Attendant/AttendantForm";

async function getEventOnlyOne(eventId: string): Promise<Event> {
  const response = await fetchEventById(eventId);
  return response;
}

export async function generateMetadata({
  params,
}: {
  params: { eventId: string };
}) {
  const { eventId } = params;
  const event: Event = await getEventOnlyOne(eventId);

  return {
    title: event.name + " " + process.env.NEXT_PUBLIC_META_TITLE,
    description: "ลงทะเบียน" + event.name,
    openGraph: {
      title: event.name + " " + process.env.NEXT_PUBLIC_META_TITLE,
      description: "ลงทะเบียน" + event.name,
    },
  };
}

async function Event({ params }: { params: { eventId: string } }) {
  const { eventId } = params;
  const event: Event = await getEventOnlyOne(eventId);

  return (
    <main>
      <div className="container md:p-0 mx-auto drop-shadow-md">
        <section className="min-h-screen p-9 border-2">
          <div>
            <h1 className="font-bold text-2xl">{event.name}</h1>
          </div>
          <hr />
          {event.Sections.map((s) => (
            <div key={s.id} className="mt-4">
              <p className="font-bold text-xl">จำนวนรับได้ : {s.limit}</p>
              <p className="font-bold text-xl">
                จำนวนคนปัจจุบัน : {s.attendantCount}
              </p>
              <p className="font-bold text-xl">
                สถานะ :{" "}
                <span
                  className={`${
                    event.is_enabled === true ? "text-blue-500" : "text-red-500"
                  }`}
                >
                  {event.is_enabled === true ? "เปิดรับ" : "ปิดรับแล้ว"}
                </span>
              </p>
            </div>
          ))}
          <AttendantForm eventId={eventId} />
          <hr />
          <div className="mt-3">
            <h1 className="font-bold text-2xl">
              รายชื่อผู้เข้าร่วม ({event.Sections.map((s) => s.attendantCount)})
            </h1>
            <ul>
              {event.Sections.map((section, index) => (
                <li key={section.id}>
                  {section.Attendants.map((attendant) => (
                    <div
                      className="flex flex-wrap gap-1 items-center font-medium"
                      key={attendant.id}
                    >
                      {index + 1}.
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
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
                      {attendant.User.name}
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Event;
