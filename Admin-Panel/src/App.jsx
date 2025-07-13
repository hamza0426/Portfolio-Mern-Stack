import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Hello Tailwind CSS!
      </h1>

      <p className="text-gray-700 mb-6 text-2xl">
        If you see this styled, Tailwind is working ✅
      </p>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
        Click Me
      </button>
    </div>
  );
};

export default App;
