"use client";

import { Button } from "src/components/ui/button";
import { useContactInfo } from "../contact-context";
import { getSocialMediaPlatform } from "../social-media.config";

/**
 * Social media preview component for contact section
 * Shows how social media links will appear in the contact section
 * @returns JSX element displaying social media links preview for contact section
 */
export function SocialMediaContactPreview() {
	const contactInfo = useContactInfo();
	const validLinks = contactInfo.socialMedia.filter((link) => link.url && link.url.trim() !== "");

	if (validLinks.length === 0) {
		return <div className="text-muted-foreground text-sm">No social media links configured</div>;
	}

	return (
		<div className="grid grid-cols-auto gap-2">
			{validLinks.map((link) => {
				const platform = getSocialMediaPlatform(link.platformId);
				if (!platform) return null;

				const Icon = platform.icon;

				return (
					<Button
						key={link.id}
						variant="outline"
						size="icon"
						asChild
						className="hover:scale-105 transition-transform"
					>
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Visit our ${platform.name} page`}
						>
							<Icon className="size-5" />
						</a>
					</Button>
				);
			})}
		</div>
	);
}
