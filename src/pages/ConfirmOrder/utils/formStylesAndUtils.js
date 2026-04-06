export const normalizeArabicNumbers = (input) => {
    if (!input) return "";
    const arabicToEnglish = {
        '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
        '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
    };
    return input.replace(/[٠-٩]/g, (d) => arabicToEnglish[d]);
};

export const customSelectStyles = {
    control: (base, state) => ({
        ...base, borderRadius: '12px', padding: '5px', fontSize: '18px',
        backgroundColor: '#f8f9fa', border: state.isFocused ? '1px solid #3b82f6' : '1px solid #e1e4e8',
        boxShadow: state.isFocused ? '0 4px 12px rgba(59, 130, 246, 0.15)' : 'none',
        '&:hover': { borderColor: state.isFocused ? '#3b82f6' : '#cbd5e1', backgroundColor: '#fff', },
        transition: 'all 0.3s ease', textAlign: 'right', direction: 'rtl'
    }),
    placeholder: (base) => ({ ...base, textAlign: 'right', fontSize: '16px', color: '#64748b' }),
    singleValue: (base) => ({ ...base, textAlign: 'right' }),
    menu: (base) => ({ ...base, borderRadius: '12px', overflow: 'hidden', zIndex: 100 }),
    option: (base, state) => ({
        ...base, textAlign: 'right', fontSize: '16px',
        backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : '#fff',
        color: state.isSelected ? '#fff' : '#334155',
        '&:active': { backgroundColor: '#3b82f6', }
    }),
    container: (base) => ({ ...base, marginBottom: '24px' })
};

export const textFieldStyle = {
    mb: '24px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px', fontSize: '18px', backgroundColor: '#f8f9fa', transition: 'all 0.3s ease',
        '&:hover': { backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', },
        '&.Mui-focused': { backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)', },
    },
    '& .MuiInputLabel-root': {
        fontSize: '16px', fontWeight: '500',
        '&.Mui-focused': { color: '#3b82f6', },
    },
};
