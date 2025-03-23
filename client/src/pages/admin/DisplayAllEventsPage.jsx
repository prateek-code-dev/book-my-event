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
import {
    deleteEventFunction,
    getAllEventsFunction,
} from "@/redux/slices/eventSlice";
import moment from "moment";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { set } from "date-fns";
import Modal from "@/components/project-components/Modal";

const DisplayAllEventsPage = () => {
    const { loading, data } = useSelector((state) => state?.event) || {};

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [eventsData, setEventsData] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);

    const [deleteEvent, setDeleteEvent] = useState(null);

    const getAllEventsData = async () => {
        try {
            const response = await dispatch(getAllEventsFunction()).unwrap();

            if (!response.success) {
                showToast("error", response.message || `Error`);
            }

            setEventsData(response.data);
        } catch (error) {
            showToast("error", `Error ${error.message}`);
        }
    };

    useEffect(() => {
        getAllEventsData();
    }, []);

    // console.log("eventsData", eventsData);

    const handleEditEvent = (e, id) => {
        // console.log("e", e);
        // console.log("i", id);

        navigate(`/admin/edit-event/${e._id}`);
    };

    const handleDeleteEvent = async (e) => {
        e.preventDefault();

        setModalOpen(false);

        try {
            console.log("deleteEvent", deleteEvent);

            const result = await dispatch(
                deleteEventFunction(deleteEvent._id)
            ).unwrap();

            if (!result.success) {
                showToast("error", `Error! ${result?.message}`);
            }

            showToast("success", `Success! ${result?.message}`);

            getAllEventsData();
        } catch (error) {
            showToast("error", `Error! ${error}`);
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between px-2">
                <p className="text-3xl font-bold text-gray-800 p-2">
                    All Events
                </p>
                <Button
                    className="p-4 text-xl"
                    onClick={() => navigate("/admin/create-event")}
                >
                    Create Event
                </Button>
            </div>

            <div className="pt-4">
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
                                            <div className="flex gap-4 text-xl">
                                                <MdModeEdit
                                                    className="text-blue-700 hover:text-blue-400 cursor-pointer"
                                                    onClick={() =>
                                                        handleEditEvent(e, i)
                                                    }
                                                />

                                                <MdDelete
                                                    onClick={() => {
                                                        setModalOpen(true);
                                                        setDeleteEvent(e);
                                                    }}
                                                    className="text-red-700 hover:text-red-400 cursor-pointer"
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            <Modal
                isOpen={modalOpen}
                setIsOpen={setModalOpen}
                handleAction={handleDeleteEvent}
            />
        </div>
    );
};

export default DisplayAllEventsPage;
