"use client";

import AnswerSection from "@/components/AnswerSection";
import Questions from "@/components/Questions";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { useEffect, useState } from "react";

function InterviewPage({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [interiewId, setInteriewId] = useState();
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
    setInteriewId(id);

    // setQuestions(result[0].jsonMockResponse);
    // setInterviewData();
    // console.log(interviewData);
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Questions questions={questions} activeQuestion={activeQuestion} />
        <AnswerSection
          questions={questions}
          activeQuestion={activeQuestion}
          interiewId={interiewId}
        />
      </div>
      <div className="flex justify-end gap-5 mt-10">
        {activeQuestion > 0 && (
          <Button onClick={() => setActiveQuestion(activeQuestion - 1)}>
            Previous
          </Button>
        )}
        {activeQuestion < questions.length - 1 && (
          <Button onClick={() => setActiveQuestion(activeQuestion + 1)}>
            Next
          </Button>
        )}
        {activeQuestion === questions.length - 1 && (
          <Link href={`/dashboard/interview/${interiewId}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default InterviewPage;
