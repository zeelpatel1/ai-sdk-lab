import { generateObject, streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";

export async function POST(req:NextRequest){
    try {
        const {text}=await req.json()

        const result = await generateObject({
            model: google("gemini-2.5-flash"),
            output:"enum",
            enum:["positive","neutral","negative"],
            prompt:`Classify the sentiment in this text: ${text}`
        });
        const response=result.toJsonResponse()
        console.log(response)
        return response
    }
    catch(error){
        console.error("Error generating sentiment", error);
        return NextResponse.json(
            { error: "Failed to generate sentiment" },
            { status: 500 }
        );
    }
}