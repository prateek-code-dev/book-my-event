import Loading from "@/components/project-components/Loading";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showToast } from "@/helper/showToast";
import { getAllEventsFunction } from "@/redux/slices/eventSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { IoIosTime } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DateSelector from "@/components/project-components/DateSelector";
import SelectOptions from "@/components/project-components/SelectOptions";

const HomePage = () => {
    const [allEventsData, setAllEventsData] = useState([]);

    const [filter, setFilter] = useState({
        event: "",
        startDate: null,
        endDate: null,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { name } = useSelector((state) => state?.auth?.data?.data) || "User";
    const { loading } = useSelector((state) => state?.event);

    const [eventsList, setEventsList] = useState([]);

    const fetchAllEvents = async () => {
        try {
            const response = await dispatch(getAllEventsFunction()).unwrap();

            // console.log("response", response);

            if (!response.success) {
                showToast("error", `Error! ${response.message}`);
            }

            setAllEventsData(response.data);

            setEventsList(response.data.map((item, index) => item.eventName));
        } catch (error) {
            showToast("error", `Error! ${error}`);
        }
    };

    useEffect(() => {
        fetchAllEvents();
    }, []);

    const handleFetchReport = async () => {
        try {
            const response = await dispatch(
                getAllEventsFunction(filter)
            ).unwrap();

            // console.log("response", response);

            if (!response.success) {
                showToast("error", `Error! ${response.message}`);
            }

            setAllEventsData(response.data);
        } catch (error) {
            showToast("error", `Error! ${error.message || error}`);
        }
    };

    const updateFilter = (key, value) => {
        setFilter((prev) => ({ ...prev, [key]: value }));
    };

    const clearFilters = async () => {
        setFilter({ event: "", startDate: null, endDate: null });

        await fetchAllEvents();
    };

    return (
        <div>
            <div className="flex-col gap-4 p-2">
                <p className="text-2xl font-bold px-2">Welcome {name}</p>
            </div>

            <div className="flex items-center justify-between py-4 px-2 w-full ">
                <div className="px-2 hover:cursor-pointer w-full">
                    <p>Event</p>
                    <SelectOptions
                        listItems={eventsList}
                        value={filter.event}
                        onChange={(value) => updateFilter("event", value)}
                    />
                </div>

                <div className="px-2 hover:cursor-pointer w-full">
                    <p>Start Date</p>
                    <DateSelector
                        className="hover:cursor-pointer w-full"
                        selected={filter.startDate || undefined}
                        onChange={(value) => updateFilter("startDate", value)}
                    />
                </div>

                <div className="px-2 hover:cursor-pointer w-full ">
                    <p>End Date</p>
                    <DateSelector
                        className="hover:cursor-pointer w-full"
                        selected={filter.endDate || undefined}
                        onChange={(date) => updateFilter("endDate", date)}
                    />
                </div>

                <div className="px-2 pt-6 hover:cursor-pointer w-full ">
                    <Button
                        className="hover:cursor-pointer w-full"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </Button>
                </div>

                <div className="px-2 pt-6 hover:cursor-pointer w-full ">
                    <Button
                        className="hover:cursor-pointer w-full"
                        onClick={handleFetchReport}
                    >
                        Fetch Events
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-8 gap-2 w-full">
                {loading && <Loading />}

                {!loading &&
                    allEventsData &&
                    allEventsData.length > 0 &&
                    allEventsData.map((item, index) => (
                        <div
                            className="flex border-2 p-2 w-full gap-4"
                            key={index}
                        >
                            <div className="w-[300px] h-[200px]">
                                <img
                                    className="w-full h-full fill-background"
                                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
                                />
                            </div>

                            <div className="w-full">
                                <p className="text-xl font-bold h-1/6">
                                    {item?.eventName}
                                </p>

                                <p className="text-xl mt-4 h-1/3 ">
                                    {item?.eventDescription}
                                </p>

                                <div className="flex h-1/3 items-center justify-between w-full">
                                    <div className="text-lg font-bold w-1/2 p-2">
                                        <div className="text-gray-600 flex items-center gap-2">
                                            <FaLocationDot />{" "}
                                            {`${item?.eventAddress}, ${item?.eventCity}`}
                                        </div>
                                        <div className="flex text-gray-600 gap-4 pt-2">
                                            <div className="flex items-center gap-2">
                                                <MdDateRange />
                                                {moment(item?.eventDate).format(
                                                    "DD MMMM YYYY"
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <IoIosTime />
                                                {item?.eventTime}
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        className="p-4 text-xl cursor-pointer"
                                        onClick={() =>
                                            navigate(`/event/${item?._id}`)
                                        }
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default HomePage;
