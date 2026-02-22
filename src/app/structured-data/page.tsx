"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import React, { useState } from "react";
import { pokemonSchema, pokemonUISchema } from "../api/structured-data/schema";

export default function Page() {
  
  const [type,setType]=useState("")
  const {object,submit,isLoading,error,stop}=useObject({
    api:"/api/structured-data",
    schema:pokemonUISchema
  })

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
    submit({type})
    setType("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-white to-zinc-200 dark:from-zinc-900 dark:via-zinc-950 dark:to-black flex flex-col items-center px-4">
  
      {/* Header */}
      <div className="pt-16 pb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Pokémon Finder
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Enter a Pokémon type to generate results
        </p>
      </div>
  
      {/* Results */}
      <div className="w-full max-w-3xl space-y-8 pb-32">
        {!object?.length && !isLoading && (
          <div className="text-center text-zinc-400 mt-20">
            No Pokémon generated yet.
          </div>
        )}
  
        {object?.map((pokemon) => (
          <div
            key={pokemon?.name}
            className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            {/* Name */}
            <h2 className="text-3xl font-semibold mb-6 text-center">
              {pokemon?.name}
            </h2>
  
            <div className="grid md:grid-cols-2 gap-8">
  
              {/* Abilities */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-500 mb-3">
                  Abilities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(pokemon?.abilities ?? []).map((ability) => (
                    <span
                      key={ability}
                      className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                    >
                      {ability}
                    </span>
                  ))}
                </div>
              </div>
  
              {/* Weakness */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-red-500 mb-3">
                  Weaknesses
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(pokemon?.weekness ?? []).map((weak) => (
                    <span
                      key={weak}
                      className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    >
                      {weak}
                    </span>
                  ))}
                </div>
              </div>
  
            </div>
          </div>
        ))}
  
        {isLoading && (
          <div className="flex justify-center pt-10">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}
  
        {error && (
          <div className="text-red-500 text-center">
            {error.message}
          </div>
        )}
      </div>
  
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-6 w-full max-w-2xl px-4"
      >
        <div className="flex items-center bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-full shadow-lg overflow-hidden">
  
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Enter Pokémon type (e.g. fire, water...)"
            className="flex-1 px-6 py-4 bg-transparent focus:outline-none"
          />
  
          {isLoading ? (
            <button
              onClick={stop}
              className="px-6 py-4 bg-red-500 text-white font-medium hover:bg-red-600 transition"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={!type.trim()}
              className="px-6 py-4 bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              Generate
            </button>
          )}
        </div>
      </form>
    </div>
  );
}