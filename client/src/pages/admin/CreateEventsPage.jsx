import DateSelector from "@/components/project-components/DateSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/helper/showToast";
import { createEventFunction } from "@/redux/slices/eventSlice";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateEventsPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [guestName, setGuestName] = useState("");
  const [guestList, setGuestList] = useState([]);

  const [singleTicket, setSingleTicket] = useState({
    name: "",
    price: "",
    limit: "",
  });

  const [ticketList, setTicketList] = useState([]);

  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    eventOrganizer: "",
    eventGuests: [],
    eventAddress: "",
    eventCity: "",
    eventPinCode: "",
    eventDate: "",
    eventTime: "",
    eventMedia: [],
    eventTickets: [
      {
        name: "",
        price: 0,
        limit: 0,
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // console.log("Form Data", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(createEventFunction(formData)).unwrap();

      if (response.success) {
        showToast("success", `Success ${response.message}`);
        setFormData({});
        navigate("/admin/all-event");
      } else {
        showToast("error", `Error ${response.message}!`);
      }
    } catch (error) {
      console.log("error", error);
      showToast("error", `Error ${error.message}`);
    }
  };

  const addGuestHandle = (e) => {
    const updatedGuestList = [...guestList, guestName];

    setGuestList(updatedGuestList);

    setFormData({ ...formData, eventGuests: updatedGuestList });

    setGuestName("");
  };

  const removeGuestNameFromListHandle = (indexToRemove) => {
    const updatedGuestList = guestList.filter((e, i) => i !== indexToRemove);

    setGuestList(updatedGuestList);

    setFormData({ ...formData, eventGuests: updatedGuestList });
  };

  const ticketListHandle = (e) => {
    const updatedTicketList = [...ticketList, singleTicket];

    console.log("updatedTicketList", updatedTicketList);

    setTicketList(updatedTicketList);

    // console.log("ticketList", ticketList);

    setFormData({ ...formData, eventTickets: updatedTicketList });

    setSingleTicket({ name: "", price: 0, limit: 0 });
  };

  // console.log("formData", formData);

  const ticketsRemoveHandle = (index) => {
    // console.log("index", index);

    const updatedTicketList = ticketList.filter((e, id) => id !== index);

    setTicketList(updatedTicketList);
  };

  const handleDateChange = (date) => {
    // console.log("handleDateChange", date);

    const isoDate = moment(date).toISOString();

    setFormData({ ...formData, eventDate: isoDate });
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      eventTickets: ticketList,
    }));
  }, [ticketList]);

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 p-2">Create New Event</h1>
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
              placeholder="Enter Event Guests"
              value={guestName}
              type="text"
              onChange={(e) => setGuestName(e.target.value)}
            />
            <Button onClick={addGuestHandle}>Add Guest</Button>
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-full"></div>
          <div className="flex gap-2 w-full">
            {guestList &&
              guestList.map((e, i) => (
                <div
                  key={i}
                  className="border-2 p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                >
                  {e}{" "}
                  <IoIosClose
                    size={24}
                    onClick={() => removeGuestNameFromListHandle(i)}
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
              placeHolderMessage="Select Event Date"
              placeholder="Enter Event Date"
              name="eventDate"
              type="date"
              onChange={handleDateChange}
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
              placeholder="Ticket Type Name"
              name="name"
              value={singleTicket.name}
              onChange={(e) =>
                setSingleTicket({
                  ...singleTicket,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Input
              className="border-2 cursor-pointer hover:bg-gray-100 text-xl w-full"
              type="text"
              placeholder="Ticket Type Price"
              name="price"
              value={singleTicket.price}
              onChange={(e) =>
                setSingleTicket({
                  ...singleTicket,
                  [e.target.name]: Number(e.target.value),
                })
              }
            />
            <Input
              className="border-2 cursor-pointer hover:bg-gray-100 text-xl w-full"
              type="text"
              placeholder="Ticket Type Limit"
              name="limit"
              value={singleTicket.limit}
              onChange={(e) =>
                setSingleTicket({
                  ...singleTicket,
                  [e.target.name]: Number(e.target.value),
                })
              }
            />
            <Button onClick={ticketListHandle}>Add Ticket</Button>
          </div>
        </div>
        {ticketList && ticketList.length > 0 && (
          <div className="w-full flex">
            <div className="w-full text-xl font-bold text-gray-800">
              Ticket(s)
            </div>
            <div className="w-full items-center">
              {ticketList &&
                ticketList?.map((e, i) => (
                  <div key={i} className="flex gap-2 w-full">
                    <div className="flex w-full hover:bg-gray-100">
                      <Input value={e.name} className="w-full" disabled />
                      <Input value={e.price} className="w-full" disabled />
                      <Input value={e.limit} className="w-full" disabled />
                    </div>
                    <div onClick={() => ticketsRemoveHandle(i)}>
                      <IoIosClose size={42} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        <Button className="text-xl cursor-pointer" onClick={handleSubmit}>
          Create Event
        </Button>
      </div>
    </>
  );
};

export default CreateEventsPage;
