
import React from 'react';
import { useFormContext } from 'react-hook-form';
import UserInfoForm from './UserInfoForm'; // Import the UserInfoForm component
import RFamilyInfoForm from './RFamilyInfoForm'; // Import the FamilyInfoForm component
import DocUpload from './DocUpload'; // Import the DocUpload component
import AddressForm from './AddressForm'; // Import the AddressForm component

interface ReviewStepProps {
    onEdit: (step: number) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ onEdit }) => {
    const { getValues } = useFormContext();
    const values = getValues();

    return (
        <div className="flex flex-col space-y-6">
            <h3 className="text-2xl font-semibold mb-4 text-center">Review Your Information</h3>

            {/* User Info Section */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h4 className="text-xl font-medium mb-2">User Information</h4>
                <UserInfoForm readonly={true} /> 
                <button
                    className="mt-2 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                    onClick={() => onEdit(1)}
                >
                    Edit User Info
                </button>
            </div>

            {/* Family Info Section */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h4 className="text-xl font-medium mb-2">Family Information</h4>
                <RFamilyInfoForm readonly={true} /> {/* Render FamilyInfoForm in read-only mode */}
                <button
                    className="mt-2 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                    onClick={() => onEdit(2)}
                >
                    Edit Family Info
                </button>
            </div>

            {/* Document Upload Section */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h4 className="text-xl font-medium mb-2">Uploaded Documents</h4>
                <DocUpload readonly={true} /> {/* Render DocUpload in read-only mode */}
                <button
                    className="mt-2 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                    onClick={() => onEdit(3)}
                >
                    Edit Documents
                </button>
            </div>

            {/* Address Section */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h4 className="text-xl font-medium mb-2">Address Information</h4>
                <AddressForm readonly={true} /> {/* Render AddressForm in read-only mode */}
                <button
                    className="mt-2 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                    onClick={() => onEdit(4)}
                >
                    Edit Address
                </button>
            </div>
        </div>
    );
};

export default ReviewStep;
