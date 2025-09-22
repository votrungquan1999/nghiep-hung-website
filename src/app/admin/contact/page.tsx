import {
	Clock,
	Facebook,
	Globe,
	Instagram,
	Mail,
	MapPin,
	Phone,
	Save,
	Youtube,
} from "lucide-react";
import { Button } from "src/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "src/components/ui/card";
import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";

/**
 * Contact info management page
 * Static version for UI assessment
 * Updates contact details, social media links, and working hours
 */
export default async function ContactPage() {
	// Mock data for UI demonstration
	const mockContactInfo = {
		companyName: "Nghiệp Hưng Air Duct Solutions",
		address: "123 Industrial Zone, District 12, Ho Chi Minh City, Vietnam",
		phone: "+84 28 1234 5678",
		email: "info@nghiephung.com",
		website: "https://nghiephung.com",
		workingHours: {
			weekdays: "8:00 AM - 6:00 PM",
			weekends: "9:00 AM - 4:00 PM",
			holidays: "Closed",
		},
		socialMedia: {
			facebook: "https://facebook.com/nghiephung",
			instagram: "https://instagram.com/nghiephung",
			youtube: "https://youtube.com/nghiephung",
		},
		description:
			"Leading provider of air duct solutions for residential, commercial, and industrial applications in Vietnam.",
	};

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Section Header and Action Bar */}
			<div className="flex items-center justify-between mb-6">
				{/* Section Header */}
				<div className="flex items-center space-x-4">
					<div className="p-2 rounded-lg bg-primary/10">
						<Phone className="size-6 text-primary" />
					</div>
					<div>
						<h1 className="text-2xl font-serif font-bold text-foreground">{"Contact"}</h1>
						<p className="text-muted-foreground">{"Update contact information"}</p>
					</div>
				</div>

				{/* Save Button */}
				<form>
					<Button type="submit">
						<Save className="mr-2 size-4" />
						{"Save Changes"}
					</Button>
				</form>
			</div>
			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<Card className="border-l-4 border-l-blue-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-blue-600">{"1"}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">
									{"Company Profile"}
								</p>
							</div>
							<div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
								<Phone className="size-8 text-blue-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-green-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-green-600">{"3"}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">
									{"Contact Methods"}
								</p>
							</div>
							<div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
								<Phone className="size-8 text-green-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-yellow-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-yellow-600">{"3"}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Working Hours"}</p>
							</div>
							<div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
								<Clock className="size-8 text-yellow-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-purple-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-purple-600">{"3"}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Social Media"}</p>
							</div>
							<div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
								<Facebook className="size-8 text-purple-600" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
			<form>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Company Information */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Globe className="size-5" />
								<span>{"Company Information"}</span>
							</CardTitle>
							<CardDescription>{"Basic company details and contact information"}</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<div className="text-sm font-medium">{"Company Name"}</div>
								<Input
									defaultValue={mockContactInfo.companyName}
									placeholder="Enter company name"
								/>
							</div>
							<div className="space-y-2">
								<div className="text-sm font-medium">{"Description"}</div>
								<Textarea
									defaultValue={mockContactInfo.description}
									placeholder="Enter company description"
									rows={3}
								/>
							</div>
							<div className="space-y-2">
								<div className="text-sm font-medium">{"Website"}</div>
								<Input defaultValue={mockContactInfo.website} placeholder="https://example.com" />
							</div>
						</CardContent>
					</Card>

					{/* Contact Details */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Phone className="size-5" />
								<span>{"Contact Details"}</span>
							</CardTitle>
							<CardDescription>{"Phone, email, and address information"}</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<div className="text-sm font-medium">{"Phone Number"}</div>
								<Input defaultValue={mockContactInfo.phone} placeholder="+84 28 1234 5678" />
							</div>
							<div className="space-y-2">
								<div className="text-sm font-medium">{"Email Address"}</div>
								<Input
									defaultValue={mockContactInfo.email}
									placeholder="info@company.com"
									type="email"
								/>
							</div>
							<div className="space-y-2">
								<div className="text-sm font-medium">{"Address"}</div>
								<Textarea
									defaultValue={mockContactInfo.address}
									placeholder="Enter full address"
									rows={3}
								/>
							</div>
						</CardContent>
					</Card>

					{/* Working Hours */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Clock className="size-5" />
								<span>{"Working Hours"}</span>
							</CardTitle>
							<CardDescription>{"Business hours and availability"}</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<div className="text-sm font-medium">{"Weekdays"}</div>
								<Input
									defaultValue={mockContactInfo.workingHours.weekdays}
									placeholder="8:00 AM - 6:00 PM"
								/>
							</div>
							<div className="space-y-2">
								<div className="text-sm font-medium">{"Weekends"}</div>
								<Input
									defaultValue={mockContactInfo.workingHours.weekends}
									placeholder="9:00 AM - 4:00 PM"
								/>
							</div>
							<div className="space-y-2">
								<div className="text-sm font-medium">{"Holidays"}</div>
								<Input
									defaultValue={mockContactInfo.workingHours.holidays}
									placeholder="Closed or special hours"
								/>
							</div>
						</CardContent>
					</Card>

					{/* Social Media */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Facebook className="size-5" />
								<span>{"Social Media Links"}</span>
							</CardTitle>
							<CardDescription>{"Social media profiles and links"}</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<div className="text-sm font-medium flex items-center space-x-2">
									<Facebook className="size-4" />
									<span>{"Facebook"}</span>
								</div>
								<Input
									defaultValue={mockContactInfo.socialMedia.facebook}
									placeholder="https://facebook.com/yourpage"
								/>
							</div>
							<div className="space-y-2">
								<div className="text-sm font-medium flex items-center space-x-2">
									<Instagram className="size-4" />
									<span>{"Instagram"}</span>
								</div>
								<Input
									defaultValue={mockContactInfo.socialMedia.instagram}
									placeholder="https://instagram.com/yourpage"
								/>
							</div>
							<div className="space-y-2">
								<div className="text-sm font-medium flex items-center space-x-2">
									<Youtube className="size-4" />
									<span>{"YouTube"}</span>
								</div>
								<Input
									defaultValue={mockContactInfo.socialMedia.youtube}
									placeholder="https://youtube.com/yourchannel"
								/>
							</div>
						</CardContent>
					</Card>
				</div>
			</form>

			{/* Preview Section */}
			<Card className="mt-8">
				<CardHeader>
					<CardTitle>{"Preview"}</CardTitle>
					<CardDescription>
						{"How your contact information will appear on the website"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="bg-muted/50 p-6 rounded-lg space-y-4">
						<div className="text-center space-y-2">
							<h3 className="text-xl font-semibold">{mockContactInfo.companyName}</h3>
							<p className="text-muted-foreground">{mockContactInfo.description}</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<Phone className="size-4" />
									<span>{mockContactInfo.phone}</span>
								</div>
								<div className="flex items-center space-x-2">
									<Mail className="size-4" />
									<span>{mockContactInfo.email}</span>
								</div>
								<div className="flex items-center space-x-2">
									<MapPin className="size-4" />
									<span>{mockContactInfo.address}</span>
								</div>
							</div>
							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<Clock className="size-4" />
									<span>
										{"Weekdays: "}
										{mockContactInfo.workingHours.weekdays}
									</span>
								</div>
								<div className="flex items-center space-x-2">
									<Clock className="size-4" />
									<span>
										{"Weekends: "}
										{mockContactInfo.workingHours.weekends}
									</span>
								</div>
								<div className="flex items-center space-x-2">
									<Globe className="size-4" />
									<span>{mockContactInfo.website}</span>
								</div>
							</div>
						</div>
						<div className="flex justify-center space-x-4 pt-4">
							<Button variant="outline" size="sm">
								<Facebook className="mr-2 size-4" />
								{"Facebook"}
							</Button>
							<Button variant="outline" size="sm">
								<Instagram className="mr-2 size-4" />
								{"Instagram"}
							</Button>
							<Button variant="outline" size="sm">
								<Youtube className="mr-2 size-4" />
								{"YouTube"}
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
