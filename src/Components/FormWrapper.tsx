// Components/FormWrapper.tsx
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import ProgressBar from './ProgressBar';

interface FormWrapperProps {
    children: (step: number, handleBack: () => void, handleNext: () => void) => React.ReactNode;
    onFinalSubmit: (data: any) => void;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, onFinalSubmit }) => {
    const methods = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            pin: '',
            state: '',
            family: [{ firstName: '', lastName: '', phoneNumber: '', email: '', pin: '', state: '' }],
            documents: [],
            street: '',
            houseNumber: '',
            country: ''
        }
    });

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
            onFinalSubmit(data);
            handleNext(); // Navigate to Thank You step after final submit
        } else {
            handleNext();
        }
    };


    return (
        <FormProvider {...methods}>
            <div className='my-4'>
                {step !== 6 && <ProgressBar step={step} />}
                <form className="w-1/2 content-center m-auto mt-4 mb-4 bg-gray-50 p-4 rounded-lg shadow-inner" onSubmit={methods.handleSubmit(onSubmit)}>
                    {children(step, handleBack, handleNext)}
                    <div>
                        {step > 1 && step !== 6 && (
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
        </FormProvider>
    );
};

export default FormWrapper;
