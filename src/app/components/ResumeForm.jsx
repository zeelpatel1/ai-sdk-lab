import SkillsInput from "./SkillsInput";
import ExperienceSection from "./ExperienceSection";

const ResumeForm = ({ resumeData, setResumeData }) => {
  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleSumit=async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/api/structured-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });
  
      const data = await response.json();
      setResumeData(data.resume)
    } catch (error) {
      console.error("Error generating resume:", error);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Build Your Resume
      </h2>

      {/* Personal Info */}
      <div className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          value={resumeData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="email"
          placeholder="Email"
          value={resumeData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={resumeData.phone}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="summary"
          placeholder="Professional Summary"
          value={resumeData.summary}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Skills */}
      <SkillsInput resumeData={resumeData} setResumeData={setResumeData} />

      {/* Experience */}
      <ExperienceSection
        resumeData={resumeData}
        setResumeData={setResumeData}
      />

      <button onClick={handleSumit} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition">
        Generate AI Resume 🚀
      </button>
    </div>
  );
};

export default ResumeForm;