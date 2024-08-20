
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
    name: string;
    label: string;
    type?: string;
    validation?: object;
    readonly?: boolean;
    register: UseFormRegister<any>;
    errors: FieldErrors;
    
}

const InputField: React.FC<InputFieldProps> = ({ name, label, type = 'text', validation = {}, readonly = false, register, errors }) => {
    // Extract error for nested fields using dot notation (e.g., 'family.0.name')
    const fieldError = name.split('.').reduce((obj, key) => obj?.[key], errors as any);

    return (
        <div>
            <label className="block font-medium text-gray-700">{label}</label>
            <input
                type={type}
                className={`mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${readonly ? 'bg-gray-100' : ''}`}
                {...register(name, validation)}
                readOnly={readonly}
            />
            {fieldError && (
                <p className="text-red-600 mt-1 text-sm">
                    {String(fieldError?.message)}
                </p>
            )}
        </div>
    );
};

export default InputField;


