import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import LocaleLink from "src/components/behaviors/LocaleLink";
import {
	GalleryBackButton,
	GalleryImage,
	GalleryNextButton,
	GalleryRoot,
} from "src/components/image-gallery";
import { Button } from "src/components/ui/button";
import type { Locale } from "src/lib/i18n/config";
import { getDictionary } from "src/lib/i18n/dictionaries";

interface HeroSectionProps {
	locale: Locale;
}

export default function HeroSection({ locale }: HeroSectionProps) {
	const dictionary = getDictionary(locale);

	const heroImages = [
		{ src: "/Hero-Image.png", alt: dictionary.hero.imageAlt },
		{ src: "/about-gallery-1.jpg", alt: dictionary.hero.imageAlt },
		{ src: "/about-gallery-2.jpg", alt: dictionary.hero.imageAlt },
		{ src: "/about-gallery-3.png", alt: dictionary.hero.imageAlt },
		{ src: "/duct-installation-team.png", alt: dictionary.hero.imageAlt },
	];

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links
		<section
			id="home"
			className="relative bg-gradient-to-br from-background to-accent/20 py-20 lg:py-32"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div>
						<h1
							className="text-4xl lg:text-6xl font-raleway font-black text-foreground mb-6 leading-tight "
							// need to make the text fatter without changing the font
							style={{
								fontStretch: "expanded",
								textShadow: "0.5px 0 0 currentColor, -0.5px 0 0 currentColor",
								transform: "scaleX(1.05)",
								transformOrigin: "left",
							}}
						>
							{dictionary.hero.title}
						</h1>
						<p className="text-xl text-muted-foreground mb-8 leading-relaxed">
							{dictionary.hero.description}
						</p>

						<div className="flex flex-col sm:flex-row gap-4 mb-8">
							<LocaleLink href="/products" className="inline-block">
								<Button size="lg" className="text-lg px-8 w-full">
									{dictionary.hero.buttons.viewProducts}
									<ArrowRight className="ml-2 h-5 w-5" />
								</Button>
							</LocaleLink>
							<LocaleLink href="/contact" className="inline-block">
								<Button variant="outline" size="lg" className="text-lg px-8 bg-transparent w-full">
									{dictionary.hero.buttons.contactConsultation}
								</Button>
							</LocaleLink>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
							<div className="flex items-center">
								<CheckCircle className="h-5 w-5 text-primary mr-2" />
								<span className="text-sm font-medium">
									{dictionary.hero.features.standardDucts}
								</span>
							</div>
							<div className="flex items-center">
								<CheckCircle className="h-5 w-5 text-primary mr-2" />
								<span className="text-sm font-medium">{dictionary.hero.features.fastService}</span>
							</div>
							<div className="flex items-center">
								<CheckCircle className="h-5 w-5 text-primary mr-2" />
								<span className="text-sm font-medium">{dictionary.hero.features.goodPrice}</span>
							</div>
						</div>
					</div>

					<div className="relative group">
						<GalleryRoot images={heroImages} autoCycle={{ intervalMs: 5000 }}>
							<div className="rounded-lg shadow-2xl overflow-hidden">
								<GalleryImage
									aspectRatio="aspect-[3/2]"
									imageClassName="object-cover"
									priority={true}
								/>
								<GalleryBackButton className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
									<ArrowLeft className="h-4 w-4" />
								</GalleryBackButton>
								<GalleryNextButton className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
									<ArrowRight className="h-4 w-4" />
								</GalleryNextButton>
							</div>
						</GalleryRoot>
						<div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg z-10">
							<div className="text-3xl font-bold">{dictionary.hero.experience.years}</div>
							<div className="text-sm">{dictionary.hero.experience.label}</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
