import Sidebar from "@/components/Sidebar/sidebar";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Law Keeper",
  description: "Generated by create next app",
};


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-[5000px]">
      <div className="w-[80px] lg:w-[20%]">
        <Sidebar />
      </div>
      <div className="w-full p-5 px-2 sm:px-8">
        {children}
      </div>
    </div>
  );
}
