/**
 * Type definitions for internationalization
 */

import type { Locale } from "./config";

/**
 * Dictionary structure for translations
 */
export interface Dictionary {
	// Navigation
	nav: {
		home: string;
		about: string;
		products: string;
		services: string;
		projects: string;
		contact: string;
		privacyPolicy: string;
	};

	// Common UI elements
	common: {
		loading: string;
		error: string;
		success: string;
		cancel: string;
		confirm: string;
		save: string;
		edit: string;
		delete: string;
		close: string;
		back: string;
		next: string;
		previous: string;
		search: string;
		filter: string;
		sort: string;
		view: string;
		readMore: string;
		showLess: string;
	};

	// Forms
	form: {
		required: string;
		invalidEmail: string;
		invalidPhone: string;
		minLength: string;
		maxLength: string;
		submit: string;
		submitting: string;
		success: string;
		error: string;
	};

	// Footer
	footer: {
		companyName: string;
		description: string;
		address: string;
		phone: string;
		email: string;
		copyright: string;
		allRightsReserved: string;
	};

	// Meta information
	meta: {
		title: string;
		description: string;
		keywords: string;
	};
}

/**
 * Dictionary type for specific locale
 */
export type DictionaryForLocale = Record<Locale, Dictionary>;

/**
 * Translation function type
 */
export type TranslationFunction = (key: string, params?: Record<string, string | number>) => string;

/**
 * Locale context type
 */
export interface LocaleContextType {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	t: TranslationFunction;
	dictionary: Dictionary;
}
