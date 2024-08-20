


import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import InputField from './InputField'; 

interface FamilyInfoFormProps {
    readonly?: boolean;
}

const FamilyInfoForm: React.FC<FamilyInfoFormProps> = ({ readonly = false }) => {
    const { control, formState: { errors } } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'family',
    });

    return (
        <div className="space-y-6">
         {  (!readonly)&&  <h2 className="text-xl font-semibold text-gray-800 text-center">Family Information</h2>}

            {fields.map((item, index) => (
                <div key={item.id} className="space-y-4">
                    
                    <InputField
                        name={`family.${index}.name`}
                        label="Name"
                        validation={{ required: 'Name is required' }}
                        readonly={readonly}  // Pass readonly prop to InputField
                    />

                    <InputField
                        name={`family.${index}.phoneNumber`}
                        label="Phone Number"
                        type='number'
                        validation={{
                            required: 'Phone number is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Phone number must be 10 digits',
                            },
                            min: {
                                value: 0,
                                message: 'Phone number cannot be negative',
                            }
                        }}
                        readonly={readonly}  // Pass readonly prop to InputField
                    />

                    {!readonly && fields.length > 1 && (
                        <button
                            type="button"
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            onClick={() => remove(index)}
                        >
                            Remove
                        </button>
                    )}
                </div>
            ))}

            {!readonly && (
                <button
                    type="button"
                    onClick={() => append({ name: '', phoneNumber: '' })}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Add More Family Member
                </button>
            )}
        </div>
    );
};

export default FamilyInfoForm;


