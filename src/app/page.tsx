"use client";

import { useChat, useCompletion } from "@ai-sdk/react";
import React, { useState } from "react";

export default function Page() {
  // const {
  //   input,
  //   handleInputChange,
  //   handleSubmit,
  //   completion,
  //   isLoading,
  //   error,
  //   setInput,
  //   stop,
  // } = useCompletion({
  //   api: "/api/chat",
  // });

  const [input,setInput]=useState("")
  const {messages,sendMessage,status,error,stop}=useChat()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage({text:input})
    setInput("")
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto py-24">
      
      {messages.map((message)=>(
        <div key={message.id} className="mb-4">
          <div className="font-semibold">
            {message.role === "user" ? "You:" : "AI:"}
          </div>
          {
            message.parts.map((part,i)=>{
              switch(part.type){
                case "text":
                  return <div key={`${message.id}-${i}`} className="whitespace-pre-wrap">
                    {part.text}
                  </div>
                default:
                  return null
              }
            })
          }
        </div>
      ))}

      {/* Error */}
      {error && (
        <div className="text-red-500 mb-4">
          {error.message}
        </div>
      )}

      {/* Loading State */}
      {/* {isLoading && !completion && (
        <div className="mb-4">Loading...</div>
      )} */}

      {/* AI Completion Output */}
      {/* {completion && (
        <div className="whitespace-pre-wrap mb-6 p-4 rounded">
          {completion}
        </div>
      )} */}

      {
        (status === "submitted" || status ==="streaming") && (
          <div className="mb-4">
            <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
            </div>
          </div>
        )
      }

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 fixed bottom-8 w-full max-w-md">
        
        <input
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          placeholder="Say something..."
          className="flex-1 p-2 border rounded"
        />

        {
          status === "submitted" || status==="streaming" ? (
            <button onClick={stop} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Stop</button>
          ) : (
            <button
          disabled={status !== "ready"}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
          )
        }
      </form>
    </div>
  );
}