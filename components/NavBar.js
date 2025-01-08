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
    <div className="flex justify-between items-center bg-blue-100 shadow-md">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={300}
          height={200}
          className="ml-10 mt-0"
          priority
        />
      </Link>
      <ul className="flex ml-0 gap-6">
        <li
          className={`hover:font-bold hover:text-primary transition cursor-pointer ${
            path === "/" ? "font-bold text-primary" : ""
          }`}
        >
          <Link href="/">Home</Link>
        </li>
        <li
          className={`hover:font-bold hover:text-primary transition cursor-pointer ${
            path === "/dashboard" ? "font-bold text-primary" : ""
          }`}
        >
          <Link href="/dashboard">Dashboard</Link>
        </li>
        {/* <li
          className={`hover:font-bold hover:text-primary transition cursor-pointer ${
            path === "/how-it-works" ? "font-bold text-primary" : ""
          }`}
        >
          How it works?
        </li> */}
        <li
          className={`hover:font-bold hover:text-primary transition cursor-pointer ${
            path === "/pricing" ? "font-bold text-primary" : ""
          }`}
        >
          <Link href="/pricing">Pricing</Link>
        </li>
      </ul>
      <div className="flex items-center mr-10">
        {user ? (
          <UserButton />
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
