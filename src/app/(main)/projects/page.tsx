import { Suspense } from "react";
import ContactDialog from "src/app/(main)/contact/contact-dialog";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import { FeatureFlag, getFeatureFlag } from "src/lib/feature-flag";
import ProjectsPageLoading from "./projects-page-loading";
import ProjectsSection from "./projects-section";
import ProjectsSectionDatabase from "./projects-section-database";

export default function SuspendedProjectsPage() {
	return (
		<Suspense fallback={<ProjectsPageLoading />}>
			<ProjectsPage />
		</Suspense>
	);
}

/**
 * Projects page that conditionally displays static or database content
 * based on the use_database_value feature flag cookie
 */
async function ProjectsPage() {
	// Read the feature flag to determine which projects section to display
	const useDatabaseValue = await getFeatureFlag(FeatureFlag.USE_DATABASE_VALUE, false);

	return (
		<>
			<ScrollToTopHandler />
			{useDatabaseValue ? <ProjectsSectionDatabase /> : <ProjectsSection />}
			<div className="text-center mb-12">
				<ContactDialog />
			</div>
		</>
	);
}
