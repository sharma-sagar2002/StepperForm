

import React from 'react';
import UserInfoForm from './UserInfoForm';
import FamilyInfoForm from './FamilyInfoForm';
import DocUpload from './DocUpload';
import AddressForm from './AddressForm';
import { UseFormRegister, FieldErrors, Control, UseFormSetValue, UseFormGetValues } from 'react-hook-form';

interface ReviewStepProps {
    onEdit: (step: number) => void;
    formValues: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        pin: string;
        state: string;
        country: string;
        family: { name: string; phoneNumber: string; }[];
        documents: File[];
        street: string;
        houseNumber: string;
    };
    errors: FieldErrors<any>; // Proper type for errors
    register: UseFormRegister<any>;
    control: Control<any>;
    setValue: UseFormSetValue<any>;
    getValues: UseFormGetValues<any>;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
    onEdit,
    formValues,
    errors,
    register,
    control,
    setValue,
    getValues
}) => {
    return (
        <div className="flex flex-col space-y-6">
            <h3 className="text-2xl font-semibold mb-4 text-center">Review Your Information</h3>

            {/* User Info Section */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h4 className="text-xl font-medium mb-2">User Information</h4>
                <UserInfoForm
                    readonly={true}
                    errors={errors}
                    register={register}
                />
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
                <FamilyInfoForm
                    readonly={true}
                    control={control}
                    errors={errors}
                    register={register}
                />
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
                <DocUpload
                    readonly={true}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                />
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
                <AddressForm
                    readonly={true}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                />
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

