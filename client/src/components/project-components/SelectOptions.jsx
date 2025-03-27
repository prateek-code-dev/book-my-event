import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import React from "react";

const SelectOptions = ({ listItems }) => {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent>
                {listItems &&
                    listItems.length > 0 &&
                    listItems.map((item, index) => (
                        <SelectItem key={index} value="dark">
                            {item}
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    );
};

export default SelectOptions;
