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
import { array_diff, cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useId } from "react";

interface Props {
    control: Control<FormValues>;
    error?: string;
}

export default function CalenderInput({ control, error }: Props) {
    function handleChange(
        previous: Date[],
        current: Date[],
        onChange: (e: { target: { value: Date[] } }) => void,
    ) {
        const diff = array_diff(current, previous)[0];

        const closest = findClosest(previous, diff);
        onChange({
            target: {
                value: current.filter((date) => date !== closest),
            },
        });

        function findClosest(dates: Date[], target: Date) {
            return dates.reduce((previous: Date, current: Date) =>
                Math.abs(current.getTime() - target.getTime()) <
                Math.abs(previous.getTime() - target.getTime())
                    ? current
                    : previous,
            );
        }
    }

    const id = useId();

    return (
        <FormField
            name="date"
            control={control}
            render={({ field }) => (
                <FormItem>
                    <div>
                        <FormLabel
                            htmlFor={id}
                            className="font-medium block mb-1"
                        >
                            Begin - End
                        </FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-[240px] pl-3 text-left font-normal",
                                            !field.value &&
                                                "text-muted-foreground",
                                        )}
                                    >
                                        <span>
                                            {format(field.value[0], "PP")} -{" "}
                                            {format(field.value[1], "PP")}
                                        </span>
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar
                                    mode="multiple"
                                    selected={field.value}
                                    min={2}
                                    id={id}
                                    onSelect={(e) => {
                                        const tmp = field.value;
                                        field.onChange({
                                            target: { value: e },
                                        });
                                        handleChange(
                                            tmp,
                                            e as Date[],
                                            field.onChange,
                                        );
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage>{error}</FormMessage>
                    </div>
                </FormItem>
            )}
        />
    );
}
