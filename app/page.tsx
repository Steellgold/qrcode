import { Customizer } from "@/components/customizer";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="flex items-center justify-center p-3 sm:mt-[10vh]">
        <Customizer />
      </div>
    
      <div className="flex items-center justify-center p-3">
        <p className="text-center text-sm text-gray-500">
          This is a <Link className="text-blue-300 hover:underline" href="https://github.com/Steellgold/qrcode">open-source</Link> project. <br />Feel free to contribute! 🚀
        </p>
      </div>
    </>
  );
}

export default Page;