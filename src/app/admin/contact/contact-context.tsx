"use client";

import { createReducerContext } from "src/contexts/createReducerContext";
import type { ContactInfo } from "./contact.type";
import type { SocialMediaLink, SocialMediaPlatformId } from "./social-media/social-media.type";

interface ContactState {
	contactInfo: ContactInfo;
}

type ContactAction =
	| { type: "SET_CONTACT_INFO"; payload: { contactInfo: ContactInfo } }
	| { type: "UPDATE_PHONE1"; payload: { phone1: string } }
	| { type: "UPDATE_PHONE2"; payload: { phone2: string } }
	| { type: "UPDATE_EMAIL1"; payload: { email1: string } }
	| { type: "UPDATE_EMAIL2"; payload: { email2: string } }
	| { type: "UPDATE_ADDRESS"; payload: { address: string } }
	| { type: "UPDATE_WORKING_HOURS_EN"; payload: { en: string } }
	| { type: "UPDATE_WORKING_HOURS_VI"; payload: { vi: string } }
	| { type: "ADD_SOCIAL_MEDIA_LINK"; payload: { platformId: SocialMediaPlatformId } }
	| { type: "REMOVE_SOCIAL_MEDIA_LINK"; payload: { linkId: string } }
	| {
			type: "UPDATE_SOCIAL_MEDIA_PLATFORM";
			payload: { linkId: string; platformId: SocialMediaPlatformId };
	  }
	| { type: "UPDATE_SOCIAL_MEDIA_URL"; payload: { linkId: string; url: string } }
	| { type: "SET_SOCIAL_MEDIA_LINKS"; payload: { links: SocialMediaLink[] } };

const initialContactInfo: ContactInfo = {
	phone1: "",
	phone2: "",
	email1: "",
	email2: "",
	address: "",
	workingHours: {
		en: "Monday - Friday: 8:00 AM - 5:30 PM | Saturday: 8:00 AM - 12:00 PM",
		vi: "Thứ 2 - Thứ 6: 08:00 - 17:30 | Thứ 7: 08:00 - 12:00",
	},
	socialMedia: [],
};

const initialState: ContactState = {
	contactInfo: initialContactInfo,
};

/**
 * Reducer function for contact state management
 * @param state - Current contact state
 * @param action - Action to perform on the state
 * @returns Updated contact state
 */
