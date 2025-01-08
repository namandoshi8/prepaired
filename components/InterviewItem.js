import { Button } from "@/components/ui/button";
import Link from "next/link";

function InterviewItem({ interview }) {
  return (
    <div className="p-5 border rounded-lg shadow-sm">
      <h2 className="text-primary font-bold text-xl">
        {interview.jobPosition} - {interview.jobExperience} Years
      </h2>
      <h2 className="text-gray-500">
        <strong>Description: </strong>
        {interview.jobDescription}
      </h2>
      <h2 className="text-gray-400">
        <strong>Created At: </strong>
        {interview.createdAt}
      </h2>
      <div className="flex justify-between gap-3 mt-2">
        <Button variant="outline" size="sm" className="w-full">
          <Link href={`/dashboard/interview/${interview.mockId}/feedback`}>
            Feedback
          </Link>
        </Button>
        <Button size="sm" className="w-full">
          <Link href={`/dashboard/interview/${interview.mockId}/start`}>
            Start Again
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default InterviewItem;
