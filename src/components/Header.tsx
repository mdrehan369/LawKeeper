'use client'

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { getCurrentUser, getUser, logoutUser } from "@/action/citizen.action";
import { UserWithImage } from "@/types/user.types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useStore } from "@/store/store";


type NavElems = {
    text: string,
    href: string
}

function HeaderElements({ elems }: any) {

    const pathname = usePathname()

    return (
        elems.map((elem: any, index: number) => <Link key={index} href={elem.href} className={`hover:after:w-full after:w-0 after:h-[3px] after:absolute after:bottom-0 after:bg-primary relative text-slate-800 hover:text-black after:transition-all after:duration-500 after:left-0 flex flex-col items-start justify-center gap-2 ${pathname == elem.href && "after:w-full"}`}>
            {elem.text}
        </Link>)
    )
}

export function Header() {

    const user = useStore(state => state.user)
    const pathname = usePathname()

    const navElems: any = [
        {
            text: "Home",
            href: "/"
        },
        {
            text: "About",
            href: "/about"
        },
        {
            text: "E-FIR",
            href: "/efir"
        }
    ]

    const handleHamburger = () => {
        const ulElem = document.getElementsByTagName("ul")[0]
        if (ulElem.classList.contains("h-0"))
            ulElem.classList.replace("h-0", "h-22")
        else
            ulElem.classList.replace("h-22", "h-0")
    }

    const handleLogout = async () => {
        try {
            await logoutUser()
        } catch (err) {
            console.log(err)
        } finally {
            window.location.reload()
        }
    }

    return (
        <header className={`w-full h-[--header-height] fixed ${pathname == '/' ? 'backdrop-blur-sm border-0': 'bg-white border-b-[2px]'} top-0 left-0 flex items-center justify-between px-6 border-gray-200 z-10 md:fixed animate-appear-up`}>
            <div className="w-[20%]">
                <Link href="/">
                    <Image
                        src={"https://res.cloudinary.com/dumndb22c/image/upload/v1724307286/hdo8oazfm1y4kmgra0g9.svg"}
                        width={40}
                        height={40}
                        alt="Logo" />
                </Link>
            </div>
            <nav className=" md:w-[60%] w-full">
                <ul className="w-[100vw] md:w-auto flex md:flex-row md:items-center md:static absolute bottom-[-10vh] left-0 md:justify-center md:gap-10 font-amsterdam font-medium flex-col items-center transition-all duration-300 justify-start gap-2 h-0 md:h-full bg-white md:bg-transparent overflow-hidden">
                    <HeaderElements elems={navElems} />
                </ul>
            </nav>
            <div className="w-[20%] hidden md:flex items-center justify-end">

                {
                    user ?
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className=" cursor-pointer hover:border-[1px] border-gray-500 box-border">
                                <Avatar>
                                    <CldImage src={user.profilePhoto?.public_id || "https://res.cloudinary.com/dn7tgdikq/image/upload/v1724999624/LawKeeper/ghb4flnfqwgk3fyd6zv2.png"} width={40} height={40} alt="profile" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <Link href="/profile">
                                    <DropdownMenuItem>
                                        Profile
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        : <Button>
                            <Link href={"/auth/signin"}>
                                Login
                            </Link>
                        </Button>
                }


            </div>
            <HamburgerMenuIcon className="md:hidden size-10 ml-3" onClick={handleHamburger} />
        </header>
    )
}