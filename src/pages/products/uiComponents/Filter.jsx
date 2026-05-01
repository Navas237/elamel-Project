import React from 'react';
import { motion } from 'framer-motion';
import Select, { components } from 'react-select';
import { IconPackage, IconBookOpen } from '../../../lib/icons';

/* ─────────────────────────────────────────────
   درجة teal-400/500 للـ select — filter bar يكون
   درجة أخف من الـ Navbar (teal-700/800)
───────────────────────────────────────────── */
const selectStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: '12px',
    fontSize: '15px',
    backgroundColor: '#fff',
    border: state.isFocused ? '2px solid var(--teal-500)' : '1px solid #E5E7EB',
    boxShadow: state.isFocused ? '0 4px 14px rgba(78, 196, 189, 0.15)' : '0 2px 5px rgba(0,0,0,0.02)',
    '&:hover': { borderColor: 'var(--teal-400)' },
    transition: 'all 0.2s ease',
    textAlign: 'right',
    direction: 'rtl',
    minHeight: '48px',
    cursor: 'pointer'
  }),
  placeholder: (base) => ({ ...base, textAlign: 'right', color: '#9CA3AF' }),
  singleValue: (base) => ({ ...base, textAlign: 'right', fontWeight: '600', color: '#1F2937' }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base) => ({ ...base, color: '#9CA3AF', padding: '0 8px' }),
  menu: (base) => ({
    ...base,
    borderRadius: '12px',
    overflow: 'hidden',
    zIndex: 100,
    textAlign: 'right',
    border: '1px solid #E5E7EB',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    marginTop: '6px'
  }),
  option: (base, state) => ({
    ...base,
    textAlign: 'right',
    fontSize: '15px',
    backgroundColor: state.isSelected ? 'var(--teal-500)' : state.isFocused ? '#F3F4F6' : '#fff',
    color: state.isSelected ? '#fff' : '#4B5563',
    padding: '12px 16px',
    fontWeight: state.isSelected ? '600' : '400',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '&:active': { backgroundColor: 'var(--teal-400)' },
  }),
};

// Custom Option Component
const CustomOption = (props) => {
  const { data } = props;
  const Icon = data.icon;
  return (
    <components.Option {...props}>
      {Icon && <Icon size={16} className={props.isSelected ? "text-white" : "text-gray-400"} />}
      <span>{data.label}</span>
    </components.Option>
  );
};

// Custom SingleValue Component
const CustomSingleValue = (props) => {
  const { data } = props;
  const Icon = data.icon;
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={16} className="text-teal-500" />}
        <span>{data.label}</span>
      </div>
    </components.SingleValue>
  );
};

function Filter({ companyOptions, typebookOptions, selectedCompany, selectedTypebook, setSelectedCompany, setSelectedTypebook }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="sticky top-[90px] md:top-[62px] z-30 bg-white/80 backdrop-blur-lg py-3 px-3 mb-6 border-b border-gray-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
    >
      <div className="flex flex-row-reverse items-center justify-center gap-3 max-w-4xl mx-auto">
        <div className="w-1/2 md:w-64">
          <Select
            options={companyOptions}
            value={companyOptions.find(o => o.value === selectedCompany)}
            onChange={v => setSelectedCompany(v?.value || 'all')}
            styles={selectStyles}
            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
            placeholder="اسم الكتاب"
            isSearchable={false}
          />
        </div>

        <div className="w-1/2 md:w-64">
          <Select
            options={typebookOptions}
            value={typebookOptions.find(o => o.value === selectedTypebook)}
            onChange={v => setSelectedTypebook(v?.value || 'all')}
            styles={selectStyles}
            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
            placeholder="المادة"
            isSearchable={false}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Filter;
