import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" flex justify-between items-center p-8 bg-[#8abbe4] h-screen border">
        <div>
          <h1 className="text-6xl font-semibold ml-20 ">
            Prepare smarter and faster with our <br />{" "}
            <span className="text-primary">AI - Powered</span> <br /> Mock
            Interview platform!
          </h1>

          <h2 className="text-3xl flex ml-20 mt-5">
            Ace Every Interview with AI-Powered Precision!
          </h2>
          <Link href="/dashboard">
            <Button className="ml-20 mt-5 rounded-full text-xl" size="lg">
              Get Started
            </Button>
          </Link>
        </div>
        <div>
          <Image
            src="/prep3.png"
            alt="hero"
            width={1000}
            height={800}
            className="mr-20"
          />
        </div>
      </div>
    </>
  );
}
