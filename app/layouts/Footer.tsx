import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-white border-t-1 border-slate-500 w-full bottom-0 shadow mt-4 dark:bg-gray-800">
      <div className="flex w-full mx-auto max-w-screen-xl p-4 items-center justify-center">
        <span className="text-sm text-gray-500  dark:text-gray-400">
          © {new Date().getFullYear()}
          <a href="https://phukhieo.ac.th" className="hover:underline">
            {" "}โรงเรียนภูเขียว || 
          </a>
          {" "}ออกแบบและพัฒนาโดย นายภาคภูมิ ทีดินดำ ม.4/1
        </span>
      </div>
    </footer>
  );
};

export default Footer;
