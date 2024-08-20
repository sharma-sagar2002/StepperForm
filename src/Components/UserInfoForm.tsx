
import React from 'react';
import InputField from './InputField';


export interface UserInfoFormValues {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    pin: string;
    state: string;
}

interface UserInfoFormProps {
    register: any;
    errors: any;
    readonly?: boolean;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ register, errors, readonly = false }) => {
    return (
        <div className="space-y-6">
            {!readonly && <h2 className="text-xl font-semibold text-gray-800 text-center">User Information</h2>}

            <InputField
                name="firstName"
                label="First Name"
                validation={{ required: 'First Name is required' }}
                readonly={readonly}
                register={register}
                errors={errors}
            />
            <InputField
                name="lastName"
                label="Last Name"
                validation={{ required: 'Last Name is required' }}
                readonly={readonly}
                register={register}
                errors={errors}
            />
            <InputField
                name="phoneNumber"
                label="Phone Number"
                type='number'
                validation={{
                    required: 'Phone Number is required',
                    pattern: { value: /^[0-9]{10}$/, message: 'Phone number must be 10 digits' },
                    min: { value: 0, message: 'Phone number cannot be negative' }
                }}
                readonly={readonly}
                register={register}
                errors={errors}
            />
            <InputField
                name="email"
                label="Email"
                type="email"
                validation={{
                    required: 'Email is required',
                    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/i, message: 'Invalid email address' }
                }}
                readonly={readonly}
                register={register}
                errors={errors}
            />
            <InputField
                name="pin"
                label="PIN Code"
                type='number'
                validation={{ required: 'Pincode is required', minLength: { value: 6, message: "Pincode must be of 6 digits" } }}
                readonly={readonly}
                register={register}
                errors={errors}
            />
            <InputField
                name="state"
                label="State"
                validation={{ required: 'State is required' }}
                readonly={readonly}
                register={register}
                errors={errors}
            />
        </div>
    );
};

export default UserInfoForm;
