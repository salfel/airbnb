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
import { countries } from "@/lib/constants";
import { MdCheck } from "react-icons/md";
import * as React from "react";
import { FormValues } from "@/Pages/Apartment/Create";
import { ForwardRefProps } from "@/components/FormInput";

interface CountryInputProps {
    onChange: (value: string) => void;
    value: string;
    name: string;
    innerRef: React.Ref<HTMLInputElement>;
}

function Input({ onChange, value, name, innerRef }: CountryInputProps) {
    const [open, setOpen] = useState(false);

    function scrollToSelected() {
        const element = document.getElementById(value);
        const container = document.getElementById("countryCommandGroup");
        if (container && element) {
            container.scrollTop =
                element.offsetTop -
                container.clientHeight / 2 -
                element.clientHeight / 2;
        }
    }

    return (
        <>
            <Popover open={open} onOpenChange={(open) => setOpen(open)}>
                <PopoverTrigger asChild>
                    <Button
                        className="w-full flex justify-between"
                        variant="outline"
                    >
                        {value || "Select Country"}

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
                            name={name}
                        />
                        <CommandEmpty>No country found</CommandEmpty>
                        <CommandGroup
                            className="max-h-80 overflow-y-auto hide-scrollbar"
                            id="countryCommandGroup"
                        >
                            {countries.map((country, index) => (
                                <CommandItem
                                    id={country}
                                    key={index}
                                    value={country}
                                    onSelect={() => {
                                        onChange(country);
                                        setOpen(false);
                                    }}
                                >
                                    {country}
                                    {country === value && (
                                        <MdCheck className="ml-auto w-4 h-4" />
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>

            <input
                className="hidden"
                ref={innerRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </>
    );
}

const CountryInput = React.forwardRef<
    HTMLInputElement,
    ForwardRefProps<HTMLInputElement, FormValues>
>(({ onChange, value, name, ...props }, ref) => {
    return (
        <Input
            onChange={onChange}
            value={value as string}
            name={name}
            innerRef={ref}
        />
    );
});

CountryInput.displayName = "CountryInput";

export default CountryInput;
