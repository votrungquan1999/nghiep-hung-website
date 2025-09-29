"use client";

import { Plus, Trash2 } from "lucide-react";
import { FieldError, FormField, FormHelpText, FormInput } from "src/components/form-field";
import { Button } from "src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "src/components/ui/select";
import { useSocialMediaLinks } from "../contact-context";
import { getSocialMediaPlatform, SOCIAL_MEDIA_PLATFORMS } from "../social-media.config";
import type { SocialMediaLinkInput, SocialMediaPlatformId } from "./social-media.type";

/**
 * Social media form card component
 * Displays and manages social media form using context
 * @returns JSX element displaying social media form card
 */
export function SocialMediaFormCard() {
	const {
		socialMedia,
		addSocialMediaLink,
		removeSocialMediaLink,
		updateSocialMediaPlatform,
		updateSocialMediaUrl,
	} = useSocialMediaLinks();

	/**
	 * Convert social media links to input format for form submission
	 * @returns Array of social media link inputs
	 */
	const getSocialMediaLinksForSubmission = (): SocialMediaLinkInput[] => {
		return socialMedia.map((link) => ({
			platformId: link.platformId,
			url: link.url,
		}));
	};

	/**
	 * Add a new social media link
	 * Only add if there are available platforms
	 */
	const addLink = () => {
		const availablePlatforms = getAvailablePlatforms("new");
		if (availablePlatforms.length > 0) {
			addSocialMediaLink(availablePlatforms[0].id as SocialMediaPlatformId);
		}
	};

	/**
	 * Get available platforms (excluding already selected ones)
	 * @param currentLinkId - ID of current link being edited
	 * @returns Array of available platforms
	 */
	const getAvailablePlatforms = (currentLinkId: string) => {
		const selectedPlatforms = socialMedia
			.filter((link) => link.id !== currentLinkId)
			.map((link) => link.platformId);

		return SOCIAL_MEDIA_PLATFORMS.filter(
			(platform) => !selectedPlatforms.includes(platform.id as SocialMediaPlatformId),
		);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Social Media Links</CardTitle>
				<CardDescription>
					Add and manage social media profiles shown in contact section and footer
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Hidden input for social media links data */}
				<input
					type="hidden"
					name="socialMediaLinks"
					value={JSON.stringify(getSocialMediaLinksForSubmission())}
				/>

				{/* Add Button */}
				<Button
					type="button"
					variant="outline"
					onClick={addLink}
					className="w-full"
					disabled={getAvailablePlatforms("new").length === 0}
				>
					<Plus className="mr-2 size-4" />
					Add Social Media Link
				</Button>

				{/* Links List */}
				<div className="space-y-3">
					{socialMedia.map((link) => {
						const platform = getSocialMediaPlatform(link.platformId);
						const availablePlatforms = getAvailablePlatforms(link.id);

						return (
							<div
								key={link.id}
								className="flex items-center space-x-3 p-3 border rounded-lg bg-card"
							>
								{/* Platform Selector */}
								<div className="flex-shrink-0 w-32">
									<FormField
										fieldId={`socialMedia-${link.id}-platformId`}
										name={`socialMedia-${link.id}-platformId`}
										required
									>
										<Select
											defaultValue={link.platformId}
											onValueChange={(value: string) =>
												updateSocialMediaPlatform(link.id, value as SocialMediaPlatformId)
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{availablePlatforms.map((platform) => {
													const Icon = platform.icon;
													return (
														<SelectItem key={platform.id} value={platform.id}>
															<div className="flex items-center space-x-2">
																<Icon className="size-4" />
																<span>{platform.name}</span>
															</div>
														</SelectItem>
													);
												})}
											</SelectContent>
										</Select>
										<FieldError />
									</FormField>
								</div>

								{/* URL Input */}
								<div className="flex-1">
									<FormField
										fieldId={`socialMedia-${link.id}-url`}
										name={`socialMedia-${link.id}-url`}
										placeholder={platform?.placeholder || "Enter URL"}
										helpText={`Enter your ${platform?.name} URL (e.g., ${platform?.placeholder})`}
									>
										<FormInput
											defaultValue={link.url}
											onChange={(e) => updateSocialMediaUrl(link.id, e.target.value)}
										/>
										<FormHelpText />
										<FieldError />
									</FormField>
								</div>

								{/* Remove Button */}
								<Button
									type="button"
									variant="ghost"
									size="icon"
									onClick={() => removeSocialMediaLink(link.id)}
									className="flex-shrink-0 text-destructive hover:text-destructive"
								>
									<Trash2 className="size-4" />
								</Button>
							</div>
						);
					})}
				</div>

				{/* Empty State */}
				{socialMedia.length === 0 && (
					<div className="text-center py-8 text-muted-foreground">
						<p>No social media links added yet.</p>
						<p className="text-sm">Click "Add Social Media Link" to get started.</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
