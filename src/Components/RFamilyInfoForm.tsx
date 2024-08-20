


import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import RUserInfoForm from './RUserInfoForm';

interface FamilyInfoFormProps {
    readonly?: boolean;
}

const RFamilyInfoForm: React.FC<FamilyInfoFormProps> = ({ readonly = false }) => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'family',
    });

    return (
        <div className="space-y-6">
            {!readonly && <h2 className="text-xl font-semibold text-gray-800 text-center">Family Information</h2>}

            {fields.map((item, index) => (
                <RUserInfoForm
                    key={item.id}
                    index={index}
                    readonly={readonly}
                    onRemove={() => remove(index)}
                />
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

export default RFamilyInfoForm;




