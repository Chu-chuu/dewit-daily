import React, { useState, useEffect } from 'react';

const Routine = () => {
  const [steps, setSteps] = useState(() => {
 // Load initial steps from localStorage or default
    const savedSteps = localStorage.getItem("routineSteps");
    return savedSteps ? JSON.parse(savedSteps) : ["Cleanser", "Toner", "Moisturizer"];
  });
  const [newStep, setNewStep] = useState("");
  const [editingIndex, setEditingIndex] = useState(null); // Tracks which step is being edited
  const [editingText, setEditingText] = useState(""); // Tracks the new value for the edited step

  useEffect(() => {
// Save steps to localStorage whenever they change
    localStorage.setItem("routineSteps", JSON.stringify(steps));
  }, [steps]);

  const handleAddStep = () => {
    if (newStep.trim()) {
      setSteps([...steps, newStep.trim()]);
      setNewStep("");
    }
  };

  const handleRemoveStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleEditStep = (index) => {
    setEditingIndex(index);
    setEditingText(steps[index]);
  };

  const handleSaveStep = () => {
    const updatedSteps = steps.map((step, index) =>
      index === editingIndex ? editingText.trim() : step
    );
    setSteps(updatedSteps);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold text-primary mb-4">My Skincare Routine</h1>

      {/* List of Steps */}
      <ul className="space-y-2">
        {steps.map((step, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-md shadow-sm"
          >
            {editingIndex === index ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="flex-grow border border-gray-300 px-2 py-1 rounded-md"
              />
            ) : (
              <span>{step}</span>
            )}
            <div className="space-x-2">
              {editingIndex === index ? (
                <button
                  onClick={handleSaveStep}
                  className="text-green-500 hover:text-green-700"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEditStep(index)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleRemoveStep(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Step Input */}
      <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="New Step"
          value={newStep}
          onChange={(e) => setNewStep(e.target.value)}
          className="flex-grow border border-gray-300 px-2 py-1 rounded-md"
        />
        <button
          onClick={handleAddStep}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition duration-300"
        >
          Add Step
        </button>
      </div>
    </div>
  );
};

export default Routine;