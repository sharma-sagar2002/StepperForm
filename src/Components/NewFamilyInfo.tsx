import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import InputField from './InputField'; 

interface FamilyInfoFormProps {
    readonly?: boolean;
}

const NewFamilyInfo: React.FC<FamilyInfoFormProps> = ({ readonly = false }) => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'family',
    });

    return (
        <div className="space-y-6">
            {!readonly && <h2 className="text-xl font-semibold text-gray-800 text-center">Family Information</h2>}

            {fields.map((item, index) => (
                <div key={item.id} className="space-y-4">

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
                        type='number'
                        validation={{
                            required: 'Pincode is required',
                            minLength: { value: 6, message: "Pincode must be of 6 digits" }
                        }}
                        readonly={readonly}
                    />
                    
                    <InputField
                        name={`family.${index}.state`}
                        label="State"
                        validation={{ required: 'State is required' }}
                        readonly={readonly}
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
                    onClick={() => append({ firstName: '', lastName: '', phoneNumber: '', email: '', pin: '', state: '' })}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Add More Family Member
                </button>
            )}
        </div>
    );
};

export default NewFamilyInfo;