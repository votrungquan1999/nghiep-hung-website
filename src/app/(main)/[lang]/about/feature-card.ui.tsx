import type { LucideIcon } from "lucide-react";
import type React from "react";
import { Card, CardContent } from "src/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "src/components/ui/dialog";

interface FeatureCardProps {
	icon: LucideIcon;
	title: string;
	description: string;
	customDialogContent?: React.ReactNode;
}

/**
 * Interactive feature card component that opens a dialog when clicked
 * Displays icon and title in the card, with full description shown in dialog
 */
export default function FeatureCard({
	icon: Icon,
	title,
	description,
	customDialogContent,
}: FeatureCardProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Card className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
					<CardContent className="p-8">
						<div className="inline-flex items-center justify-center size-16 bg-primary/10 rounded-full mb-6">
							<Icon className="size-8 text-primary" />
						</div>
						<h3 className="text-xl font-serif font-bold text-foreground">{title}</h3>
					</CardContent>
				</Card>
			</DialogTrigger>
			<DialogContent className="sm:max-w-2xl bg-white p-4 sm:p-6 max-w-[calc(100vw-2rem)]">
				<DialogHeader className="mb-4">
					<DialogTitle className="flex items-center gap-3 text-xl sm:text-2xl font-serif">
						<div className="inline-flex items-center justify-center size-10 sm:size-12 bg-primary/10 rounded-full">
							<Icon className="size-5 sm:size-6 text-primary" />
						</div>
						{title}
					</DialogTitle>
				</DialogHeader>
				<div className="mt-2">
					{customDialogContent || (
						<p className="text-muted-foreground leading-relaxed text-base">{description}</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
