import type { Metadata } from "next";
import { Suspense } from "react";
import ContactDialog from "src/app/(main)/[lang]/contact/contact-dialog";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import type { Locale } from "src/lib/i18n/config";
import { generateProjectsMetadata } from "src/lib/seo/metadata";
import ProjectsPageLoading from "./projects-page-loading";
import ProjectsSectionDatabase from "./projects-section-database";

interface ProjectsPageProps {
	params: Promise<{ lang: Locale }>;
}

/**
 * Generate metadata for projects page
 * @param params - Route parameters including locale
 * @returns Metadata object
 */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
	const { lang: locale } = await params;
	return generateProjectsMetadata(locale);
}

export default function SuspendedProjectsPage({ params }: ProjectsPageProps) {
	return (
		<Suspense fallback={<ProjectsPageLoading />}>
			<ProjectsPage params={params} />
		</Suspense>
	);
}

/**
 * Projects page that displays database content
 * Always uses database data instead of static content
 * @param params - Route parameters including the language locale
 */
async function ProjectsPage({ params }: ProjectsPageProps) {
	const { lang: locale } = await params;

	return (
		<>
			<ScrollToTopHandler />
			<ProjectsSectionDatabase locale={locale} />
			<div className="text-center mb-12">
				<ContactDialog locale={locale} />
			</div>
		</>
	);
}
