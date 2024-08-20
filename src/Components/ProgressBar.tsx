import React from 'react';

interface ProgressBarProps {
    step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
    return (
        <div  className="flex items-center justify-center mb-4">
            {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex items-center ">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mx-4
                        ${num <= step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500 '}`}>
                        {num}
                    </div>
                    {/* {num < 5 && <div className={`w-10 h-1 ${num < step ? 'bg-blue-500' : 'bg-gray-300'}`} />} */}
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
