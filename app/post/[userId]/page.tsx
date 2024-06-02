import { eventByUser } from "@/app/functions/Event";
import { Event } from "@/app/interface/Event/Event";
import { EventByUserCard } from "@/app/components/Event/EventByUserCard";
import PageCSR from "./pageCSR"
export async function generateMetadata() {
  return {
    title: `รายการทั้งหมดของคุณ ${process.env.NEXT_PUBLIC_META_TITLE}`,
    description: `รายการทั้งหมดของคุณ ${process.env.NEXT_PUBLIC_META_TITLE}`,
    openGraph: {
      title: `รายการทั้งหมดของคุณ ${process.env.NEXT_PUBLIC_META_TITLE}`,
      description: `รายการทั้งหมดของคุณ ${process.env.NEXT_PUBLIC_META_TITLE}`,
    },
  };
}

async function page({ params }: { params: { userId: string } }) {
  const { userId } = params;

  return (
    <PageCSR userId={userId} />
  );
}

export default page;
