import {
	Camera,
	Facebook,
	Instagram,
	Linkedin,
	MessageCircle,
	Phone,
	Share2,
	Twitter,
	Users,
	Video,
	Youtube,
} from "lucide-react";
import { Zalo } from "src/components/ui/zalo-icon";

/**
 * Configuration for supported social media platforms
 * Each platform includes display name, icon, placeholder URL, and validation pattern
 */
export interface SocialMediaPlatform {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	placeholder: string;
	urlPattern: RegExp;
	color: string;
}

export const SOCIAL_MEDIA_PLATFORMS: SocialMediaPlatform[] = [
	{
		id: "facebook",
		name: "Facebook",
		icon: Facebook,
		placeholder: "https://facebook.com/yourpage",
		urlPattern: /^https?:\/\/(www\.)?facebook\.com\/.+/,
		color: "text-blue-600",
	},
	{
		id: "youtube",
		name: "YouTube",
		icon: Youtube,
		placeholder: "https://youtube.com/yourchannel",
		urlPattern: /^https?:\/\/(www\.)?youtube\.com\/(channel\/|c\/|@).+/,
		color: "text-red-600",
	},
	{
		id: "linkedin",
		name: "LinkedIn",
		icon: Linkedin,
		placeholder: "https://linkedin.com/company/yourcompany",
		urlPattern: /^https?:\/\/(www\.)?linkedin\.com\/(company\/|in\/).+/,
		color: "text-blue-700",
	},
	{
		id: "instagram",
		name: "Instagram",
		icon: Instagram,
		placeholder: "https://instagram.com/yourprofile",
		urlPattern: /^https?:\/\/(www\.)?instagram\.com\/.+/,
		color: "text-pink-600",
	},
	{
		id: "twitter",
		name: "Twitter/X",
		icon: Twitter,
		placeholder: "https://twitter.com/yourhandle",
		urlPattern: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.+/,
		color: "text-slate-600",
	},
	{
		id: "tiktok",
		name: "TikTok",
		icon: Video,
		placeholder: "https://tiktok.com/@yourhandle",
		urlPattern: /^https?:\/\/(www\.)?tiktok\.com\/@.+/,
		color: "text-black",
	},
	{
		id: "pinterest",
		name: "Pinterest",
		icon: Camera,
		placeholder: "https://pinterest.com/yourprofile",
		urlPattern: /^https?:\/\/(www\.)?pinterest\.com\/.+/,
		color: "text-red-500",
	},
	{
		id: "whatsapp",
		name: "WhatsApp",
		icon: MessageCircle,
		placeholder: "https://wa.me/yournumber",
		urlPattern: /^https?:\/\/(wa\.me|api\.whatsapp\.com)\/.+/,
		color: "text-green-600",
	},
	{
		id: "telegram",
		name: "Telegram",
		icon: MessageCircle,
		placeholder: "https://t.me/yourchannel",
		urlPattern: /^https?:\/\/(www\.)?t\.me\/.+/,
		color: "text-blue-500",
	},
	{
		id: "zalo",
		name: "Zalo",
		icon: Zalo,
		placeholder: "https://zalo.me/yournumber",
		urlPattern: /^https?:\/\/(www\.)?zalo\.me\/.+/,
		color: "text-blue-500",
	},
	{
		id: "skype",
		name: "Skype",
		icon: Phone,
		placeholder: "https://skype.com/yourprofile",
		urlPattern: /^https?:\/\/(www\.)?skype\.com\/.+/,
		color: "text-blue-500",
	},
	{
		id: "discord",
		name: "Discord",
		icon: Users,
		placeholder: "https://discord.gg/yourserver",
		urlPattern: /^https?:\/\/(www\.)?discord\.(gg|com)\/.+/,
		color: "text-indigo-600",
	},
	{
		id: "twitch",
		name: "Twitch",
		icon: Video,
		placeholder: "https://twitch.tv/yourchannel",
		urlPattern: /^https?:\/\/(www\.)?twitch\.tv\/.+/,
		color: "text-purple-600",
	},
	{
		id: "snapchat",
		name: "Snapchat",
		icon: Camera,
		placeholder: "https://snapchat.com/add/yourusername",
		urlPattern: /^https?:\/\/(www\.)?snapchat\.com\/add\/.+/,
		color: "text-yellow-500",
	},
	{
		id: "reddit",
		name: "Reddit",
		icon: Share2,
		placeholder: "https://reddit.com/user/yourusername",
		urlPattern: /^https?:\/\/(www\.)?reddit\.com\/user\/.+/,
		color: "text-orange-600",
	},
];

/**
 * Get platform configuration by ID
 */
export function getSocialMediaPlatform(id: string): SocialMediaPlatform | undefined {
	return SOCIAL_MEDIA_PLATFORMS.find((platform) => platform.id === id);
}

/**
 * Get all available platform IDs
 */
export function getAvailablePlatformIds(): string[] {
	return SOCIAL_MEDIA_PLATFORMS.map((platform) => platform.id);
}

/**
 * Validate URL for a specific platform
 */
export function validateSocialMediaUrl(platformId: string, url: string): boolean {
	const platform = getSocialMediaPlatform(platformId);
	if (!platform) return false;
	return platform.urlPattern.test(url);
}
