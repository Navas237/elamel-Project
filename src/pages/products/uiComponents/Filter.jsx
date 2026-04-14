import React from 'react';
import { motion } from 'framer-motion';
import Select from 'react-select';

/* ─────────────────────────────────────────────
   درجة teal-400/500 للـ select — filter bar يكون
   درجة أخف من الـ Navbar (teal-700/800)
───────────────────────────────────────────── */
const selectStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: '14px',
    fontSize: '14px',
    backgroundColor: '#fff',
    border: state.isFocused ? '2px solid var(--color-input-border-focus)' : '1.5px solid var(--color-card-border)',
    boxShadow: state.isFocused ? '0 4px 14px var(--color-input-ring)' : 'none',
    '&:hover': { borderColor: 'var(--color-input-border-focus)', backgroundColor: 'var(--color-outline-soft)' },
    transition: 'all 0.25s ease',
    textAlign: 'right',
    direction: 'rtl',
    minHeight: '45px',
  }),
  placeholder: (base) => ({ ...base, textAlign: 'right', color: '#6B9E9B' }),
  singleValue:  (base) => ({ ...base, textAlign: 'right', fontWeight: 'bold', color: 'var(--teal-600)' }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base) => ({ ...base, color: 'var(--teal-400)' }),
  menu: (base) => ({ ...base, borderRadius: '14px', overflow: 'hidden', zIndex: 100, textAlign: 'right', border: '1.5px solid var(--color-card-border)' }),
  option: (base, state) => ({
    ...base,
    textAlign: 'right',
    fontSize: '14px',
    /* selected → teal-500, hover → teal-50 */
    backgroundColor: state.isSelected ? 'var(--teal-500)' : state.isFocused ? 'var(--teal-50)' : '#fff',
    color: state.isSelected ? '#fff' : 'var(--teal-600)',
    padding: '10px 15px',
    fontWeight: state.isSelected ? 'bold' : 'normal',
    '&:active': { backgroundColor: 'var(--teal-400)' },
  }),
};

function Filter({ companyOptions, typebookOptions, selectedCompany, selectedTypebook, setSelectedCompany, setSelectedTypebook }) {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      /* Filter bar بدرجة teal-50 — أخف درجة، مش نفس لون الـ Navbar */
      className="sticky top-[58px] md:top-[62px] z-30 backdrop-blur-md py-2.5 px-2 mb-5 border-b shadow-sm"
      style={{ background: 'rgba(252,254,254,0.92)', borderColor: 'var(--color-card-border)' }}
    >
      <div className="flex flex-row-reverse items-center justify-center gap-2 max-w-7xl mx-auto">
        <motion.div whileHover={{ scale: 1.02 }} className="w-1/2 md:w-72">
          <Select
            options={companyOptions}
            value={companyOptions.find(o => o.value === selectedCompany)}
            onChange={v => setSelectedCompany(v?.value || 'all')}
            styles={selectStyles}
            placeholder="اسم الكتاب"
            isSearchable={false}
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="w-1/2 md:w-72">
          <Select
            options={typebookOptions}
            value={typebookOptions.find(o => o.value === selectedTypebook)}
            onChange={v => setSelectedTypebook(v?.value || 'all')}
            styles={selectStyles}
            placeholder="المادة"
            isSearchable={false}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Filter;
