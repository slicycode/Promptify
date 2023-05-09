import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req: any) => {
  const { userId, prompt, tags } = await req.json();

  try {
    await connectToDatabase();

    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tags,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to create a new prompt.", {
      status: 500,
    });
  }
};
