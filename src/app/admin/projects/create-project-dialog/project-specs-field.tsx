"use client";

import { Plus, Trash2 } from "lucide-react";
import { FieldError, FormField, FormInput, FormLabel } from "src/components/form-field";
import { Button } from "src/components/ui/button";
import {
	VisualTabs,
	VisualTabsContent,
	VisualTabsList,
	VisualTabsTrigger,
} from "src/components/ui/visual-tabs";
import { useCreateProjectSpecs } from "./create-project-dialog.state";

/**
 * Client component for managing multilingual project specifications
 * Allows adding and removing specification items with English/Vietnamese support
 */
export function ProjectSpecsField() {
	const { specs, addSpec, removeSpec, updateSpec } = useCreateProjectSpecs();

	return (
		<div className="space-y-4">
			<div className="text-sm font-medium text-foreground">Project Specifications</div>
			<p className="text-xs text-muted-foreground">
				Add project specifications in both English and Vietnamese. Each specification will be
				displayed as a separate item.
			</p>

			<div className="space-y-4">
				{specs.map((spec, index) => (
					<div key={spec.id} className="space-y-3">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-foreground">Specification {index + 1}</span>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => removeSpec(spec.id)}
								className="text-destructive hover:text-destructive"
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
								<FormField
									fieldId={`projectSpecEn-${spec.id}`}
									name={`projectSpecEn-${spec.id}`}
									placeholder="Enter specification in English"
								>
									<FormLabel>Specification (English)</FormLabel>
									<FormInput
										value={spec.en}
										onChange={(e) => updateSpec(spec.id, "en", e.target.value)}
									/>
									<FieldError />
								</FormField>
							</VisualTabsContent>
							<VisualTabsContent value="vi">
								<FormField
									fieldId={`projectSpecVi-${spec.id}`}
									name={`projectSpecVi-${spec.id}`}
									placeholder="Nhập thông số kỹ thuật bằng tiếng Việt"
								>
									<FormLabel>Thông số kỹ thuật (Tiếng Việt)</FormLabel>
									<FormInput
										value={spec.vi}
										onChange={(e) => updateSpec(spec.id, "vi", e.target.value)}
									/>
									<FieldError />
								</FormField>
							</VisualTabsContent>
						</VisualTabs>
					</div>
				))}
			</div>

			<Button type="button" variant="outline" onClick={addSpec} className="w-full">
				<Plus className="mr-2 size-4" />
				Add Specification
			</Button>
		</div>
	);
}