function contactReducer(state: ContactState, action: ContactAction): ContactState {
	switch (action.type) {
		case "SET_CONTACT_INFO":
			return {
				...state,
				contactInfo: action.payload.contactInfo,
			};

		case "UPDATE_PHONE1":
			return {
				...state,
				contactInfo: {
					...state.contactInfo,
					phone1: action.payload.phone1,
				},
			};

		case "UPDATE_PHONE2":
			return {
				...state,
				contactInfo: {
					...state.contactInfo,
					phone2: action.payload.phone2,
				},
			};

		case "UPDATE_EMAIL1":
			return {
				...state,
				contactInfo: {
					...state.contactInfo,
					email1: action.payload.email1,
				},
			};

		case "UPDATE_EMAIL2":
			return {
				...state,
				contactInfo: {
					...state.contactInfo,
					email2: action.payload.email2,
				},
			};

		case "UPDATE_ADDRESS":
			return {
				...state,
				contactInfo: {
					...state.contactInfo,
					address: action.payload.address,
				},
			};

		case "UPDATE_WORKING_HOURS_EN":
			return {
				...state,
				contactInfo: {
					...state.contactInfo,
					workingHours: {
						...state.contactInfo.workingHours,
						en: action.payload.en,
					},
				},
			};

		case "UPDATE_WORKING_HOURS_VI":
			return {
				...state,
				contactInfo: {
					...state.contactInfo,
					workingHours: {
						...state.contactInfo.workingHours,
						vi: action.payload.vi,
					},
				},
			};

		case "ADD_SOCIAL_MEDIA_LINK":
			return {
				...state,
				contactInfo: {
					...state.contactInfo,
					socialMedia: [
						...state.contactInfo.socialMedia,
						{
							id: `link-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
							platformId: action.payload.platformId,
							url: "",
						},
					],
				},
			};

		case "REMOVE_SOCIAL_MEDIA_LINK":
			return {
				...state,
				contactInfo: {
					...state.contactInfo,
					socialMedia: state.contactInfo.socialMedia.filter(
						(link) => link.id !== action.payload.linkId,
					),
				},
			};

		case "UPDATE_SOCIAL_MEDIA_PLATFORM":
			return {
				...state,
				contactInfo: {
					...state.contactInfo,
					socialMedia: state.contactInfo.socialMedia.map((link) =>
						link.id === action.payload.linkId
							? { ...link, platformId: action.payload.platformId, url: "" }
							: link,
					),
				},
			};

		case "UPDATE_SOCIAL_MEDIA_URL":
			return {
				...state,
				contactInfo: {
					...state.contactInfo,
					socialMedia: state.contactInfo.socialMedia.map((link) =>
						link.id === action.payload.linkId ? { ...link, url: action.payload.url } : link,
					),
				},
			};

		case "SET_SOCIAL_MEDIA_LINKS":
			return {
				...state,
				contactInfo: {
					...state.contactInfo,
					socialMedia: action.payload.links,
				},
			};

		default:
			return state;
	}
}

const [ContactProviderBase, useContactStateRaw, useContactDispatch] = createReducerContext(
	contactReducer,
	initialState,
);

/**
 * Provider component for contact information state management
 * Accepts initial contact info data directly as props
 * @param props - Component props
 * @returns JSX element providing contact context
 */
export function ContactProvider({
	children,
	contactInfo = initialContactInfo,
}: {
	children: React.ReactNode;
	contactInfo?: ContactInfo;
}) {
	return <ContactProviderBase contactInfo={contactInfo}>{children}</ContactProviderBase>;
}

/**
 * Hook to access contact information
 * @returns Contact information object
 */
export function useContactInfo() {
	const state = useContactStateRaw();
	return state.contactInfo;
}

/**
 * Hook to access phone numbers data and actions
 * @returns Object containing phone numbers and related actions
 */
export function usePhoneNumbers() {
	const state = useContactStateRaw();
	const dispatch = useContactDispatch();

	return {
		phone1: state.contactInfo.phone1,
		phone2: state.contactInfo.phone2,
		updatePhone1: (phone1: string) => {
			dispatch({ type: "UPDATE_PHONE1", payload: { phone1 } });
		},
		updatePhone2: (phone2: string) => {
			dispatch({ type: "UPDATE_PHONE2", payload: { phone2 } });
		},
	};
}

/**
 * Hook to access email addresses data and actions
 * @returns Object containing email addresses and related actions
 */
export function useEmailAddresses() {
	const state = useContactStateRaw();
	const dispatch = useContactDispatch();

	return {
		email1: state.contactInfo.email1,
		email2: state.contactInfo.email2,
		updateEmail1: (email1: string) => {
			dispatch({ type: "UPDATE_EMAIL1", payload: { email1 } });
		},
		updateEmail2: (email2: string) => {
			dispatch({ type: "UPDATE_EMAIL2", payload: { email2 } });
		},
	};
}

/**
 * Hook to access address data and actions
 * @returns Object containing address and related actions
 */
export function useAddress() {
	const state = useContactStateRaw();
	const dispatch = useContactDispatch();

	return {
		address: state.contactInfo.address,
		updateAddress: (address: string) => {
			dispatch({ type: "UPDATE_ADDRESS", payload: { address } });
		},
	};
}

/**
 * Hook to access working hours data and actions
 * @returns Object containing working hours and related actions
 */
export function useWorkingHours() {
	const state = useContactStateRaw();
	const dispatch = useContactDispatch();

	return {
		workingHours: state.contactInfo.workingHours,
		updateWorkingHoursEn: (en: string) => {
			dispatch({ type: "UPDATE_WORKING_HOURS_EN", payload: { en } });
		},
		updateWorkingHoursVi: (vi: string) => {
			dispatch({ type: "UPDATE_WORKING_HOURS_VI", payload: { vi } });
		},
	};
}

/**
 * Hook to access social media links data and actions
 * @returns Object containing social media links and related actions
 */
export function useSocialMediaLinks() {
	const state = useContactStateRaw();
	const dispatch = useContactDispatch();

	return {
		socialMedia: state.contactInfo.socialMedia,
		addSocialMediaLink: (platformId: SocialMediaPlatformId) => {
			dispatch({ type: "ADD_SOCIAL_MEDIA_LINK", payload: { platformId } });
		},
		removeSocialMediaLink: (linkId: string) => {
			dispatch({ type: "REMOVE_SOCIAL_MEDIA_LINK", payload: { linkId } });
		},
		updateSocialMediaPlatform: (linkId: string, platformId: SocialMediaPlatformId) => {
			dispatch({ type: "UPDATE_SOCIAL_MEDIA_PLATFORM", payload: { linkId, platformId } });
		},
		updateSocialMediaUrl: (linkId: string, url: string) => {
			dispatch({ type: "UPDATE_SOCIAL_MEDIA_URL", payload: { linkId, url } });
		},
		setSocialMediaLinks: (links: SocialMediaLink[]) => {
			dispatch({ type: "SET_SOCIAL_MEDIA_LINKS", payload: { links } });
		},
	};
}

/**
 * Hook to access general contact actions
 * @returns Object containing general contact actions
 */
export function useContactActions() {
	const dispatch = useContactDispatch();

	return {
		setContactInfo: (contactInfo: ContactInfo) => {
			dispatch({ type: "SET_CONTACT_INFO", payload: { contactInfo } });
		},
	};
}

/**
 * Combined hook for backward compatibility
 * @deprecated Use useContactInfo and useContactActions instead
 */
export function useContact() {
	const contactInfo = useContactInfo();
	const actions = useContactActions();
	return { contactInfo, actions };
}
