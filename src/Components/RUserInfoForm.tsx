

import React from 'react';
import InputField from './InputField';

interface FamilyMemberFormProps {
    index: number;
    readonly?: boolean;
    onRemove?: () => void;
}

const RUserInfoForm: React.FC<FamilyMemberFormProps> = ({ index, readonly = false, onRemove }) => (
    <div className="space-y-4">
        <InputField
            name={`family.${index}.firstName`}
            label="First Name"
            validation={{ required: 'First Name is required' }}
            readonly={readonly}
        />

        <InputField
            name={`family.${index}.lastName`}
            label="Last Name"
            validation={{ required: 'Last Name is required' }}
            readonly={readonly}
        />

        <InputField
            name={`family.${index}.phoneNumber`}
            label="Phone Number"
            type="number"
            validation={{
                required: 'Phone number is required',
                pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Phone number must be 10 digits',
                },
                min: {
                    value: 0,
                    message: 'Phone number cannot be negative',
                },
            }}
            readonly={readonly}
        />

        <InputField
            name={`family.${index}.email`}
            label="Email"
            type="email"
            validation={{
                required: 'Email is required',
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/i, message: 'Invalid email address' }
            }}
            readonly={readonly}
        />

        <InputField
            name={`family.${index}.pin`}
            label="PIN Code"
            type="number"
            validation={{
                required: 'Pincode is required',
                minLength: { value: 6, message: 'Pincode must be of 6 digits' }
            }}
            readonly={readonly}
        />

        <InputField
            name={`family.${index}.state`}
            label="State"
            validation={{ required: 'State is required' }}
            readonly={readonly}
        />

        {!readonly && onRemove && (
            <button
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                onClick={onRemove}
            >
                Remove
            </button>
        )}
    </div>
);

export default RUserInfoForm;

