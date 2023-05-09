import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req: any, { params }: any) => {
  try {
    await connectToDatabase();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found.", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch this prompt.", {
      status: 500,
    });
  }
};

export const PATCH = async (req: any, { params }: any) => {
  const { prompt, tags } = await req.json();

  try {
    await connectToDatabase();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tags = tags;

    await existingPrompt.save();

    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
};

export const DELETE = async (req: any, { params }: any) => {
  try {
    await connectToDatabase();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
