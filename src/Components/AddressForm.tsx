

import React, { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useLoadScript } from '@react-google-maps/api';
import InputField from './InputField';

const libraries: ('places')[] = ['places'];

interface AddressFormProps {
    readonly?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ readonly = false }) => {
    const { register, setValue, getValues, formState: { errors } } = useFormContext();
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyC42YgNcCSadoy8dxDKKEXZohJU9B5eM2M',
        libraries,
    });

    useEffect(() => {
        if (isLoaded && autocompleteRef.current) {
            autocompleteRef.current.addListener('place_changed', () => {
                const place = autocompleteRef.current?.getPlace();
                if (place && place.address_components) {
                    let state = '';
                    let country = '';

                    place.address_components.forEach((component) => {
                        const componentType = component.types[0];

                        if (componentType === 'administrative_area_level_1') {
                            state = component.long_name;
                        } else if (componentType === 'country') {
                            country = component.long_name;
                        }
                    });

                    if (state) setValue('state', state);
                    if (country) setValue('country', country);
                }
            });
        }
    }, [isLoaded, setValue]);

    const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const state = event.target.value;
        setValue('state', state);
        
        // Fetch and update country based on the state
        if (state) {
            const country = getCountryFromState(state);
            setValue('country', country);
        } else {
            setValue('country', '');
        }
    };

    const validIndianStates = new Set([
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
        'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi', 'Lakshadweep', 'Puducherry', 'Ladakh', 'Jammu and Kashmir'
    ]);
    

    
    const getCountryFromState = (state: string) => {
        if (validIndianStates.has(state)) {
            return 'India';
        }
        return ''; 
    };
    
    

    return (
        <div className="space-y-6">
           {(!readonly)&& <h2 className="text-xl font-semibold text-gray-800 text-center">Address Information</h2>}
            <InputField
                name="street"
                label="Street Number"
                type="number"
                validation={{ required: 'Street is required', min: { value: 1, message: 'Street number cannot be 0 or negative' } }}
                readonly={readonly}
            />

            <InputField
                name="houseNumber"
                label="House Number"
                type="number"
                validation={{ required: 'House No is required', min: { value: 1, message: 'House No cannot be 0 or negative' }, max: {value : 9999, message : "House No cannot be too large"}}}
                readonly={readonly}
            />

            <div>
                <label className="block font-medium text-gray-700">State</label>
                <input
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${readonly ? 'bg-gray-100' : ''}`}
                    {...register('state', { required: 'State is required' })}
                    onChange={handleStateChange}
                    ref={(ref) => {
                        if (ref && isLoaded) {
                            const options = {
                                types: ['(regions)'],
                                componentRestrictions: { country: 'in' },
                            };
                            autocompleteRef.current = new google.maps.places.Autocomplete(ref, options);
                            onLoad(autocompleteRef.current);
                        }
                    }}
                    readOnly={readonly}
                />
                {errors.state && <p className="text-red-600 mt-1 text-sm">{String(errors.state.message)}</p>}
            </div>

            <InputField
                name="country"
                label="Country"
                validation={{ required: 'Country is required' }}
                readonly={readonly}
            />

        </div>
    );
};
export default AddressForm