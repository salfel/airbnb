import React, { Fragment, useState } from "react";
import { Control } from "react-hook-form";
import { FormValues } from "@/Pages/Apartment/Create";
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

interface Props {
	control: Control<FormValues>;
	error?: string;
}

export default function AttributesInput({ control, error }: Props) {
	const [attributes, setAttributes] = useState(
		groupAttributesByCategory(_attributes)
	);
	const [selected, setSelected] = useState<Attribute[]>([]);

	function removeFromAttributes(attribute: Attribute) {
		setAttributes(
			attributes.map((group) =>
				group.name === attribute.category ?
					{
						name: group.name,
						children: group.children.filter(
							(_child) => _child.name !== attribute.name
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
			previous.filter((selected) => selected.name !== attribute.name)
		);
	}

	const [open, setOpen] = useState(false);

	return (
		<FormField
			control={control}
			name="attributes"
			render={({ field }) => {
				return (
					<FormItem>
						<FormLabel
							className="block"
							onClick={() => setOpen(true)}
							htmlFor="attributes"
						>
							Attributes
						</FormLabel>
						<FormControl>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button variant="outline" id="attributes">
										Select Attributes
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									<Command>
										<CommandInput />
										<CommandList className="hide-scrollbar">
											<CommandEmpty>
												No attributes found...
											</CommandEmpty>
											{attributes
												.filter(
													(group) =>
														group.children.length
												)
												.map((group, index) => (
													<Fragment key={group.name}>
														<CommandGroup
															heading={group.name}
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
						</FormControl>
						<div className="flex flex-wrap items-center gap-3">
							{selected.map((attribute) => (
								<Badge variant="outline" key={attribute.name}>
									{attribute.name}

									<button
										type="button"
										onClick={() =>
											addToAttributes(attribute)
										}
									>
										<FaXmark className="ml-3 h-3 w-3" />
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
