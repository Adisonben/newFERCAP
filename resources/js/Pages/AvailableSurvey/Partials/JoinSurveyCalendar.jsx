import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import Modal from "@/Components/Modal";
import dayGridPlugin from "@fullcalendar/daygrid";
import Button from "@mui/material/Button";
import { router } from "@inertiajs/react";
import InfoRow from "@/Components/InfoRow";

const JoinSurveyCalendar = ({ eventList }) => {
    const [showEventModal, setShowEventModal] = useState(false);
    const [eventData, setEventData] = useState({
        id: "",
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: false,
    });

    const closeEventModal = () => {
        setEventData({
            id: "",
            title: "",
            description: "",
            startDate: "",
            endDate: "",
            status: false,
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
            status: info.event.extendedProps.status || false,
        });
        setShowEventModal(true);
    };

    const handleJoinEvent = async (state) => {
        if (!eventData.id) return;
        router.get(`/api/survey/${state}/${eventData.id}`);
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

                        <div className="mt-4 flex gap-2 justify-center">
                            {eventData.status ? (
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleJoinEvent("leave")}
                                >
                                    Leave
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleJoinEvent("join")}
                                >
                                    Join
                                </Button>
                            )}
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default JoinSurveyCalendar;
