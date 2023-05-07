import { NextApiRequest, NextApiResponse } from "next";
import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream"


if (!process.env.OPENAI_KEY) {
  throw new Error("Missing env var from OpenAI")
}



const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const { prompt } = (await req.body) as {
    prompt: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 })
  }

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Generate a sentence of gratitude for ${prompt}. Their pronouns are he/his. 
    In a similar format to, I am grateful for ${prompt} because...`,
    temperature: 0,
    max_tokens: 100,
  });

  res.status(200).json(response.data)
}