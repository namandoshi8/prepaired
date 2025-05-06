"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/db";
import { GenerateQuestions } from "@/utils/gemini";
import { uuid } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { MockInterview } from "@/utils/schema";
import { redirect } from "next/navigation";

function AddNewInterview() {
  const [isOpen, setIsOpen] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  // const [jsonMockResponse, setJsonMockResponse] = useState([]);
  const { user } = useUser();

  async function insertData() {}
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDescription, jobExperience);
    const response = await GenerateQuestions({
      jobPosition,
      jobDescription,
      jobExperience,
    });
    console.log(response);
    // setJsonMockResponse(response);

    if (response) {
      console.log("inserting data");
      // console.log(jsonMockResponse);
      // insertData();
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jobPosition: jobPosition,
          jobDescription: jobDescription,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
          jsonMockResponse: response,
        })
        .returning({ mockId: MockInterview.mockId });

      if (resp) {
        console.log(resp[0].mockId);
        setIsOpen(false);
        redirect(`/dashboard/interview/${resp[0].mockId}`);
      }
    }
    setLoading(false);
  }
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary 
      hpver:scale-105 hover:shadow-md cursor-pointer transition-all "
        onClick={() => setIsOpen(true)}
      >
        {/* {console.log(user?.primaryEmailAddress?.emailAddress)} */}
        <h2 className="text-lg text-center font-bold">+ Add New</h2>
      </div>
      <Dialog open={isOpen}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell Us More About Your Interview
            </DialogTitle>
            <DialogDescription>
              Add Details about your Job Position, Job Descrition and Years of
              experience you have!
              <form className="mt-3" onSubmit={handleSubmit}>
                <label className="mt-3 font-bold">Job Role/Position</label>
                <Input
                  placeholder="Full Stack Developer/ Grapic Designer"
                  className="mt-2 mb-3"
                  required
                  onChange={(e) => setJobPosition(e.target.value)}
                />
                <label className="mt-3 font-bold">Job Description</label>
                <Textarea
                  placeholder="Job Description"
                  className="mt-2 mb-3"
                  required
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <label className="mt-3 font-bold">Years of Experience</label>
                <Input
                  placeholder="2 (only Numbers)"
                  type="number"
                  className="mt-2 mb-3"
                  required
                  onChange={(e) => setJobExperience(e.target.value)}
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {loading ? "Please Wait..." : "Save and Submit"}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
