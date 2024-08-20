

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface DocUploadProps {
    readonly?: boolean;
}

const DocUpload: React.FC<DocUploadProps> = ({ readonly = false }) => {
    const { setValue, getValues, formState: { errors } } = useFormContext();
    const [uploadedDocuments, setUploadedDocuments] = useState<File[]>(getValues('documents') || []);
    const [previewDocument, setPreviewDocument] = useState<File | null>(null);

    const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (readonly) return;

        const files = e.target.files ? Array.from(e.target.files) : [];
        const validFiles = files.filter(file => allowedFileTypes.includes(file.type));
        if (validFiles.length > 0) {
            setPreviewDocument(validFiles[0]);
        }
    };

    const handleRemoveDocument = (index: number) => {
        if (readonly) return;

        const updatedDocuments = uploadedDocuments.filter((_, i) => i !== index);
        setUploadedDocuments(updatedDocuments);
        setValue('documents', updatedDocuments);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if (readonly) return;

        e.preventDefault();
        const file = e.dataTransfer.files && e.dataTransfer.files[0];
        if (file && allowedFileTypes.includes(file.type)) {
            setPreviewDocument(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        if (readonly) return;
        e.preventDefault();
    };

    const handleUpload = () => {
        if (readonly) return;

        if (previewDocument) {
            const newDocuments = [...uploadedDocuments, previewDocument];
            setUploadedDocuments(newDocuments);
            setValue('documents', newDocuments);
            setPreviewDocument(null); // Remove preview after upload
        }
    };

    const handleCancel = () => {
        if (readonly) return;

        setPreviewDocument(null); // Remove the document from the drop box area
    };

    return (
        <div className="space-y-6">
            { (!readonly)&& <h2 className="text-xl font-semibold text-gray-800 text-center">Upload Documents</h2>}

           { (!readonly) && <div
                className={`mt-1 p-6 border border-dashed border-gray-300 rounded-md text-center ${readonly ? 'bg-gray-100' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                { previewDocument ? (
                    <div>
                        <p className="text-lg text-gray-600">Preview:</p>
                        <div className="mt-2 flex flex-col items-center">
                            {/* Using dummy images for document preview */}
                            <img
                                src="https://via.placeholder.com/100?text=PDF" // Replace this URL with actual icons based on the document type
                                alt="Document Preview"
                                className="max-h-32"
                            />
                            <p className="text-sm text-gray-500 mt-2">{previewDocument.name}</p>
                            {!readonly && (
                                <div className="flex space-x-4 mt-4">
                                    <button
                                        type="button"
                                        onClick={handleUpload}
                                        className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                                    >
                                      Upload
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="bg-gray-500 text-white py-1 px-3 rounded-md hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-lg text-gray-600">Drag and drop PDF or Word documents here, or</p>
                )}

                {!readonly && (
                    <input
                        type="file"
                        className="mt-2 block w-full text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        multiple
                        onChange={handleDocumentChange}
                        accept=".pdf,.doc,.docx"
                    />
                )}
            </div>
 }
            {uploadedDocuments.length > 0 && (
                <div className="mt-4">
                   {(!readonly) && <h3 className="text-lg font-medium text-gray-700">Upload Documents :</h3>}
                    <ul className="list-disc list-inside">
                        {uploadedDocuments.map((file, index) => (
                            <li key={index} className="flex items-center justify-between text-gray-700 my-2">
                                {file.name}
                                {!readonly && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveDocument(index)}
                                        className="ml-4 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {errors.documents && <p className="text-red-600 mt-1 text-sm">{String(errors.documents.message)}</p>}
        </div>
    );
};

export default DocUpload;


