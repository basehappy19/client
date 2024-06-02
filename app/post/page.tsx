import FromPost from "../components/Post/FromPost";

export const metadata = {
  title: `เพิ่มรายการ ${process.env.NEXT_PUBLIC_META_TITLE}`,
  description: "เพิ่มรายการ",
  openGraph: {
    title: `เพิ่มรายการ ${process.env.NEXT_PUBLIC_META_TITLE}`,
    description: "เพิ่มรายการ",
  },
};

export default function page(request) {
  
  
  return (
    <section className="py-8 bg-white flex justify-center h-screen items-center">
      <div className="w-full max-w-xl px-4">
        <h2 className="mb-4 text-xl font-bold text-gray-900 ">
          เพิ่มรายการ
        </h2>
        <FromPost />
      </div>
    </section>
  );
};

