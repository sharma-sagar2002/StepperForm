import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

interface InputFieldProps {
    name: string;
    label: string;
    type?: string;
    validation?: object;
}

const InputController: React.FC<InputFieldProps> = ({ name, label, type = 'text', validation = {} }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div>
            <label className="block font-medium text-gray-700">{label}</label>
            <Controller
                name={name}
                control={control}
                rules={validation}
                render={({ field }) => (
                    <input
                        type={type}
                        className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        {...field}
                    />
                )}
            />

            {errors[name] && (
                <p className="text-red-600 mt-1 text-sm">
                    {String(errors[name]?.message)}
                </p>
            )}
        </div>
    );
};

export default InputController;
