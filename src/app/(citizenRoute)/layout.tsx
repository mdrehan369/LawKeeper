"use client";

import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/action/citizen.action";
import { useStore } from "@/store/store";
import Loading from "@/components/loader";

type Children = {
  children: React.ReactNode;
};

export default function CitizenLayout({ children }: Children) {
  // const router = useRouter()
  const user = useStore((state) => state.user);
  const login = useStore((state) => state.login);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => {
      if (user) return;
      try {
        const response = await getCurrentUser();
        if (response) login(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    })();
  }, []);

  return !loader ? (
    <>
      <Header />
      {children}
      <Toaster />
    </>
  ) : (
    <Loading className=" w-full h-[100vh] flex items-center justify-center" />
  );
}
