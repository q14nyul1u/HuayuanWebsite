// i18n/index.js - Erweiterte Version
import deTranslations from './de/common.json';
import zhTranslations from './zh/common.json';

// Combine all translations
export const translations = {
  de: deTranslations,
  zh: zhTranslations
};

// Available languages
export const availableLanguages = ['de', 'zh'];

// Default language
export const defaultLanguage = 'de';

// Get current language from URL or localStorage
export function getCurrentLanguage(pathname) {
  // Check if URL starts with language code
  const langFromUrl = pathname.split('/')[1];
  if (availableLanguages.includes(langFromUrl)) {
    return langFromUrl;
  }

  // Fallback to browser storage or default
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('preferred-language');
    if (stored && availableLanguages.includes(stored)) {
      return stored;
    }
  }

  return defaultLanguage;
}

// Set language preference
export function setLanguagePreference(lang) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', lang);
  }
}

// Get translation function for a specific language
export function useTranslations(lang = defaultLanguage) {
  const currentTranslations = translations[lang] || translations[defaultLanguage];

  return function t(key) {
    const keys = key.split('.');
    let value = currentTranslations;

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };
}

// Helper to get all translations for a language
export function getTranslations(lang = defaultLanguage) {
  return translations[lang] || translations[defaultLanguage];
}

// Helper to check if language is supported
export function isLanguageSupported(lang) {
  return availableLanguages.includes(lang);
}

// Helper to get language display name
export function getLanguageDisplayName(lang) {
  const displayNames = {
    de: 'Deutsch',
    zh: '中文'
  };
  return displayNames[lang] || lang.toUpperCase();
}

// Helper to generate localized URLs
export function getLocalizedUrl(url, lang) {
  // Remove existing language prefix if present
  const cleanUrl = url.replace(/^\/(de|zh)/, '');

  // Add language prefix (except for default language if you prefer)
  if (lang === defaultLanguage) {
    return cleanUrl || '/';
  }

  return `/${lang}${cleanUrl}`;
}

// Aktuelle Sprache ermitteln
export function getPathName(url) {
  return url.endsWith("/") && url.length > 1
      ? url.slice(0, url.length - 1)
      : url;
}