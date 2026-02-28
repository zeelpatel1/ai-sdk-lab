const ResumePreview = ({ resumeData }) => {
    return (
      <div className="bg-white shadow-2xl rounded-xl p-8">
        <h1 className="text-3xl font-bold">{resumeData.name}</h1>
        <p className="text-gray-600">
          {resumeData.email} | {resumeData.phone}
        </p>
  
        {resumeData.summary && (
          <>
            <h2 className="mt-6 text-lg font-semibold border-b pb-2">
              Summary
            </h2>
            <p className="mt-2 text-gray-700">{resumeData.summary}</p>
          </>
        )}
  
        {resumeData.skills.length > 0 && (
          <>
            <h2 className="mt-6 text-lg font-semibold border-b pb-2">
              Skills
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </>
        )}
  
        {resumeData.experience.length > 0 && (
          <>
            <h2 className="mt-6 text-lg font-semibold border-b pb-2">
              Experience
            </h2>
  
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mt-4">
                <h3 className="font-semibold">{exp.role}</h3>
                <p className="text-sm text-gray-600">
                  {exp.company} | {exp.duration}
                </p>
                <p className="text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}
          </>
        )}
      </div>
    );
  };
  
  export default ResumePreview;