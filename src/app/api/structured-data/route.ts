import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { resumeSchema } from "./schema";
import { google } from "@ai-sdk/google";

async function POST(req:NextRequest){

    const body = await req.json();

    const { name, email, phone, summary, skills, experience } = body;

    try {
        const result=await generateObject({
            model:google("gemini-2.5-flash"),
            schema:resumeSchema,
            prompt: `
        Create a professional resume using the following details:

        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Summary: ${summary}
        Skills: ${skills?.join(", ")}

        Experience:
        ${experience
          ?.map(
            (exp: any) =>
              `Company: ${exp.company}
               Role: ${exp.role}
               Duration: ${exp.duration}
               Description: ${exp.description}`
          )
          .join("\n")}
      `,
        })
        return NextResponse.json({resume:result.object})
    } catch (error) {
        console.error(error);
        return new Response("Something went wrong", { status: 500 });
    }
}