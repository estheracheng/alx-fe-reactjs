import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">
          Recipe Sharing Platform
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome to your new React app with Tailwind CSS!
        </p>
        <div className="mt-6">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default App       