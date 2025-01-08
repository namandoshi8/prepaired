"use client";
import Webcam from "react-webcam";
import { Button } from "./ui/button";

import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AnswerFeedback } from "@/utils/gemini";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { UserAnswers } from "@/utils/schema";
import moment from "moment";

function AnswerSection({ questions, activeQuestion, interiewId }) {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  useEffect(() => {
    results.map((result) => {
      setUserAnswer(result?.transcript);
    });
  }, [results]);

  function toggleRecording() {
    if (isRecording) {
      stopSpeechToText();
      //   if (userAnswer?.length < 10) {
      //     toast("Error, Please speak more than 10 words");
      //     return;
      //   }
    } else {
      startSpeechToText();
    }
  }

  async function submitAnswer() {
    console.log(userAnswer);

    const feedbackPromt = `Question: ${
      questions[activeQuestion]?.question
    } , User Answer: ${userAnswer ? userAnswer : "No Answer Provided"} ,
      Depending on the answer, you can provide feedback to the user and area of improvement for the user in 50-80 words in JSON format with rating field and feedback field
      Just return JSON array without any headers`;

    console.log(feedbackPromt);
    // console.log(userAnswer);
    // console.log(results);
    // console.log(userAnswer);
    // setUserAnswer("");

    const feedback = await AnswerFeedback(feedbackPromt);
    const jsonFeedback = JSON.parse(feedback);
    console.log(jsonFeedback);
    const resp = await db.insert(UserAnswers).values({
      mockIdRef: interiewId,
      question: questions[activeQuestion]?.question,
      userAnswer: userAnswer,
      rating: jsonFeedback[0].rating,
      feedback: jsonFeedback[0].feedback,
      correctAnswer: questions[activeQuestion]?.answer,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });
    if (resp) {
      toast("Answer Recorded Successfully");
      console.log(userAnswer);

      setUserAnswer("");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center mt-10 rounded-lg border">
        <Webcam
          mirrored={true}
          style={{ width: 500, height: "100%", zIndex: 10 }}
        />
      </div>
      <div className="grid grid-cols-2 justify-center items-center mt-5 gap-3">
        <Button
          variant="outline"
          className="justify-center"
          onClick={toggleRecording}
        >
          {isRecording ? (
            <>
              <Mic />
              Recording... (Stop Recording)
            </>
          ) : (
            "Record Answer"
          )}
        </Button>
        <Button onClick={submitAnswer}>Save Answer</Button>
      </div>
      <div className="border rounded-lg p-5 bg-red-200 mt-5">
        <h2 className="flex text-red-500 items-center gap-2">
          {/* <Lightbulb /> */}
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm my-2 text-red-600">
          Press the record button to start recording your answer. Once you are
          done, click the save button to submit your answer. If not done the
          answer will <strong>not</strong> be saved.
        </h2>
        <h2 className="text-sm my-2 text-red-600">
          Do not refresh the page or navigate away from the page while
          recording.
        </h2>

        <h2 className="text-sm my-2 text-red-600">
          Do not rapidly press next as it may end the interview.
        </h2>
      </div>
    </div>
  );
}

export default AnswerSection;
