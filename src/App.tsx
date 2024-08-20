
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UserInfoForm from './Components/UserInfoForm';
import FamilyInfoForm from './Components/FamilyInfoForm';
import AddressForm from './Components/AddressForm';
import ReviewStep from './Components/ReviewStep';
import ThankYou from './Components/ThankYou';
import ProgressBar from './Components/ProgressBar';
import DocUpload from './Components/DocUpload';

const App: React.FC = () => {
    const methods = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            pin: '',
            state: '',
            country: '',
            family: [{ name: '', phoneNumber: '' }],
            documents: [],
            street: '',
            houseNumber: '',
        }
    });

    const { register, handleSubmit, formState: { errors }, setValue, getValues, control } = methods;
    
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

    const handleEdit = (step: number) => setStep(step);

    const onSubmit = (data: any) => {
        if (step === 5) {
            console.log('Final Data:', data);
            handleNext();
        } else {
            handleNext();
        }
    };

    const formValues = getValues();

    return (
        <div className='my-4'>
            {step !== 6 && <ProgressBar step={step} />}
            <form className="w-1/2 content-center m-auto mt-4 mb-4 bg-gray-50 p-4 rounded-lg shadow-inner" onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && <UserInfoForm
                    register={register}
                    errors={errors}
                    readonly={false}
                />}
                {step === 2 && <FamilyInfoForm
                    register={register}
                    errors={errors}
                    control={control}
                    readonly={false}
                />}
                {step === 3 && <DocUpload
                    register={register}
                    errors={errors}
                    readonly={false}
                    setValue={setValue}
                    getValues={getValues}
                />}
                {step === 4 && <AddressForm
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                    readonly={false}
                />}
                {step === 5 && <ReviewStep
                    onEdit={handleEdit}
                    formValues={formValues}
                    errors={errors}
                    register={register}
                    control={control}
                    setValue={setValue}
                    getValues={getValues}
                />}
                {step === 6 && <ThankYou />}
                <div>
                    {step > 1 && step<6 && (
                        <button
                            className="bg-blue-500 text-white py-2 px-4 mt-4 mr-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            type="button"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                    )}
                    {step !== 6 && (
                        <button
                            className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            type="submit"
                        >
                            {step === 5 ? 'Submit' : 'Next'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default App;
