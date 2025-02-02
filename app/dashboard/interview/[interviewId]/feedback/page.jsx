"use client";

import { db } from "@/utils/db";
import { UserAnswers } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Feedback({ params }) {
  const [feedbackData, setFeedbackData] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    setId(params.interviewId);
    getFeedback(id);
  }, [id]);
  async function getFeedback(id) {
    console.log(id);
    const response = await db
      .select()
      .from(UserAnswers)
      .where(eq(UserAnswers.mockIdRef, id))
      .orderBy(UserAnswers.id);
    console.log(response);
    setFeedbackData(response);
  }

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl text-green-500">Congratulations!</h2>
      <p className="text-xl font-bold">
        You have successfully completed the interview
      </p>
      <p className="text-xl my-3">Here is your interview Feedback</p>
      {/* <h2 className="text-primary text-lg my-3">
        Your Overall Score: <strong>7/10</strong>
      </h2> */}
      <h2>
        Find below the feedback for each question along with their ideal answers
        containing important pointers (click to expand)
      </h2>
      <div>
        {feedbackData.map((item, index) => (
          <Collapsible key={index}>
            <CollapsibleTrigger className="p-2 flex justify-between rounded-lg gap-7 bg-secondary text-left my-2">
              {item.question} <ChevronsUpDown />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2">
                <h2
                  className={`${item.rating < 3 && "text-red-500"} ${
                    item.rating >= 3 && item.rating < 5 && "text-yellow-500"
                  } ${
                    item.rating === 5 && "text-green-500"
                  } p-2 border rounded-lg`}
                >
                  <strong>Rating: </strong>
                  {item.rating}
                </h2>
              </div>
              <div className="flex flex-col gap-2 p-2 border bg-yellow-50 text text-yellow-800 rounded-lg mt-2">
                <h2>
                  <strong>Your Answer: </strong>
                </h2>
                <p>{item.userAnswer}</p>
              </div>
              <div className="flex flex-col gap-2 p-2 border bg-green-100 rounded-lg text-green-800 mt-2">
                <h2>
                  <strong>Ideal Answer: </strong>
                </h2>
                <p>{item.correctAnswer}</p>
              </div>
              <div className="flex flex-col gap-2 p-2 border bg-blue-100 text-blue-800 rounded-lg mt-2">
                <h2>
                  <strong>Feedback: </strong>
                </h2>
                <p>{item.feedback}</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      <Link href="/dashboard" className="mt-5">
        <Button className="mt-5">Go to Dashboard</Button>
      </Link>
    </div>
  );
}

export default Feedback;
