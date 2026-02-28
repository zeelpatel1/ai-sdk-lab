import { useState } from "react";

const SkillsInput = ({ resumeData, setResumeData }) => {
  const [skill, setSkill] = useState("");

  const addSkill = () => {
    if (!skill.trim()) return;
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, skill],
    });
    setSkill("");
  };

  const removeSkill = (index) => {
    const updated = resumeData.skills.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, skills: updated });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Skills</h3>

      <div className="flex gap-2">
        <input
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="Add Skill"
          className="flex-1 p-3 rounded-xl border"
        />
        <button
          onClick={addSkill}
          className="bg-blue-500 text-white px-4 rounded-xl"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {resumeData.skills.map((s, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer"
            onClick={() => removeSkill(index)}
          >
            {s} ✕
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsInput;