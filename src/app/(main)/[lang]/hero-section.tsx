import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import LocaleLink from "src/components/behaviors/LocaleLink";
import { Button } from "src/components/ui/button";
import type { Locale } from "src/lib/i18n/config";
import { getDictionary } from "src/lib/i18n/dictionaries";

interface HeroSectionProps {
	locale: Locale;
}

export default function HeroSection({ locale }: HeroSectionProps) {
	const dictionary = getDictionary(locale);
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links
		<section
			id="home"
			className="relative bg-gradient-to-br from-background to-accent/20 py-20 lg:py-32"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div>
						<h1 className="text-4xl lg:text-6xl font-serif font-black text-foreground mb-6 leading-tight">
							{dictionary.hero.title}{" "}
							<span className="text-primary">{dictionary.hero.titleHighlight}</span>
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

					<div className="relative">
						<Image
							src="/Hero-Image.png"
							alt={dictionary.hero.imageAlt}
							width={600}
							height={400}
							className="rounded-lg shadow-2xl"
							loading="eager"
						/>
						<div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
							<div className="text-3xl font-bold">{dictionary.hero.experience.years}</div>
							<div className="text-sm">{dictionary.hero.experience.label}</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
