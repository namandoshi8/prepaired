import Webcam from "react-webcam";
import { Button } from "./ui/button";
import Recorder from "./Recorder";
// import useSpeechToText from "react-hook-speech-to-text";

function AnswerSection() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center my-20 rounded-lg border">
        <Webcam
          mirrored={true}
          style={{ width: "100%", height: "300", zIndex: 10 }}
        />
      </div>
      <Button variant="outline" className="justify-center">
        Record Answer
      </Button>
      {/* <Recorder /> */}
    </div>
  );
}

export default AnswerSection;
