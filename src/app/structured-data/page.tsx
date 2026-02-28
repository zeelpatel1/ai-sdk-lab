"use client"

import { useState } from "react";
import ResumeForm from "@/app/components/ResumeForm";
import ResumePreview from "@/app/components/ResumePreview";

function App() {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: [],
    experience: [],
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        <ResumePreview resumeData={resumeData} />
      </div>
    </div>
  );
}

export default App;