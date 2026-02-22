import { streamObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { pokemonSchema } from "./schema";

export async function POST(req:NextRequest){
    try {
        const {type}=await req.json()

        const res=streamObject({
            model:google("gemini-2.5-flash"),
            schema:pokemonSchema,
            output:"array",
            prompt:`Generate list of 5 ${type} type pokemon`
        })

        return res.toTextStreamResponse()

    } catch (error) {
        console.error("Error generating Task", error);
        return NextResponse.json({ error: "Failed to generate task" }, { status: 500 });
    }
}