import { ArrowLeft, ArrowRight, Award, Target, Users, Wrench } from "lucide-react";
import Image from "next/image";
import {
	GalleryBackButton,
	GalleryImage,
	GalleryNextButton,
	GalleryRoot,
} from "src/components/image-gallery";
import type { Locale } from "src/lib/i18n/config";
import { getDictionary } from "src/lib/i18n/dictionaries";
import { CompanyHistoryTimeline } from "./company-history-timeline";
import { CoreValuesCarousel } from "./core-values-carousel";
import FeatureCard from "./feature-card.ui";

/**
 * About section component that displays company overview with interactive feature cards
 * Each feature card opens a dialog when clicked to show detailed description
 * @param locale - The current locale for internationalization
 */
export default function AboutSection({ locale }: { locale: Locale }) {
	const dictionary = getDictionary(locale);

	// About gallery images array with 3 images
	const aboutImages = [
		{
			src: "/about-gallery-1.jpg",
			alt: dictionary.about.imageAlt,
		},
		{
			src: "/about-gallery-2.jpg",
			alt: dictionary.about.imageAlt,
		},
		{
			src: "/about-gallery-3.png",
			alt: dictionary.about.imageAlt,
		},
	];

	const features = [
		{
			icon: Users,
			title: dictionary.about.features.companyHistory.title,
			description: dictionary.about.features.companyHistory.description,
			customDialogContent: <CompanyHistoryTimeline locale={locale} />,
		},
		{
			icon: Target,
			title: dictionary.about.features.vision.title,
			description: dictionary.about.features.vision.description,
		},
		{
			icon: Award,
			title: dictionary.about.features.mission.title,
			description: dictionary.about.features.mission.description,
		},
		{
			icon: Wrench,
			title: dictionary.about.features.coreValues.title,
			description: dictionary.about.features.coreValues.description,
			customDialogContent: <CoreValuesCarousel locale={locale} />,
		},
	];

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links
		<section id="about" className="bg-muted/30">
			{/* About image gallery - full width */}
			<div className="relative">
				<GalleryRoot images={aboutImages} autoCycle={{ intervalMs: 3000 }}>
					<GalleryImage
						containerClassName="w-full h-64 lg:h-[400px] rounded-lg"
						imageClassName="object-cover"
						aspectRatio="aspect-[16/9]"
						priority={true}
					/>

					{/* Navigation buttons */}
					<GalleryBackButton className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white">
						<ArrowLeft className="h-4 w-4" />
					</GalleryBackButton>
					<GalleryNextButton className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white">
						<ArrowRight className="h-4 w-4" />
					</GalleryNextButton>
				</GalleryRoot>
			</div>

			<div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
						{dictionary.about.title}{" "}
						<span className="text-primary">{dictionary.about.companyName}</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						{dictionary.about.description}
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* <CarouselRoot className=""> */}
					{features.map((feature) => (
						<FeatureCard
							key={feature.title}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
							customDialogContent={feature.customDialogContent}
						/>
					))}
					{/* </CarouselRoot> */}
				</div>

				<div className="mt-16 bg-card rounded-2xl p-8 lg:p-12 shadow-lg">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							<h3 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-6">
								{dictionary.about.commitment.title}
							</h3>
							<div className="space-y-4">
								{dictionary.about.commitment.items.map((item: string, index: number) => (
									<div
										key={`commitment-item-${item.slice(0, 20).replace(/\s+/g, "-")}-${index}`}
										className="flex items-start"
									>
										<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
										<p className="text-muted-foreground">{item}</p>
									</div>
								))}
							</div>
						</div>
						<div>
							<Image
								src="/duct-installation-team.png"
								alt={dictionary.about.commitment.imageAlt}
								width={600}
								height={400}
								className="rounded-lg shadow-lg"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
