"use client";
import Webcam from "react-webcam";
import { Button } from "./ui/button";

import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AnswerFeedback } from "@/utils/gemini";

function AnswerSection({ questions, activeQuestion }) {
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
  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prev) => prev + result?.transcript);
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
    if (userAnswer?.length < 10) {
      toast("Error, Please speak more than 10 words");
      return;
    }
    console.log(userAnswer);

    const feedbackPromt = `Question: ${questions[activeQuestion]?.question} , User Answer: ${userAnswer},
      Depending on the answer, you can provide feedback to the user and area of improvement for the user in 50-80 words in JSON format with rating field and feedback field
      Just return JSON array without any headers`;

    console.log(feedbackPromt);
    // console.log(userAnswer);

    const feedback = await AnswerFeedback(feedbackPromt);
    const jsonFeedback = JSON.parse(feedback);
    console.log(jsonFeedback);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center my-20 rounded-lg border">
        <Webcam
          mirrored={true}
          style={{ width: "100%", height: "300", zIndex: 10 }}
        />
      </div>
      <Button
        variant="outline"
        className="justify-center"
        onClick={toggleRecording}
      >
        {isRecording ? (
          <>
            <Mic /> Recording...
          </>
        ) : (
          "Record Answer"
        )}
      </Button>
      <Button onClick={submitAnswer} className="my-5">
        Show Answer
      </Button>
    </div>
  );
}

export default AnswerSection;
