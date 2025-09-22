import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface FeatureCardProps {
	icon: LucideIcon;
	title: string;
	description: string;
}

/**
 * Interactive feature card component that opens a dialog when clicked
 * Displays icon and title in the card, with full description shown in dialog
 */
export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
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
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-3 text-2xl font-serif">
						<div className="inline-flex items-center justify-center size-12 bg-primary/10 rounded-full">
							<Icon className="size-6 text-primary" />
						</div>
						{title}
					</DialogTitle>
				</DialogHeader>
				<div className="mt-6">
					<p className="text-muted-foreground leading-relaxed text-base">{description}</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
