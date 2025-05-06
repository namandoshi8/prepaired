// import { UserButton } from "@clerk/nextjs";

import InterviewList from "@/components/InterviewList";
import AddNewInterview from "./AddNewInterview";

function DashboardPage() {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl text-primary">Dashboard </h2>
      <h2 className="text-gray-500">
        Create and Start your AI Mockup Interview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>
      <InterviewList />
    </div>
  );
}

export default DashboardPage;
