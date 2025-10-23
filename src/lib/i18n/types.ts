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
		quickLinks: string;
		contactInfo: string;
		copyright: string;
	};

	// About section
	about: {
		title: string;
		companyName: string;
		description: string;
		imageAlt: string;
		features: {
			companyHistory: {
				title: string;
				description: string;
			};
			vision: {
				title: string;
				description: string;
			};
			mission: {
				title: string;
				description: string;
			};
			coreValues: {
				title: string;
				description: string;
			};
		};
		commitment: {
			title: string;
			items: string[];
			imageAlt: string;
		};
		timeline: {
			events: Array<{
				year: string;
				title: string;
				description: string;
			}>;
		};
		coreValues: {
			carousel: {
				previous: string;
				next: string;
			};
			values: Array<{
				id: number;
				title: string;
				description: string;
				items: string[];
			}>;
		};
	};

	// Products section
	products: {
		title: string;
		subtitle: string;
		description: string;
		notFound: {
			title: string;
			description: string;
		};
		empty: {
			title: string;
			description: string;
			action: string;
		};
	};

	// Services section
	services: {
		title: string;
		subtitle: string;
		description: string;
		notFound: {
			title: string;
			description: string;
		};
		empty: {
			title: string;
			description: string;
			action: string;
		};
	};

	// Projects section
	projects: {
		title: string;
		subtitle: string;
		description: string;
		notFound: {
			title: string;
			description: string;
		};
		empty: {
			title: string;
			description: string;
			action: string;
		};
		projectDescription: string;
		technicalSpecs: string;
		projectImages: string;
		completionStatus: {
			completed: string;
			inProgress: string;
			planning: string;
		};
	};

	// Contact section
	contact: {
		title: string;
		description: string;
		contactInfo: {
			title: string;
			phone: string;
			email: string;
			address: string;
			workingHours: string;
		};
		socialMedia: {
			title: string;
		};
		form: {
			title: string;
			fields: {
				name: {
					label: string;
					placeholder: string;
				};
				phone: {
					label: string;
					placeholder: string;
					validation: string;
				};
				email: {
					label: string;
					placeholder: string;
				};
				subject: {
					label: string;
					placeholder: string;
				};
				message: {
					label: string;
					placeholder: string;
				};
			};
			submit: string;
		};
		dialog: {
			trigger: string;
		};
	};

	// Hero section
	hero: {
		title: string;
		description: string;
		buttons: {
			viewProducts: string;
			contactConsultation: string;
		};
		features: {
			standardDucts: string;
			fastService: string;
			goodPrice: string;
		};
		experience: {
			years: string;
			label: string;
		};
		imageAlt: string;
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
