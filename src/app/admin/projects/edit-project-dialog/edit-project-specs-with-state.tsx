"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import {
	VisualTabs,
	VisualTabsContent,
	VisualTabsList,
	VisualTabsTrigger,
} from "src/components/ui/visual-tabs";
import type { MultilingualText } from "src/lib/types/common.type";
import { useEditProjectSpecs } from "./edit-project-specs.state";

interface EditProjectSpecsWithStateProps {
	initialSpecs: MultilingualText[];
}

/**
 * Client component for managing project specifications with state
 * Allows adding, removing, and editing specs in both languages
 * @param initialSpecs - Initial specifications to populate the form
 */
export function EditProjectSpecsWithState({ initialSpecs }: EditProjectSpecsWithStateProps) {
	const { specs, addSpec, removeSpec, updateSpec } = useEditProjectSpecs(initialSpecs);

	return (
		<div className="space-y-4">
			{/* Existing Specs */}
			{specs.map((spec, index) => (
				<div key={spec.id} className="border rounded-lg p-4 space-y-4">
					<div className="flex items-center justify-between">
						<h4 className="text-sm font-medium">Specification {index + 1}</h4>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => removeSpec(spec.id)}
							className="h-8 w-8 p-0"
						>
							<Trash2 className="size-4" />
						</Button>
					</div>

					<VisualTabs defaultValue="en" className="w-full">
						<VisualTabsList className="grid w-full grid-cols-2">
							<VisualTabsTrigger value="en">English</VisualTabsTrigger>
							<VisualTabsTrigger value="vi">Tiếng Việt</VisualTabsTrigger>
						</VisualTabsList>
						<VisualTabsContent value="en">
							<Input
								name={`specEn_${index}`}
								placeholder="Enter specification in English"
								value={spec.en}
								onChange={(e) => updateSpec(spec.id, "en", e.target.value)}
							/>
						</VisualTabsContent>
						<VisualTabsContent value="vi">
							<Input
								name={`specVi_${index}`}
								placeholder="Nhập đặc điểm kỹ thuật bằng tiếng Việt"
								value={spec.vi}
								onChange={(e) => updateSpec(spec.id, "vi", e.target.value)}
							/>
						</VisualTabsContent>
					</VisualTabs>
				</div>
			))}

			{/* Add New Spec Button */}
			<Button type="button" variant="outline" onClick={addSpec} className="w-full">
				<Plus className="mr-2 size-4" />
				Add Specification
			</Button>
		</div>
	);
}
