import DateSelector from "@/components/project-components/DateSelector";
import ReportCard from "@/components/project-components/ReportCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showToast } from "@/helper/showToast";
import { getAllBookingsFunction } from "@/redux/slices/bookingSlice";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

const ReportsPage = () => {
    const dispatch = useDispatch();

    const [bookingsData, setBookingsData] = useState(null);

    const getBookingsData = async () => {
        try {
            const response = await dispatch(getAllBookingsFunction()).unwrap();

            if (!response.success) {
                showToast("error", `Error! ${response.message}`);
            }

            setBookingsData(response.data);
        } catch (error) {
            showToast("error", `Error! ${error.message || error}`);
        }
    };
    console.log("bookingsData", bookingsData);
    useEffect(() => {
        getBookingsData();
    }, []);

    let totalRevenue = 0;

    const reportData = useMemo(() => {
        if (!bookingsData || bookingsData.length === 0) {
            return [];
        }

        return [
            {
                name: "Total Bookings",
                title: "Total Bookings",
                description: "Total number of bookings made by users",
                value: bookingsData.length,
            },
            {
                name: "Cancelled Bookings",
                title: "Cancelled Bookings",
                description: "Total number of cancelled bookings",
                value: ` ${
                    bookingsData?.filter((item) => item.status === "cancelled")
                        .length
                }`,
            },
            {
                name: "Total Revenue",
                title: "Total Revenue",
                description: "Total revenue generated from all the users",
                value: `₹ ${bookingsData?.reduce(
                    (total, item) => total + item.totalAmount,
                    0
                )}`,
            },
            {
                name: "Refunded Amount",
                title: "Refunded Amount",
                description: "Total amount refunded for cancelled bookings",
                value: `₹ ${bookingsData
                    ?.filter((item) => item.status === "cancelled")
                    .reduce((total, e) => total + e.totalAmount, 0)}`,
            },
            {
                name: "Tickets sold",
                title: "Tickets sold",
                description: "Total number of tickets sold for all the events",
                value: `${bookingsData?.reduce(
                    (total, item) => total + item.ticketCount,
                    0
                )}`,
            },
            {
                name: "Tickets cancelled",
                title: "Tickets cancelled",
                description:
                    "Total number of tickets cancelled for all the events",
                value: `${bookingsData
                    .filter((item) => item.status === "cancelled")
                    .reduce((total, e) => total + e.ticketCount, 0)}`,
            },
        ];
    }, [bookingsData]);

    console.log("reportData", reportData);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between px-2">
                <p className="text-3xl font-bold text-gray-800 p-2">Reports</p>
            </div>

            <div className="flex items-center px-2">
                <div className="px-2 py-2 hover:cursor-pointer">
                    <p>Event</p>
                    <Input />
                </div>

                <div className="px-2 py-2 hover:cursor-pointer">
                    <p>Start Date</p>
                    <DateSelector />
                </div>

                <div className="px-2 py-2 hover:cursor-pointer">
                    <p>End Date</p>
                    <DateSelector />
                </div>

                <div className="px-2 py-2 hover:cursor-pointer">
                    <Button className="hover:cursor-pointer">
                        Clear Filters
                    </Button>
                </div>

                <div className="px-2 py-2 hover:cursor-pointer">
                    <Button className="hover:cursor-pointer">
                        Fetch Reports
                    </Button>
                </div>
            </div>

            <div className="px-4 py-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reportData &&
                    reportData.length > 0 &&
                    reportData.map((item) => (
                        <ReportCard
                            title={item.title}
                            description={item.description}
                            value={item.value}
                        />
                    ))}
            </div>

            <div></div>
        </div>
    );
};

export default ReportsPage;
