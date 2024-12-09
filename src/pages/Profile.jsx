import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [name, setName] = useState(() => {
    const savedName = localStorage.getItem("profileName");
    return savedName ? savedName : "John Doe"; // Load from storage or default
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    // Save the name whenever it changes
    localStorage.setItem("profileName", name);
  }, [name]);

  const handleEdit = () => {
    setNewName(name); // Pre-fill input with current name
    setIsEditing(true);
  };

  const handleSave = () => {
    setName(newName.trim());
    setIsEditing(false);
  };

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold text-primary mb-4">Profile</h1>

      {/* Profile Picture */}
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="rounded-full w-24 h-24"
        />
        <div>
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded-md"
            />
          ) : (
            <h2 className="text-lg font-semibold">{name}</h2>
          )}
          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-green-500 hover:text-green-700 mt-2"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-700 mt-2"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
