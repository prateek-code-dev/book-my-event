import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import React, { useState } from "react";

const SelectOptions = ({ listItems, onChange, value }) => {
    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent>
                {listItems &&
                    listItems.length > 0 &&
                    listItems.map((item, index) => (
                        <SelectItem key={index} value={item}>
                            {item}
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    );
};

export default SelectOptions;
