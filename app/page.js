import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" flex justify-between items-center p-8 bg-blue-200 h-screen border">
        <div>
          <h1 className="text-6xl font-bold ml-20 ">
            Prepare smarter and faster with our <br />{" "}
            <span className="text-primary">AI - Powered</span> <br /> Mock
            Interview platform!
          </h1>

          <h2 className="text-2xl flex ml-20 mt-5">
            Ace Every Interview with AI-Powered Precision!
          </h2>
          <Link href="/dashboard">
            <Button className="ml-20 mt-5" size="lg">
              Get Started
            </Button>
          </Link>
        </div>
        <Image
          src="/logo2.png"
          alt="hero"
          width={800}
          height={600}
          className="mr-20"
        />
      </div>
    </>
  );
}
