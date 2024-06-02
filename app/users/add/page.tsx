import AddUser from "@/app/components/users/AddUser";
export const metadata = {
  title: `เพิ่มผู้ใข้ ${process.env.NEXT_PUBLIC_META_TITLE}`,
  description: "เพิ่มผู้ใข้",
  openGraph: {
    title: `เพิ่มผู้ใข้ ${process.env.NEXT_PUBLIC_META_TITLE}`,
    description: "เพิ่มผู้ใข้",
  },
};

export default function page() {
  
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 ">
          เพิ่มผู้ใช้
        </h2>
        <AddUser />
      </div>
    </section>
  );
};
