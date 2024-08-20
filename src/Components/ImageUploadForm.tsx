
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const ImageUploadForm: React.FC = () => {
    const { setValue, getValues, formState: { errors } } = useFormContext();
    const [uploadedImages, setUploadedImages] = useState<File[]>(getValues('images') || []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        const newImages = [...uploadedImages, ...files];
        setUploadedImages(newImages);
        setValue('images', newImages);
        
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = uploadedImages.filter((_, i) => i !== index);
        setUploadedImages(updatedImages);
        setValue('images', updatedImages);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 text-center">Upload Images</h2>

            <input
                type="file"
                className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                multiple
                onChange={handleImageChange}
            />
            
            {uploadedImages.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-700">Uploaded Images:</h3>
                    <ul className="list-disc list-inside">
                        {uploadedImages.map((file, index) => (
                            <li key={index} className="flex items-center justify-between text-gray-700 my-2">
                                {file.name}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="ml-4 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {errors.images && <p className="text-red-600 mt-1 text-sm">{String(errors.images.message)}</p>}
        </div>
    );
};

export default ImageUploadForm;


