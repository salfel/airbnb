import * as React from "react";
import { useRef, useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PiCaretUpDown } from "react-icons/pi";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem
} from "@/components/ui/command";
import countries from "@/constants/countries";
import { MdCheck } from "react-icons/md";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Control, FieldPath } from "react-hook-form";

interface FormValues {
	country: string;
}

interface CountryInputProps<T extends FormValues> {
	control: Control<T>;
	error?: string;
}

export default function CountryInput<T extends FormValues>({
	control,
	error
}: CountryInputProps<T>) {
	return (
		<FormField
			control={control}
			name={"country" as FieldPath<T>}
			render={({ field }) => {
				const [open, setOpen] = useState(false);
				const containerRef = useRef<HTMLDivElement>(null);

				function scrollToSelected() {
					const element = document.getElementById(field.value);
					const container = document.getElementById(
						"countryCommandGroup"
					);
					if (container && element) {
						container.scrollTop =
							element.offsetTop -
							container.clientHeight / 2 -
							element.clientHeight / 2;
					}
				}

				return (
					<FormItem className="w-full">
						<FormLabel htmlFor="country">Country</FormLabel>
						<FormControl>
							<div ref={containerRef}>
								<Popover open={open} onOpenChange={setOpen}>
									<PopoverTrigger asChild>
										<Button
											id="country"
											className="flex w-full justify-between"
											variant="outline"
										>
											{field.value || "Select Country"}

											<PiCaretUpDown className="h-4 w-4" />
										</Button>
									</PopoverTrigger>
									<PopoverContent
										onOpenAutoFocus={scrollToSelected}
										align="start"
										container={containerRef.current}
									>
										<Command>
											<CommandInput
												placeholder="Search country..."
												className="h-9"
											/>
											<CommandEmpty>
												No country found
											</CommandEmpty>
											<CommandGroup
												className="hide-scrollbar max-h-80 overflow-y-auto"
												id="countryCommandGroup"
											>
												{countries.map((country) => (
													<CommandItem
														id={country}
														key={country}
														value={country}
														onSelect={() => {
															field.onChange(
																country
															);
															setOpen(false);
														}}
													>
														{country}
														{country ===
															field.value && (
															<MdCheck className="ml-auto h-4 w-4" />
														)}
													</CommandItem>
												))}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
							</div>
						</FormControl>
						<FormMessage>{error}</FormMessage>
					</FormItem>
				);
			}}
		/>
	);
}
