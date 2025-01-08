const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function GenerateQuestions(data) {
  const chatSession = model.startChat({
    generationConfig,
  });
  //   console.log(data);

  const prompt = `Job Position: ${data.jobPosition}, Job Description: ${data.jobDescription}, Years of Experience: ${data.jobExperience}, based on this information provide 5 interview questions and answers in json format.Return question and answers as  JSON array without and headers`;

  const result = await chatSession.sendMessage(prompt);

  console.log(result.response.text());
  const response = result.response
    .text()
    .replace("```json", "")
    .replace("```", "");
  console.log(response);
  return response;
}

export async function AnswerFeedback(prompt) {
  const chatSession = model.startChat({
    generationConfig,
  });
  //   console.log(data);

  const result = await chatSession.sendMessage(prompt);

  console.log(result.response.text());
  const response = result.response
    .text()
    .replace("```json", "")
    .replace("```", "");
  console.log(response);
  // return response;
}

// run();
