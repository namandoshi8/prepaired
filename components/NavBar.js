"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

function NavBar() {
  const { user } = useUser();
  const path = usePathname();
  return (
    <>
      <nav
        className={`w-full  px-5 lg:px-8 xl:px-[5%] py-4 flex items-center justify-between fixed top-0 `}
      >
        <Link className="flex items-center " href="/">
          <Image
            src="/prep2.png"
            alt="logo"
            width={150}
            height={100}
            className="w-28 cursor-pointer"
          />
        </Link>
        <ul className="hidden text-xl font-Ovo md:flex items-center gap-5 lg:gap-8 rounded-full px-12 py-3 shadow-md bg-white bg-opacity-50">
          <li>
            <Link className="font-Ovo" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="font-Ovo" href="/dashboard">
              Dashboard
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-5">
          {/* <button>
            <Image src={assets.moon_icon} alt="moon-icon" className="w-6 " />
          </button> */}
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4"
          >
            {user ? <UserButton /> : <Link href="/sign-in">Sign In</Link>}
          </a>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
