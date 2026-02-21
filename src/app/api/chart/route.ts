import { convertToModelMessages, streamText, UIMessage } from "ai";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const {message}:{message:UIMessage[]}=await req.json()

    const result=streamText({
        model:"google/gemini-3-pro-preview",
        messages:await convertToModelMessages(message)
    })

    return result.toUIMessageStreamResponse()

}