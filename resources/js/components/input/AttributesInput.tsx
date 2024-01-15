import React, { Fragment, useEffect, useRef, useState } from "react";
import { Control, FieldPath } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from "@/components/ui/command";
import _attributes from "@/constants/attributes";
import { groupAttributesByCategory } from "@/lib/utils";
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Attribute } from "@/types";
import { Badge } from "@/components/ui/badge";
import { FaXmark } from "react-icons/fa6";

interface FormValues {
	attributes: string[];
}

interface Props<T extends FormValues> {
	control: Control<T>;
	error?: string;
}

export default function AttributesInput<T extends FormValues>({
	control,
	error
}: Props<T>) {
	return (
		<FormField
			control={control}
			name={"attributes" as FieldPath<T>}
			render={({ field }) => {
				const [selected, setSelected] = useState<Attribute[]>(
					(field.value as string[])
						.map(
							(name) =>
								_attributes.find(
									(attribute) => attribute?.name === name
								) as Attribute
						)
						.filter(
							(attribute): attribute is Attribute => !!attribute
						)
				);
				const [attributes, setAttributes] = useState(
					groupAttributesByCategory(
						_attributes,
						selected.map((attribute) => attribute.name)
					)
				);
				const containerRef = useRef<HTMLDivElement>(null);

				useEffect(() => {
					field.onChange(selected.map((attribute) => attribute.name));
				}, [selected.length]);

				function removeFromAttributes(attribute: Attribute) {
					setAttributes(
						attributes.map((group) =>
							group.name === attribute.category ?
								{
									name: group.name,
									children: group.children.filter(
										(_child) =>
											_child.name !== attribute.name
									)
								}
							:	group
						)
					);
					setSelected((previous) => [...previous, attribute]);
				}

				function addToAttributes(attribute: Attribute) {
					for (const group of attributes) {
						if (group.name == attribute.category) {
							group.children.push(attribute);
							break;
						}
					}

					setSelected((previous) =>
						previous.filter(
							(selected) => selected.name !== attribute.name
						)
					);
				}

				const [open, setOpen] = useState(false);

				return (
					<FormItem>
						<FormLabel className="block" htmlFor="attributes">
							Attributes
						</FormLabel>
						<FormControl ref={containerRef}>
							<div ref={containerRef}>
								<Popover open={open} onOpenChange={setOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											id="attributes"
										>
											Select Attributes
										</Button>
									</PopoverTrigger>
									<PopoverContent
										container={containerRef.current}
										align="start"
									>
										<Command>
											<CommandInput />
											<CommandList className="hide-scrollbar">
												<CommandEmpty>
													No attributes found...
												</CommandEmpty>
												{attributes
													.filter(
														(group) =>
															group.children
																.length
													)
													.map((group, index) => (
														<Fragment
															key={group.name}
														>
															<CommandGroup
																heading={
																	group.name
																}
															>
																{group.children.map(
																	(
																		child,
																		index
																	) => (
																		<CommandItem
																			key={
																				index
																			}
																			value={
																				child.name
																			}
																			onSelect={() => {
																				setOpen(
																					false
																				);
																				field.onChange(
																					[
																						...field.value,
																						child.name
																					]
																				);
																				removeFromAttributes(
																					child
																				);
																			}}
																		>
																			{
																				child.name
																			}
																		</CommandItem>
																	)
																)}
															</CommandGroup>
															{index !==
																attributes.length -
																	1 && (
																<CommandSeparator />
															)}
														</Fragment>
													))}
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>
						</FormControl>
						<div className="flex flex-wrap items-center gap-3">
							{selected.map((attribute) => (
								<Badge
									variant="outline"
									key={attribute.name}
									className="flex items-center gap-1"
								>
									{attribute.name}

									<button
										type="button"
										onClick={() =>
											addToAttributes(attribute)
										}
									>
										<FaXmark className="h-3 w-3" />
									</button>
								</Badge>
							))}
						</div>
						<FormMessage>{error}</FormMessage>
					</FormItem>
				);
			}}
		/>
	);
}
