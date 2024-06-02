import { event as fetchEvent } from "@/app/functions/Event";
import { Event } from "../interface/Event/Event";
import { EventCard } from "../components/Event/EventCard";


async function getEvent(): Promise<Event[]> {
  const response = await fetchEvent();
  return response;
}

export const metadata = {
  title: `รายการทั้งหมด ${process.env.NEXT_PUBLIC_META_TITLE}`,
  description: "ลงทะเบียน โรงเรียนภูเขียว",
  openGraph: {
    title: `รายการจองทั้งหมด ${process.env.NEXT_PUBLIC_META_TITLE}`,
    description: "ลงทะเบียน โรงเรียนภูเขียว",
  },
};

async function Enroll() {
  const event: Event[] = await getEvent();
  return (
    <main className="h-screen flex justify-center">
      <div className="container mx-auto drop-shadow-md">
        <section className="p-9 border-2">
          <div>
            <h1 className="font-bold text-2xl">
              รายการทั้งหมด ({event.filter(e => e.is_show !== false).length})
            </h1>
          </div>
          <hr />
          <div className="py-10">
          <div className="grid grid-cols-2 gap-5 md:gap-5">
            {event.filter(e => e.is_show !== false)
            .map((e) => (
              <div key={e.id} className="col-span-2 md:col-span-1 lg:col-span-1">
                <EventCard event={e} />
              </div>
            ))}
          </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Enroll;
