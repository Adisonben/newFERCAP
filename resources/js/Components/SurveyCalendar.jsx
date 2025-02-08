import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import Modal from "@/Components/Modal";
import dayGridPlugin from "@fullcalendar/daygrid";
import Button from "@mui/material/Button";
import { router } from "@inertiajs/react";
import InfoRow from "./InfoRow";

/*
    eventList = [
        {
            id: 1,
            title: "Survey01",
            description: "Description of Survey01",
            start: "2021-10-01",
            end: "2021-10-02",
            color: "blue",
        },
        {
            id: 2,
            title: "Survey02",
            description: "Description of Survey02",
            start: "2021-10-03",
            end: "2021-10-04",
            color: "grey",
        },
    ]
*/

const SurveyCalendar = ({ eventList }) => {
    const [showEventModal, setShowEventModal] = useState(false);
    const [eventData, setEventData] = useState({
        id: "",
        title: "",
        description: "",
        startDate: "",
        endDate: "",
    });

    const closeEventModal = () => {
        setEventData({
            id: "",
            title: "",
            description: "",
            startDate: "",
            endDate: "",
        });
        setShowEventModal(false);
    };

    const handleEventClick = (info) => {
        setEventData({
            id: info.event.id,
            title: info.event.title,
            description: info.event.extendedProps.description,
            startDate: info.event.startStr,
            endDate: info.event.endStr || info.event.startStr,
        });
        setShowEventModal(true);
    };

    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border">
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={eventList}
                    eventClick={(info) => handleEventClick(info)}
                    dayMaxEvents={true}
                    timeZone="th-TH"
                />
                <Modal show={showEventModal} onClose={closeEventModal}>
                    <div className="px-6 py-4">
                        <h2 className="text-lg text-center font-medium text-gray-900 dark:text-gray-100">
                            Survey0{eventData.id}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InfoRow
                                    label="Institute"
                                    value={eventData.title}
                                />
                                <InfoRow
                                    label="Description"
                                    value={eventData.description}
                                />
                            </div>
                            <div>
                                <InfoRow
                                    label="Start Date"
                                    value={eventData.startDate}
                                />
                                <InfoRow
                                    label="End Date"
                                    value={eventData.endDate}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default SurveyCalendar;
