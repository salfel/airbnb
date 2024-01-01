import * as React from "react";
import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PiCaretUpDown } from "react-icons/pi";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import countries from "@/constants/countries";
import { MdCheck } from "react-icons/md";
import { FormValues } from "@/Pages/Apartment/Create";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

interface CountryInputProps {
    control: Control<FormValues>;
    error?: string;
}

export default function CountryInput({ control, error }: CountryInputProps) {
    const [open, setOpen] = useState(false);

    return (
        <FormField
            control={control}
            name="country"
            render={({ field }) => {
                function scrollToSelected() {
                    const element = document.getElementById(field.value);
                    const container = document.getElementById(
                        "countryCommandGroup",
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
                        <FormLabel
                            htmlFor="country"
                            onClick={() => setOpen(true)}
                        >
                            Country
                        </FormLabel>
                        <FormControl>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="country"
                                        className="w-full flex justify-between"
                                        variant="outline"
                                    >
                                        {field.value || "Select Country"}

                                        <PiCaretUpDown className="w-4 h-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    onOpenAutoFocus={scrollToSelected}
                                    align="start"
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
                                            className="max-h-80 overflow-y-auto hide-scrollbar"
                                            id="countryCommandGroup"
                                        >
                                            {countries.map((country) => (
                                                <CommandItem
                                                    id={country}
                                                    key={country}
                                                    value={country}
                                                    onSelect={() => {
                                                        field.onChange(country);
                                                        setOpen(false);
                                                    }}
                                                >
                                                    {country}
                                                    {country ===
                                                        field.value && (
                                                        <MdCheck className="ml-auto w-4 h-4" />
                                                    )}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                        <FormMessage>{error}</FormMessage>
                    </FormItem>
                );
            }}
        />
    );
}
