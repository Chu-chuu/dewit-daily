import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [steps, setSteps] = useState(() => {
    const savedSteps = localStorage.getItem("routineSteps");
    return savedSteps ? JSON.parse(savedSteps) : [];
  });
  const [completedSteps, setCompletedSteps] = useState([]);

  const toggleStepCompletion = (index) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((step) => step !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  useEffect(() => {
    const reminderInterval = setInterval(() => {
      const incompleteSteps = steps.filter(
        (_, index) => !completedSteps.includes(index)
      );

      if (incompleteSteps.length > 0) {
        alert(`Reminder: You still have ${incompleteSteps.length} steps to complete!`);
      }
    }, 60000); // Notify every minute

    return () => clearInterval(reminderInterval); // Cleanup
  }, [steps, completedSteps]);

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold text-primary mb-4">Dashboard</h1>

      {/* Progress */}
      <p className="text-lg mb-4">
        {completedSteps.length} of {steps.length} steps completed (
        {steps.length > 0
          ? Math.round((completedSteps.length / steps.length) * 100)
          : 0}
        %)
      </p>

      {/* Routine Checklist */}
      <ul className="space-y-2">
        {steps.map((step, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 p-2 rounded-md border border-gray-200 shadow-sm"
          >
            {/* <span
              className={`${
                completedSteps.includes(index) ? "line-through text-gray-400" : ""
              }`}
            >
              {step}
            </span> */}
            <span
  className={`transition-all duration-300 ${
    completedSteps.includes(index) ? "line-through text-gray-400" : ""
  }`}
>
  {step}
</span>
            <button
  onClick={() => toggleStepCompletion(index)}
  className={`px-3 py-1 rounded-md transition-all duration-300 ${
    completedSteps.includes(index)
      ? "bg-green-500 text-white hover:bg-green-700"
      : "bg-gray-300 text-black hover:bg-gray-400"
  }`}
>
  {completedSteps.includes(index) ? "Completed" : "Mark as Done"}
</button>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
