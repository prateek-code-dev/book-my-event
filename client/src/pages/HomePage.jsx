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
import { ThemeToggle } from "@/components/theme-toggle";

const HomePage = () => {
    const [allEventsData, setAllEventsData] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { name } = useSelector((state) => state?.auth?.data?.data) || "User";
    const { loading } = useSelector((state) => state?.event);

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const response = await dispatch(
                    getAllEventsFunction()
                ).unwrap();

                // console.log("response", response);

                if (!response.success) {
                    showToast("error", `Error! ${response.message}`);
                }

                setAllEventsData(response.data);
            } catch (error) {
                showToast("error", `Error! ${error}`);
            }
        };

        fetchAllEvents();
    }, []);

    return (
        <div>
            <ThemeToggle />
            <div className="flex-col gap-4 p-2">
                <p className="text-2xl font-bold">Welcome {name}</p>
                <p className="bg-background text-foreground dark:bg-red-400 dark:text-blue-300 text-2xl font-bold">
                    Welcome {name}
                </p>
            </div>

            <div className="flex gap-2  w-full">
                <Input
                    className="cursor-pointer w-full"
                    placeHolder="Event Name"
                    type="text"
                    name="eventName"
                />
                <DateSelector
                    className="cursor-pointer bg-amber-700 w-1/5"
                    name="eventDate"
                />

                <Button className="cursor-pointer text-lg">
                    Clear Filters
                </Button>
                <Button className="cursor-pointer text-lg">
                    Apply Filters
                </Button>
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
