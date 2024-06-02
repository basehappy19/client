import FromPostEdit from "@/app/components/Post/FromPostEdit";
import { eventById as fetchEventById } from "@/app/functions/Event";
import { Event } from "@/app/interface/Event/Event";

async function getEventOnlyOne(eventId: string): Promise<Event> {
    const response = await fetchEventById(eventId);
    return response;
  }

export const metadata = {
  title: `เพิ่มโพสต์ ${process.env.NEXT_PUBLIC_META_TITLE}`,
  description: "เพิ่มโพสต์",
  openGraph: {
    title: `เพิ่มโพสต์ ${process.env.NEXT_PUBLIC_META_TITLE}`,
    description: "เพิ่มโพสต์",
  },
};

export default async function page({ params }: { params: { eventId: string } }) {
    const { eventId } = params;
    const event: Event = await getEventOnlyOne(eventId);

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 ">
          แก้ไขโพสต์
        </h2>
        <FromPostEdit event={event} eventId={eventId} />
      </div>
    </section>
  );
};
