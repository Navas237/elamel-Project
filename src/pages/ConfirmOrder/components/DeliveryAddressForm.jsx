import React from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

export default function DeliveryAddressForm({
    register,
    errors,
    control,
    setValue,
    governorateOptions,
    centerOptions,
    areaOptions,
    selectedGovernorate,
    selectedCenter,
    setSelectedGovernorate,
    setSelectedCenter,
    setSelectedArea,
    increasWightt,
    customSelectStyles,
    textFieldStyle
}) {
    return (
        <div className='mb-6 sm:mb-8'>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2'>
                <span className='w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base text-white' style={{background:'linear-gradient(135deg,#2E9E98,#1D7A75)'}}>2</span>
                <span className='text-lg sm:text-2xl'>عنوان التوصيل</span>
            </h2>

            {/* Governorate Selection */}
            <div className="flex flex-col mb-1">
                <label className={`text-right mb-2 font-bold ${errors.gover ? 'text-red-500' : 'text-gray-700'}`}>المحافظة</label>
                <Controller
                    name="gover"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            inputId={field.name}
                            options={governorateOptions}
                            placeholder="اختر المحافظة"
                            isSearchable={true}
                            styles={customSelectStyles}
                            classNamePrefix="react-select"
                            value={governorateOptions.find(o => o.value === selectedGovernorate)}
                            onChange={(val) => {
                                const nextGovernorate = val?.value || '';
                                field.onChange(nextGovernorate);
                                setSelectedGovernorate(nextGovernorate);
                                setSelectedCenter('');
                                setSelectedArea('');
                                setValue('center', '');
                                setValue('mantaq', '');
                                increasWightt();
                            }}
                        />
                    )}
                />
                {errors.gover && <span className="text-red-500 text-sm mb-4 text-right">{errors.gover.message}</span>}
            </div>

            {/* Center Selection */}
            <div className="flex flex-col mb-1">
                <label className={`text-right mb-2 font-bold ${!selectedGovernorate ? 'text-gray-400' : errors.center ? 'text-red-500' : 'text-gray-700'}`}>المركز / المدينة</label>
                <Controller
                    name="center"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            inputId={field.name}
                            options={centerOptions}
                            placeholder="اختر المركز"
                            isSearchable={true}
                            isDisabled={!selectedGovernorate}
                            styles={customSelectStyles}
                            value={centerOptions.find(o => o.value === selectedCenter) || null}
                            onChange={(val) => {
                                const nextCenter = val?.value || '';
                                field.onChange(nextCenter);
                                setSelectedCenter(nextCenter);
                                setSelectedArea('');
                                setValue('mantaq', '');
                            }}
                        />
                    )}
                />
                {errors.center && <span className="text-red-500 text-sm mb-4 text-right">{errors.center.message}</span>}
            </div>

            {/* Area Selection */}
            {areaOptions.length > 0 && (
                <div className="flex flex-col mb-1">
                    <label className={`text-right mb-2 font-bold ${errors.mantaq ? 'text-red-500' : 'text-gray-700'}`}>
                        المنطقة <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name="mantaq"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                inputId={field.name}
                                options={areaOptions}
                                placeholder="اختر المنطقة"
                                isSearchable={true}
                                styles={customSelectStyles}
                                value={areaOptions.find(o => o.value === field.value) || null}
                                onChange={(val) => {
                                    const nextArea = val?.value || '';
                                    field.onChange(nextArea);
                                    setSelectedArea(nextArea);
                                }}
                            />
                        )}
                    />
                    {errors.mantaq && <span className="text-red-500 text-sm mb-4 text-right">{errors.mantaq.message}</span>}
                </div>
            )}

            <TextField
                {...register('address')}
                error={!!errors.address}
                helperText={errors.address?.message}
                fullWidth
                multiline
                rows={3}
                type="text"
                label="العنوان بالتفاصيل"
                placeholder="مثال: شارع... - عمارة رقم... - الدور..."
                sx={textFieldStyle}
            />
        </div>
    );
}
