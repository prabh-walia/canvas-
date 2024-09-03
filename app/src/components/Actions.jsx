import React from 'react';

export default function Actions({ moveObject })  {
  return (
    <div className="flex flex-row space-x-3 justify-center">
      <button
        onClick={() => moveObject(0, -10)}
        className="bg-gray-500 text-white w-20 p-2 rounded mb-2"
      >
     Up
      </button>
      <button
        onClick={() => moveObject(0, 10)}
        className="bg-gray-500 text-white p-2 w-20  rounded mb-2"
      >
     Down
      </button>
      <button
        onClick={() => moveObject(-10, 0)}
        className="bg-gray-500 text-white p-2 w-20  rounded mb-2"
      >
      Left
      </button>
      <button
        onClick={() => moveObject(10, 0)}
        className="bg-gray-500 text-white w-20  p-2  mb-2"
      >
         Right
      </button>
    </div>
  );
};


