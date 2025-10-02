import { Suspense } from "react";
import ContactDialog from "src/app/(main)/contact/contact-dialog";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import ProjectsPageLoading from "./projects-page-loading";
import ProjectsSectionDatabase from "./projects-section-database";

export default function SuspendedProjectsPage() {
	return (
		<Suspense fallback={<ProjectsPageLoading />}>
			<ProjectsPage />
		</Suspense>
	);
}

/**
 * Projects page that displays database content
 * Always uses database data instead of static content
 */
async function ProjectsPage() {
	return (
		<>
			<ScrollToTopHandler />
			<ProjectsSectionDatabase />
			<div className="text-center mb-12">
				<ContactDialog />
			</div>
		</>
	);
}
