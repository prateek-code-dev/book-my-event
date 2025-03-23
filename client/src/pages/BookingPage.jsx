import { showToast } from "@/helper/showToast";
import { getBookingDetailsFunction } from "@/redux/slices/bookingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Loading from "@/components/project-components/Loading";
import moment from "moment";
import { MdCancel } from "react-icons/md";
import { GrOverview } from "react-icons/gr";

const BookingPage = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.booked);

    const [bookingData, setBookingData] = useState([]);

    const getBookingsData = async () => {
        try {
            const result = await dispatch(getBookingDetailsFunction()).unwrap();

            if (!result.success) {
                showToast("error", `Error! ${result.message}`);
            }

            setBookingData(result);
        } catch (error) {
            showToast("error", `Error! ${error}`);
        }
    };

    console.log("bookingData", bookingData);

    const handleBookingCancel = (bookedTicket) => {
        console.log("bookedTicket", bookedTicket);
    };

    

    useEffect(() => {
        getBookingsData();
    }, []);

    return (
        <>
            <div className="">
                <p className="text-3xl font-bold text-gray-800 p-2">Bookings</p>
            </div>
            <div className="py-4">
                {loading && <Loading />}

                {!loading && (
                    <Table className="text-lg">
                        <TableCaption>
                            User Bookings | Book My Events
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Venue</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookingData.data &&
                                bookingData.data.length > 0 &&
                                bookingData.data.map((item, index) => (
                                    <TableRow>
                                        <TableCell className="font-bold">
                                            {item?.event?.eventName}
                                        </TableCell>
                                        <TableCell>
                                            {moment(
                                                item?.event?.eventDate
                                            ).format("DD MMMM YYYY")}
                                        </TableCell>
                                        <TableCell>
                                            {item?.event?.eventTime}
                                        </TableCell>
                                        <TableCell>{`${item?.event?.eventAddress}, ${item?.event?.eventCity}- ${item?.event?.eventPinCode}`}</TableCell>
                                        <TableCell className="font-bold">
                                            {(item?.status).toUpperCase()}
                                        </TableCell>
                                        <TableCell>
                                            <MdCancel
                                                size="20"
                                                className="cursor-pointer text-red-700 hover:text-red-400"
                                                onClick={() =>
                                                    handleBookingCancel(item)
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </>
    );
};

export default BookingPage;
