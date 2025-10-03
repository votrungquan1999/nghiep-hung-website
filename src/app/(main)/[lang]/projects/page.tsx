import { Suspense } from "react";
import ContactDialog from "src/app/(main)/[lang]/contact/contact-dialog";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import type { Locale } from "src/lib/i18n/config";
import ProjectsPageLoading from "./projects-page-loading";
import ProjectsSectionDatabase from "./projects-section-database";

interface ProjectsPageProps {
	params: Promise<{ lang: Locale }>;
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
