import { showToast } from "@/helper/showToast";
import {
  cancelBookingTicketFunction,
  getBookingDetailsFunction,
} from "@/redux/slices/bookingSlice";
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
import Modal from "@/components/project-components/Modal";
import { refundPaymentFunction } from "@/redux/slices/paymentSlice";

const BookingPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.booked);

  const paymentLoading = useSelector((state) => state.payment);

  const [bookingData, setBookingData] = useState([]);

  const [bookedTicket, setBookingTicket] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

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

  // console.log("bookingData", bookingData);

  const refundPayment = async () => {
    try {
      const postData = {
        bookedPaymentId: bookedTicket?.paymentId,
        refundAmount: bookedTicket?.totalAmount,
        refundNotes: {
          eventName: bookedTicket?.event?.eventName,
          eventDate: bookedTicket?.event?.eventDate,
          ticketCount: bookedTicket?.ticketCount,
          user: bookedTicket?.user?.email,
          name: bookedTicket?.user?.name,
          description: "Cancellation",
        },
      };
      const response = await dispatch(refundPaymentFunction(postData)).unwrap();

      if (!response.success) {
        return showToast(
          "error",
          `Error! in payment refund! Contact Administrator`,
        );
      }

      showToast(
        "success",
        `Payment refund successfully done! Check account after 48 hours!`,
      );

      await getBookingsData();

      return;
    } catch (error) {
      showToast("error", `Error! ${error.message || error} `);
    }
  };

  const deleteBookedTicketHandler = async () => {
    // console.log("bookedTicket", bookedTicket);

    setIsOpen(false);

    const postData = {
      bookingId: bookedTicket?._id,
      eventId: bookedTicket?.event?._id,
      ticketType: bookedTicket?.ticketType,
      ticketCount: bookedTicket?.ticketCount,
    };

    try {
      const response = await dispatch(
        cancelBookingTicketFunction(postData),
      ).unwrap();

      if (!response.success) {
        showToast("error", `Error! ${response?.message}`);

        await getBookingsData();

        return;
      }

      await refundPayment();
    } catch (error) {
      showToast("error", `Error! ${error.message || error}`);
    }
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
            <TableCaption>User Bookings | Book My Events</TableCaption>
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
                  <TableRow key={index}>
                    <TableCell className="font-bold">
                      {item?.event?.eventName}
                    </TableCell>
                    <TableCell>
                      {moment(item?.event?.eventDate).format("DD MMMM YYYY")}
                    </TableCell>
                    <TableCell>{item?.event?.eventTime}</TableCell>
                    <TableCell>{`${item?.event?.eventAddress}, ${item?.event?.eventCity}- ${item?.event?.eventPinCode}`}</TableCell>
                    <TableCell className="font-bold">
                      {(item?.status).toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {item?.status == "booked" && (
                        <MdCancel
                          size="20"
                          className="cursor-pointer text-red-700 hover:text-red-400"
                          onClick={() => {
                            setBookingTicket(item);
                            setIsOpen(true);
                          }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleAction={deleteBookedTicketHandler}
      />
    </>
  );
};

export default BookingPage;
