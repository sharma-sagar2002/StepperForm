import React from 'react';

const ThankYou: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Thank You!</h1>
        <p className="text-gray-700">
          Congratulations ! your form is submitted successfully. We appreciate your effort.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
