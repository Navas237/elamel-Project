/**
 * Normalizes Arabic text to improve search accuracy.
 * Handles variations like Hamza on Alif, Taa Marbuta vs Ha, and Alif Maqsura vs Ya.
 * Also removes Arabic diacritics (Tashkeel).
 * 
 * @param {string} text - The text to be normalized.
 * @returns {string} - The normalized text.
 */
export const normalizeArabic = (text) => {
    if (!text) return "";

    return text
        // Normalize Alif variations
        .replace(/[أإآ]/g, "ا")
        // Normalize Taa Marbuta to Ha
        .replace(/ة/g, "ه")
        // Normalize Alif Maqsura to Ya (common in search behavior)
        .replace(/ى/g, "ي")
        // Remove Arabic diacritics (Tashkeel)
        .replace(/[\u064B-\u0652]/g, "")
        // Remove extra spaces
        .trim()
        .toLowerCase();
};
