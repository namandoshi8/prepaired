"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";

function NavBar() {
  const path = usePathname();
  return (
    <div className="flex justify-between items-center bg-secondary shadow-md">
      <Image
        src="/logo.png"
        alt="logo"
        width={200}
        height={200}
        className="ml-10 mt-0"
        priority
      />
      <ul className="flex gap-6">
        <li
          className={`hover:font-bold hover:text-primary transition cursor-pointer ${
            path === "/" ? "font-bold text-primary" : ""
          }`}
        >
          Home
        </li>
        <li
          className={`hover:font-bold hover:text-primary transition cursor-pointer ${
            path === "/dashboard" ? "font-bold text-primary" : ""
          }`}
        >
          Dashboard
        </li>
        <li
          className={`hover:font-bold hover:text-primary transition cursor-pointer ${
            path === "/how-it-works" ? "font-bold text-primary" : ""
          }`}
        >
          How it works?
        </li>
        <li
          className={`hover:font-bold hover:text-primary transition cursor-pointer ${
            path === "/pricing" ? "font-bold text-primary" : ""
          }`}
        >
          Pricing
        </li>
      </ul>
      <div className="flex items-center mr-10">
        <UserButton />
      </div>
    </div>
  );
}

export default NavBar;
