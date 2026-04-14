/**
 * Normalize Arabic text so search behaves consistently across common variations.
 */
export const normalizeArabic = (text = '') => {
  if (typeof text !== 'string') return '';

  return text
    .normalize('NFKC')
    .replace(/[\u0623\u0625\u0622\u0671]/g, '\u0627')
    .replace(/\u0629/g, '\u0647')
    .replace(/[\u0649\u064A\u06CC\u0626]/g, '\u064A')
    .replace(/\u0624/g, '\u0648')
    .replace(/[\u064B-\u0652\u0640]/g, '')
    .replace(/[\u0660-\u0669]/g, (digit) => (digit.charCodeAt(0) - 0x0660).toString())
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
};
