const ExperienceSection = ({ resumeData, setResumeData }) => {
    const addExperience = () => {
      setResumeData({
        ...resumeData,
        experience: [
          ...resumeData.experience,
          { company: "", role: "", duration: "", description: "" },
        ],
      });
    };
  
    const handleChange = (index, field, value) => {
      const updated = [...resumeData.experience];
      updated[index][field] = value;
      setResumeData({ ...resumeData, experience: updated });
    };
  
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">Experience</h3>
  
        {resumeData.experience.map((exp, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl space-y-3 mb-4"
          >
            <input
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                handleChange(index, "company", e.target.value)
              }
              className="w-full p-2 rounded border"
            />
  
            <input
              placeholder="Role"
              value={exp.role}
              onChange={(e) => handleChange(index, "role", e.target.value)}
              className="w-full p-2 rounded border"
            />
  
            <input
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) =>
                handleChange(index, "duration", e.target.value)
              }
              className="w-full p-2 rounded border"
            />
  
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              className="w-full p-2 rounded border"
            />
          </div>
        ))}
  
        <button
          onClick={addExperience}
          className="bg-purple-500 text-white px-4 py-2 rounded-xl"
        >
          + Add Experience
        </button>
      </div>
    );
  };
  
  export default ExperienceSection;