"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import InterviewItem from "./InterviewItem";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && getInterViewList();
  }, [user]);

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  console.log(userEmail);

  async function getInterViewList() {
    const response = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, userEmail))
      .orderBy(desc(MockInterview.id));
    console.log(response);
    setInterviewList(response);
  }

  return (
    <div>
      <h2 className="text-2xl font-medium">Previous Interview Lists:</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
        {interviewList &&
          interviewList.map((interview) => (
            <InterviewItem key={interview.mockId} interview={interview} />
          ))}
      </div>
    </div>
  );
}

export default InterviewList;
