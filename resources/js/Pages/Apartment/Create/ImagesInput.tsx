import React from "react";
import { Control, FieldPath } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormValues {
	images: (string | File)[];
}
interface Props<T extends FormValues> {
	control: Control<T>;
	error?: string;
}

export default function ImagesInput<T extends FormValues>({
	control,
	error
}: Props<T>) {
	return (
		<FormField
			name={"images" as FieldPath<T>}
			control={control}
			render={({ field }) => {
				return (
					<FormItem>
						<FormLabel>Images</FormLabel>
						<FormControl>
							<Input
								className="w-80"
								type="file"
								accept="image/*"
								onChange={(e) =>
									field.onChange([
										...field.value,
										// @ts-expect-error typescript doesn't understand that fileList is iterable
										...e.target.files
									])
								}
							/>
						</FormControl>
						<FormMessage>{error}</FormMessage>
						<div className="mt-3 flex flex-wrap items-end gap-3">
							{(field.value as (string | File)[]).map(
								(image, index) =>
									image instanceof File ?
										<button
											type="button"
											key={image.name}
											onClick={() =>
												field.onChange(
													(
														field.value as unknown[]
													).filter(
														(_, i) => index != i
													)
												)
											}
										>
											<img
												className={cn(
													"aspect-video w-24 object-cover",
													index === 0 && "w-32"
												)}
												src={URL.createObjectURL(image)}
												alt={image.name}
												key={image.name}
											/>
										</button>
									:	<button
											type="button"
											key={image}
											onClick={() =>
												field.onChange(
													(
														field.value as string[]
													).filter(
														(_, i) => index != i
													)
												)
											}
										>
											<img
												className={cn(
													"aspect-video w-24 object-cover",
													index === 0 && "w-32"
												)}
												src={image}
												alt={image}
												key={image}
											/>
										</button>
							)}
						</div>
					</FormItem>
				);
			}}
		/>
	);
}
