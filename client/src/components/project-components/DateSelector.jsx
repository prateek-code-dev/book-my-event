import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const DateSelector = ({ placeHolderMessage, onChange, selected }) => {
    const [date, setDate] = useState();

    useEffect(() => {
        setDate(selected);
    }, [selected]);

    const handleSelect = (selectedDate) => {
        const isoDate = selectedDate.toISOString();
        setDate(isoDate);
        if (onChange) {
            onChange(isoDate);
        }
    };
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? (
                        format(date, "PPP")
                    ) : (
                        <span>
                            {placeHolderMessage
                                ? placeHolderMessage
                                : "Pick a date"}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date ? new Date(date) : undefined}
                    onSelect={handleSelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default DateSelector;
