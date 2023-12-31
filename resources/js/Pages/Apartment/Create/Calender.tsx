import { Control } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { FormValues } from "@/Pages/Apartment/Create";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface Props {
    control: Control<FormValues>;
    error?: string;
}

export default function CalenderInput({ control, error }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <FormField
            name="date"
            control={control}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="block">Begin - End</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !(field.value.to || field.value.from) &&
                                            "text-muted-foreground",
                                    )}
                                >
                                    <span>
                                        {format(field.value.from, "PP")} -{" "}
                                        {format(field.value.to, "PP")}
                                    </span>
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar
                                    mode="range"
                                    selected={field.value}
                                    min={2}
                                    onSelect={field.onChange}
                                />
                            </PopoverContent>
                        </Popover>
                    </FormControl>
                    <FormMessage>{error}</FormMessage>
                </FormItem>
            )}
        />
    );
}
