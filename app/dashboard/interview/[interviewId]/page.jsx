//169f4ef8-abcd-459e-9c84-c3cb4a16aaa5
// db
//       .select(MockInterview)
//       .where({ mockId: params.interviewId })
//       .get();
"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    const id = params.interviewId;
    getInterview(id);
  }, []);
  async function getInterview(id) {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, id));
    console.log(result);
    setInterviewData(result[0]);
    // console.log(interviewData);
  }

  return (
    <div className="flex flex-col items-center my-10 justify-center ">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mt-7 flex flex-col gap-5 ">
          <div className="flex flex-col gap-5 p-5 rounded-lg border">
            <h2 className=" text-lg">
              <strong>Job Role/Position: </strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className=" text-lg">
              <strong>Job Description: </strong>
              {interviewData?.jobDescription}
            </h2>
            <h2 className=" text-lg">
              <strong>Job Experience: </strong>
              {interviewData?.jobExperience} years
            </h2>
          </div>
          <div className="flex flex-col gap-5 p-5 rounded-lg border bg-yellow-100">
            <h2 className="flex items-center gap-2">
              <Lightbulb className="h-8 w-5" />
              <strong>Instructions:</strong>
            </h2>
            <ul>
              <li>
                1. Allow Camera & Mic Access: Enable permissions when prompted
                to record your responses.
              </li>
              <li>2. 5 Questions: Answer each question professionally.</li>
              <li>
                3. Get Your Report: Receive feedback after completing all
                questions.
              </li>
              <li>
                4. Tips: Use a quiet, well-lit space, and avoid distractions.
              </li>
              <li>Click Start to begin your mock interview! 🚀</li>
              <li>
                <strong>NOTE:</strong> We do not store any video recordings. As
                soon as you complete the interview, the video will be deleted.
              </li>
            </ul>
          </div>
        </div>
        <div>
          {isEnabled ? (
            <Webcam
              onUserMedia={() => setIsEnabled(true)}
              onUserMediaError={() => setIsEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button onClick={() => setIsEnabled(true)} className="w-full">
                Enable Camera and Mic
              </Button>
            </>
          )}
        </div>
      </div>
      <Link href={`/dashboard/interview/${params.interviewId}/start`}>
        <Button className="mt-5">
          {isEnabled ? "Start Interview" : "Enable Camera and Mic"}
        </Button>
      </Link>
    </div>
  );
}

export default Interview;
