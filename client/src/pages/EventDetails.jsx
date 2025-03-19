import Loading from "@/components/project-components/Loading";
import { showToast } from "@/helper/showToast";
import { getEventDetailFunction } from "@/redux/slices/eventSlice";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EventDetails = () => {
    const [eventDetail, setEventDetail] = useState(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const params = useParams();
    // console.log("params", params?.id);

    const { loading } = useSelector((state) => state?.event) || false;
    // console.log("loading", loading);
    // console.log("eventDetail", eventDetail);

    const [selectedTicketType, setSelectedTicketType] = useState(null);
    const [bookingTicketCount, setBookingTicketCount] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await dispatch(
                    getEventDetailFunction(params?.id)
                ).unwrap();

                // console.log("response", response);
                setEventDetail(response?.data);
            } catch (error) {
                showToast("error", `Error ${error}`);
            }
        };

        if (params.id) {
            fetchEventDetails();
        }
    }, []);

    const handleSelectedTicketType = (item) => {
        // console.log("item", item);

        setSelectedTicketType(item);
    };

    const handleBookNow = () => {
        console.log(`Book now!`);
    };

    return (
        <div className="w-full">
            {loading && <p className="text-xl font-bold">Event Details</p>}

            {loading && (
                <div className="h-screen flex items-center justify-center">
                    <Loading />
                </div>
            )}

            {!loading && eventDetail && (
                <div className="text-xl w-full flex flex-col gap-2">
                    <p className="text-3xl font-bold">
                        {eventDetail?.eventName}
                    </p>

                    <div className="flex items-center justify-between py-2 w-full">
                        <p className="flex items-center gap-2">
                            <FaLocationDot />
                            {`${eventDetail?.eventAddress}, ${eventDetail?.eventCity}`}
                        </p>
                        <div className="flex gap-8">
                            <p className="flex items-center gap-2 ">
                                <FaCalendarAlt />
                                {`${moment(eventDetail?.eventDate).format(
                                    "DD-MMMM-YYYY"
                                )}`}
                            </p>
                            <p className="flex items-center gap-2">
                                <IoIosTime size="20" />
                                {`${eventDetail?.eventTime}`}
                            </p>
                        </div>
                    </div>

                    <div className="w-[500px] h-[300px] rounded-3xl">
                        <img
                            className="w-full h-full fill-background"
                            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
                        />
                    </div>

                    <div className="h-[100px] py-4">
                        {eventDetail?.eventDescription}
                    </div>

                    <div className="bg-gray-200 w-full rounded-xl py-4">
                        <div className="flex items-center justify-between px-2 py-2">
                            <div className="w-full">
                                <p className="text-gray-600">Organizer</p>
                                <p className="flex gap-4 font-bold">
                                    {eventDetail?.eventOrganizer}
                                </p>
                            </div>

                            <div className="w-full">
                                <p className="text-gray-600">Address</p>
                                <p className="flex gap-4 font-bold">
                                    {eventDetail?.eventAddress}
                                </p>
                            </div>

                            <div className="w-full">
                                <p className="text-gray-600">City</p>
                                <p className="flex gap-4 font-bold">
                                    {eventDetail?.eventCity}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between w-full py-2 px-2">
                            <div className="w-full">
                                <p className="text-gray-600">Pincode</p>
                                <p className="flex gap-4 font-bold">
                                    {eventDetail?.eventPinCode}
                                </p>
                            </div>
                            <div className="w-full">
                                <p className="text-gray-600">Date</p>
                                <p className="flex gap-4 font-bold">
                                    {moment(eventDetail?.eventDate).format(
                                        "DD MMMM YYYY"
                                    )}
                                </p>
                            </div>
                            <div className="w-full">
                                <p className="text-gray-600">Time</p>
                                <p className="flex gap-4 font-bold">
                                    {eventDetail?.eventTime}
                                </p>
                            </div>
                        </div>

                        <div className="px-2 py-2">
                            <p className="text-gray-600">Guests</p>
                            <p className="flex gap-4 font-bold">
                                {eventDetail?.eventGuests.map((item, index) => (
                                    <p key={index}>{`- ${item}`}</p>
                                ))}
                            </p>
                        </div>
                    </div>

                    <div className="py-4">
                        <p className="text-xl font-bold text-gray-600">
                            Select ticket type
                        </p>

                        <div className="flex gap-4 py-4 ">
                            {eventDetail?.eventTickets &&
                                eventDetail.eventTickets.length > 0 &&
                                eventDetail.eventTickets.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`bg-gray-200 p-2 w-full rounded-2xl cursor-pointer ${
                                            selectedTicketType === item
                                                ? "bg-gray-400 border-2 border-black "
                                                : ""
                                        }`}
                                    >
                                        <p className="text-xl py-2">
                                            {item.name}
                                        </p>

                                        <div
                                            className={`flex items-center justify-between`}
                                            onClick={() =>
                                                handleSelectedTicketType(item)
                                            }
                                        >
                                            <p className="font-bold py-2">{`$ ${item.price}`}</p>
                                            <p className="font-bold py-2">{`${item.limit} left`}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        <div className="py-4">
                            <p>Select tickets count</p>

                            <input
                                className="my-4 border-2 w-full rounded-2xl p-2"
                                type="number"
                                placeholder="Ticket count"
                                min={1}
                                max={selectedTicketType?.limit}
                                disabled={!selectedTicketType}
                                onChange={(e) =>
                                    setBookingTicketCount(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-2xl flex items-center justify-between gap-4">
                        <div>
                            <p className="">Total Amount: </p>
                            <p className="font-bold">$ 0</p>
                        </div>

                        <div>
                            <Button
                                className="text-xl cursor-pointer"
                                disabled={
                                    !selectedTicketType ||
                                    !bookingTicketCount ||
                                    bookingTicketCount <=
                                        selectedTicketType?.limit
                                }
                                onClick={handleBookNow}
                            >
                                Book Now
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDetails;
