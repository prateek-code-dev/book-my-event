import Loading from "@/components/project-components/Loading";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { showToast } from "@/helper/showToast";
import { getAllEventsFunction } from "@/redux/slices/eventSlice";
import moment from "moment";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const DisplayAllEventsPage = () => {
    const { loading, data } = useSelector((state) => state?.event) || {};

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        const getAllEventsData = async () => {
            try {
                const response = await dispatch(
                    getAllEventsFunction()
                ).unwrap();

                if (!response.success) {
                    showToast("error", response.message || `Error`);
                }

                setEventsData(response.data);
            } catch (error) {
                showToast("error", `Error ${error.message}`);
            }
        };

        getAllEventsData();
    }, []);

    // console.log("eventsData", eventsData);

    const handleEditEvent = (e, id) => {
        // console.log("e", e);
        // console.log("i", id);

        navigate(`/admin/edit-event/${e._id}`);
    };

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold text-gray-800 p-2">
                    All Events
                </h1>
            </div>
            <div>
                {loading && (
                    <div className="h-screen w-screen flex items-center justify-center">
                        <Loading />
                    </div>
                )}

                {!loading && (
                    <Table className="font-medium text-lg">
                        <TableCaption>
                            List of Events | Book My Event
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Organizers</TableHead>
                                <TableHead>Tickets</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {eventsData &&
                                eventsData.length > 0 &&
                                eventsData.map((e, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <img src={e.eventMedia[0]} />
                                        </TableCell>
                                        <TableCell>{e.eventName}</TableCell>
                                        <TableCell>
                                            {`${e.eventAddress}, ${e.eventCity}, ${e.eventPinCode}`}
                                        </TableCell>
                                        <TableCell>
                                            {moment(e.eventDate).format(
                                                "DD-MMMM-YYYY"
                                            )}
                                        </TableCell>
                                        <TableCell>{e.eventTime}</TableCell>
                                        <TableCell>
                                            {e.eventOrganizers &&
                                            e.eventOrganizers.length > 0 ? (
                                                e.eventOrganizers?.map(
                                                    (item) => <p>{item}</p>
                                                )
                                            ) : (
                                                <div className="text-center">
                                                    -
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {e.eventTickets &&
                                            e.eventTickets.length > 0 ? (
                                                e.eventTickets?.price?.map(
                                                    (item) => (
                                                        <div>{item.price}</div>
                                                    )
                                                )
                                            ) : (
                                                <div className="text-center">
                                                    -
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-4 text-xl">
                                                <MdModeEdit
                                                    className="text-blue-700 hover:text-blue-400 cursor-pointer"
                                                    onClick={() =>
                                                        handleEditEvent(e, i)
                                                    }
                                                />

                                                <MdDelete className="text-red-700 hover:text-red-400 cursor-pointer" />
                                            </div>
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

export default DisplayAllEventsPage;
