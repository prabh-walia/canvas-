import React from 'react';

export default function TextInput({ setText, text })  {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to add overlay"
        className="border p-2 rounded w-full"
      />
    </div>
  );
};

