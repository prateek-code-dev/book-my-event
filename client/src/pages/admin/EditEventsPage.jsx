import DateSelector from "@/components/project-components/DateSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { updateEventRequest } from "@/services/eventsApi";
import { showToast } from "@/helper/showToast";
import { updateEventFunction } from "@/redux/slices/eventSlice";

const EditEventsPage = () => {
    const params = useParams();
    // console.log("params", params);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allEventsData } = useSelector((state) => state.event) || {};
    // console.log("allEventsData", allEventsData.data);

    const [editEventData, setEditEventData] = useState(null);
    // console.log("editEventData", editEventData);

    const [addSingleGuest, setAddSingleGuest] = useState(null);

    useEffect(() => {
        const getEditEventData = async () => {
            try {
                const singleEditEventData = allEventsData?.data?.filter(
                    (e) => e._id === params.id
                );

                // console.log("singleEditEventData", singleEditEventData);
                setEditEventData(singleEditEventData[0]);

                setTicketType(editEventData?.eventTickets);
            } catch (error) {}
        };

        if (allEventsData) {
            getEditEventData();
        }

        // getEditEventData();
    }, [params, allEventsData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEditEventData({ ...editEventData, [name]: value });
    };

    const handleSubmit = async (e) => {
        try {
            console.log("editEventData", editEventData);

            const response = await dispatch(
                updateEventFunction({
                    postData: editEventData,
                    id: editEventData._id,
                })
            ).unwrap();
            console.log("response", response);
            if (!response.success) {
                return showToast("error", `Error! ${response.message}`);
            }

            showToast("success", `Success ${response.message}`);
            navigate("/admin/all-event");
        } catch (error) {
            return showToast("error", `Error! ${error}`);
        }
    };

    const handleGuestRemove = (item, index) => {
        // console.log("item guest", item);
        // console.log("index guest", index);

        const updatedGuests = editEventData?.eventGuests?.filter(
            (e) => e !== item
        );
        setEditEventData({ ...editEventData, eventGuests: updatedGuests });
    };

    const handleRemoveTicketType = (item, index) => {
        // console.log("item", item);
        // console.log("index", index);

        const updatedTicketType = editEventData?.eventTickets?.filter(
            (e) => e.name !== item.name
        );
        // console.log("updatedTicketType", updatedTicketType);

        setEditEventData({ ...editEventData, eventTickets: updatedTicketType });
    };

    const handleAddGuest = () => {
        const updatedGuestList = [
            ...[editEventData.eventGuests],
            addSingleGuest,
        ];
        setEditEventData({
            ...editEventData,
            eventGuests: updatedGuestList,
        });

        console.log("updatedGuestList", updatedGuestList);
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-800 p-2">Edit Event</h1>
            <div className="flex flex-col gap-4 p-2 w-full">
                <div className="flex items-center gap-4">
                    <Label className="text-xl font-bold text-gray-800 w-full">
                        Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        required
                        className="border-2 w-full cursor-pointer hover:bg-gray-100 text-xl"
                        placeholder="Enter Event Name"
                        name="eventName"
                        value={editEventData?.eventName || ""}
                        type="text"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center gap-4 w-full">
                    <Label className="text-xl font-bold text-gray-800 w-full">
                        Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                        required
                        className="border-2 cursor-pointer hover:bg-gray-100 text-xl"
                        placeholder="Enter Event Description"
                        value={editEventData?.eventDescription || ""}
                        name="eventDescription"
                        type="text"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center gap-4 w-full">
                    <Label className="text-xl font-bold text-gray-800 w-full">
                        Event Organizer
                    </Label>
                    <Input
                        className="border-2 cursor-pointer hover:bg-gray-100 text-xl"
                        placeholder="Enter Event Organizer"
                        name="eventOrganizer"
                        value={editEventData?.eventOrganizer}
                        type="text"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center gap-4 w-full">
                    <Label className="text-xl font-bold text-gray-800 w-full">
                        Event Guests
                    </Label>
                    <div className="flex w-full gap-2">
                        <Input
                            className="border-2 cursor-pointer hover:bg-gray-100 text-xl"
                            placeholder="Add New Guests"
                            type="text"
                            name="eventGuests"
                            onChange={(e) => setAddSingleGuest(e.target.value)}
                        />
                        <Button onClick={handleAddGuest}>Add Guest</Button>
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-full"></div>
                    <div className="w-full flex gap-2">
                        {editEventData &&
                            editEventData.eventGuests &&
                            editEventData?.eventGuests?.length > 0 &&
                            editEventData?.eventGuests?.map((item, index) => (
                                <div
                                    key={index}
                                    className="border-2 p-2 flex items-center gap-2"
                                >
                                    {item}{" "}
                                    <IoIosCloseCircle
                                        size="20"
                                        onClick={() =>
                                            handleGuestRemove(item, index)
                                        }
                                    />
                                </div>
                            ))}
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full">
                    <Label className="text-xl font-bold text-gray-800 w-full">
                        Event Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        required
                        className="border-2 cursor-pointer hover:bg-gray-100 text-xl"
                        placeholder="Enter Event Address"
                        name="eventAddress"
                        type="text"
                        value={editEventData?.eventAddress || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center gap-4 w-full">
                    <Label className="text-xl font-bold text-gray-800 w-full">
                        Event City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        required
                        className="border-2 cursor-pointer hover:bg-gray-100 text-xl"
                        placeholder="Enter Event City"
                        name="eventCity"
                        type="text"
                        value={editEventData?.eventCity || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center gap-4 w-full">
                    <Label className="text-xl font-bold text-gray-800 w-full">
                        Event Pincode <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        required
                        className="border-2 cursor-pointer hover:bg-gray-100 text-xl"
                        placeholder="Enter Event Pincode"
                        name="eventPinCode"
                        type="text"
                        value={editEventData?.eventPinCode || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center gap-4 w-full">
                    <Label className="text-xl font-bold text-gray-800 w-full">
                        Event Date <span className="text-red-500">*</span>
                    </Label>
                    <div className="border-2 w-full bg-gray-50">
                        <DateSelector
                            required
                            placeHolderMessage={
                                editEventData?.eventDate?.split("T")[0] || ""
                            }
                            placeholder={""}
                            name="eventDate"
                            type="date"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full">
                    <Label className="text-xl font-bold text-gray-800 w-full">
                        Event Time <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        required
                        className="border-2 cursor-pointer hover:bg-gray-100 text-xl"
                        placeholder="Enter Event Time"
                        name="eventTime"
                        type="time"
                        value={editEventData?.eventTime || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center gap-4 w-full">
                    <Label className="text-xl font-bold text-gray-800 w-full">
                        Event Media Upload
                    </Label>
                    <Input
                        className="border-2 cursor-pointer hover:bg-gray-100 text-xl"
                        placeholder="Enter Event Media"
                        name="eventMedia"
                        type="file"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center gap-4 w-full">
                    <Label className="text-xl font-bold text-gray-800 w-full">
                        Ticket Price
                    </Label>
                    <div className="flex w-full gap-2">
                        <Input
                            className="border-2 cursor-pointer hover:bg-gray-100 text-xl w-full"
                            type="text"
                            placeholder="Add New Ticket Type"
                            name="name"
                        />
                        <Input
                            className="border-2 cursor-pointer hover:bg-gray-100 text-xl w-full"
                            type="text"
                            placeholder="Add New Ticket Price"
                            name="price"
                        />
                        <Input
                            className="border-2 cursor-pointer hover:bg-gray-100 text-xl w-full"
                            type="text"
                            placeholder="Add New Ticket Limit"
                            name="limit"
                        />
                        <Button>Add Ticket</Button>
                    </div>
                </div>
                {editEventData &&
                    editEventData?.eventTickets &&
                    editEventData?.eventTickets?.length > 0 && (
                        <div className="flex w-full">
                            <div className="w-full">1</div>
                            <div className="w-full">
                                {editEventData?.eventTickets?.map(
                                    (item, index) => (
                                        <div
                                            key={index}
                                            className="w-full flex gap-2 items-center"
                                        >
                                            <Input
                                                value={item?.name}
                                                disabled
                                            />
                                            <Input
                                                value={`Rs. ${item?.price}`}
                                                disabled
                                            />
                                            <Input
                                                value={`${item?.limit} left`}
                                                disabled
                                            />
                                            <IoIosCloseCircle
                                                size="64"
                                                onClick={() =>
                                                    handleRemoveTicketType(
                                                        item,
                                                        index
                                                    )
                                                }
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                <Button
                    className="text-xl cursor-pointer"
                    onClick={handleSubmit}
                >
                    Edit Event
                </Button>
            </div>
        </>
    );
};

export default EditEventsPage;
