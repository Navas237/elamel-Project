import React from 'react';
import TextField from '@mui/material/TextField';

export default function PersonalInfoForm({
    register,
    errors,
    normalizeArabicNumbers,
    textFieldStyle
}) {
    return (
        <div className='mb-6 sm:mb-8'>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2'>
                <span className='w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base text-white' style={{background:'var(--gradient-brand)'}}>1</span>
                <span className='text-lg sm:text-2xl'>البيانات الشخصية</span>
            </h2>

            <TextField
                fullWidth
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                type="text"
                label="الاسم بالكامل"
                sx={textFieldStyle}
            />

            <TextField
                fullWidth
                label="رقم الهاتف"
                type="text"
                sx={textFieldStyle}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                {...register('phone', {
                    onChange: (e) => {
                        let val = normalizeArabicNumbers(e.target.value);
                        e.target.value = (val.startsWith('0') && !val.startsWith('01')) ? val.slice(0, 10) : val.slice(0, 11);
                    },
                })}
                inputProps={{ maxLength: 11 }}
            />

            <TextField
                fullWidth
                label="رقم اخر"
                type="text"
                sx={textFieldStyle}
                error={!!errors.whats}
                helperText={errors.whats?.message}
                {...register('whats', {
                    onChange: (e) => {
                        let val = normalizeArabicNumbers(e.target.value);
                        e.target.value = (val.startsWith('0') && !val.startsWith('01')) ? val.slice(0, 10) : val.slice(0, 11);
                    },
                })}
                inputProps={{ maxLength: 11 }}
            />
        </div>
    );
}
