"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";

function InterviewPage({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const id = params.interviewId;
    getInterview(id);
  }, []);
  async function getInterview(id) {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, id));
    console.log(JSON.parse(result[0].jsonMockResponse));
    const x = JSON.parse(result[0].jsonMockResponse);
    setQuestions(x);
    setInterviewData(result[0]);
    // setQuestions(result[0].jsonMockResponse);
    // setInterviewData();
    // console.log(interviewData);
  }
  return <div className="grid grid-cols-1 md:grid-cols-2"></div>;
}

export default InterviewPage;
