import { Fragment } from "react";
import { Button } from "src/components/ui/button";
import type { Locale } from "src/lib/i18n/config";
import { getDictionary } from "src/lib/i18n/dictionaries";
import { cn } from "src/lib/utils";
import { getActiveProductCategories, PRODUCT_OTHER_CATEGORY } from "src/server/products";
import { ActiveFilterButton, InactiveFilterButton } from "./product-filter-button";
import { PRODUCT_OTHER_ID } from "./product-filter.type";

interface ProductFilterButtonsProps {
	locale: Locale;
	hasUncategorized: boolean;
}

/**
 * Server component that renders filter buttons for product categories.
 * Fetches unique categories from DB; optionally adds an "Other" button
 * for uncategorized products.
 */
export async function ProductFilterButtons({ locale, hasUncategorized }: ProductFilterButtonsProps) {
	const categories = await getActiveProductCategories();
	const dictionary = getDictionary(locale);

	return (
		<div className="flex flex-wrap justify-center gap-2 mb-8">
			{/* All button */}
			<ActiveFilterButton id={null}>
				<Button variant="default" size="sm" className={cn("transition-all shadow-md")}>
					{dictionary.projects.filter.all}
				</Button>
			</ActiveFilterButton>
			<InactiveFilterButton id={null}>
				<Button variant="outline" size="sm" className="transition-all">
					{dictionary.projects.filter.all}
				</Button>
			</InactiveFilterButton>

			{/* Named category buttons */}
			{categories.map((category) => (
				<Fragment key={category.en}>
					<ActiveFilterButton id={category.en}>
						<Button variant="default" size="sm" className={cn("transition-all shadow-md")}>
							{category[locale]}
						</Button>
					</ActiveFilterButton>
					<InactiveFilterButton id={category.en}>
						<Button variant="outline" size="sm" className="transition-all">
							{category[locale]}
						</Button>
					</InactiveFilterButton>
				</Fragment>
			))}

			{/* "Other" button for uncategorized products */}
			{hasUncategorized && (
				<Fragment key={PRODUCT_OTHER_ID}>
					<ActiveFilterButton id={PRODUCT_OTHER_ID}>
						<Button variant="default" size="sm" className={cn("transition-all shadow-md")}>
							{PRODUCT_OTHER_CATEGORY[locale]}
						</Button>
					</ActiveFilterButton>
					<InactiveFilterButton id={PRODUCT_OTHER_ID}>
						<Button variant="outline" size="sm" className="transition-all">
							{PRODUCT_OTHER_CATEGORY[locale]}
						</Button>
					</InactiveFilterButton>
				</Fragment>
			)}
		</div>
	);
}
