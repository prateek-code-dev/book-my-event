import { showToast } from "@/helper/showToast";
import { allUserDetailsFunction } from "@/redux/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import moment from "moment";
import SelectOptions from "@/components/project-components/SelectOptions";
import { Button } from "@/components/ui/button";
import Loading from "@/components/project-components/Loading";
import Modal from "@/components/project-components/Modal";
import { switchUserToAdmin } from "@/services/userApi";

const UsersPage = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.allUsers) || {};

    const [generalLoading, setGeneralLoading] = useState(false);

    const [userData, setUserData] = useState(null);

    const [isOpen, setIsOpen] = useState(false);

    const [userAdminId, setUserAdminId] = useState(null);

    const getUserData = async () => {
        try {
            const response = await dispatch(allUserDetailsFunction()).unwrap();

            setUserData(response.data);
        } catch (error) {
            return showToast("error", `Error! ${error.message || error}`);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const handleMakeOrRemoveAdmin = async () => {
        setIsOpen(false);

        setGeneralLoading(true);
        try {
            const response = await switchUserToAdmin({ id: userAdminId });

            if (!response.success) {
                return showToast("error", `Error! ${response.message}`);
            }

            showToast("success", `Success! ${response.message}`);
        } catch (error) {
            showToast("error", `Error! ${error.message || error}`);
        } finally {
            setGeneralLoading(false);

            await getUserData();
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between px-2">
                <p className="text-3xl font-bold text-gray-800 p-2">Users</p>
            </div>

            <div className="px-2 py-8">
                {loading && (
                    <div className="flex items-center justify-center">
                        <Loading />
                    </div>
                )}

                {!loading && userData && userData.length > 0 && (
                    <Table className="text-lg">
                        <TableCaption className="py-8">
                            List of all Users | BookMyEvents
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-xl font-bold text-gray-800">
                                    ID
                                </TableHead>
                                <TableHead className="text-xl font-bold text-gray-800">
                                    Name
                                </TableHead>
                                <TableHead className="text-xl font-bold text-gray-800">
                                    Email
                                </TableHead>
                                <TableHead className="text-xl font-bold text-gray-800">
                                    Joined at
                                </TableHead>
                                <TableHead className="text-xl font-bold text-gray-800">
                                    Role
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userData &&
                                userData.length > 0 &&
                                userData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item?._id}</TableCell>
                                        <TableCell>{item?.name}</TableCell>
                                        <TableCell>{item?.email}</TableCell>
                                        <TableCell>
                                            {moment(item?.createdAt).format(
                                                "DD-MMM-YYYY HH:MM"
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.isAdmin == false ? (
                                                <Button
                                                    disabled={generalLoading}
                                                    className="bg-gray-800 w-[120px] hover:cursor-pointer hover:bg-gray-600"
                                                    onClick={() => {
                                                        setIsOpen(true);
                                                        setUserAdminId(
                                                            item?._id
                                                        );
                                                    }}
                                                >
                                                    Make Admin
                                                </Button>
                                            ) : (
                                                <Button
                                                    disabled={generalLoading}
                                                    className="bg-red-800 w-[120px] hover:cursor-pointer hover:bg-red-600"
                                                    onClick={() => {
                                                        setIsOpen(true);
                                                        setUserAdminId(
                                                            item?._id
                                                        );
                                                    }}
                                                >
                                                    Remove Admin
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    handleAction={handleMakeOrRemoveAdmin}
                />
            )}
        </div>
    );
};

export default UsersPage;
