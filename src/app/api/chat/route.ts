import { convertToModelMessages, streamText, UIMessage } from "ai";
import { NextRequest } from "next/server";
import {google} from '@ai-sdk/google'

export async function POST(req:NextRequest){
    try {
        const {messages}:{messages:UIMessage[]}=await req.json()

        // console.log(process.env.GOOGLE_GENERATIVE_AI_API_KEY)

    const result = await streamText({
        model: google("gemini-2.5-flash"),
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error(error);
        return new Response("Something went wrong", { status: 500 });
      }

}