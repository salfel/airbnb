import { Control } from "react-hook-form";
import { FormValues } from "@/Pages/Apartment/Create";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props {
	control: Control<FormValues>;
	error?: string;
}

export default function ImagesInput({ control, error }: Props) {
	return (
		<FormField
			name="images"
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
							{field.value.map((image, index) => (
								<button
									type="button"
									key={image.name}
									onClick={() =>
										field.onChange(
											field.value.filter(
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
							))}
						</div>
					</FormItem>
				);
			}}
		/>
	);
}
