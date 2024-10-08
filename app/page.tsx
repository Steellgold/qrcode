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

      <div className="flex items-center justify-center p-3">
        <p className="text-xs text-muted-foreground text-center">Note: Default themes have been tested, all are scannable and functional. But we cannot guarantee the operation of custom themes (or default themes), it all depends on the parameters you define, the brightness, contrast and quality (of printing or any other medium) of the image.</p>
      </div>
    </>
  );
}

export default Page;