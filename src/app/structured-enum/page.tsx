"use client";

import React, { useState } from "react";

export default function Page() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeSentiment = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    setSentiment(null);

    try {
      const res = await fetch("/api/structured-enum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Failed request");

      const data = await res.json();
      setSentiment(data.object); // enum output
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const sentimentColor = {
    positive:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    neutral:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
    negative:
      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 via-white to-zinc-200 dark:from-zinc-900 dark:via-zinc-950 dark:to-black px-4">
      <div className="w-full max-w-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8 space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Sentiment Analyzer
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            Classify text as positive, neutral, or negative
          </p>
        </div>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full h-32 p-4 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        {/* Button */}
        <button
          onClick={analyzeSentiment}
          disabled={loading || !text.trim()}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Analyze Sentiment"}
        </button>

        {/* Result */}
        {sentiment && (
          <div className="flex justify-center pt-4">
            <span
              className={`px-6 py-2 text-sm font-semibold rounded-full capitalize ${
                sentimentColor[sentiment as keyof typeof sentimentColor]
              }`}
            >
              {sentiment}
            </span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-red-500 text-center pt-2">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}