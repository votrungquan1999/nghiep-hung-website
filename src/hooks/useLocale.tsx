import { useParams } from "next/navigation";
import type { Locale } from "src/lib/i18n/config";
import { defaultLocale, locales } from "src/lib/i18n/config";

function isValidLocale(locale: string | string[] | undefined): locale is Locale {
	if (typeof locale === "string") {
		return locales.includes(locale as Locale);
	}

	return false;
}

export default function useLocale(): Locale {
	const params = useParams();

	const locale = params.lang;

	if (!isValidLocale(locale)) {
		return defaultLocale;
	}

	return locale;
}
