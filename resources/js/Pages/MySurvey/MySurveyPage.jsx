import React, { useState, useEffect } from "react";
import MySurveyCalendar from "./Partials/MySurveyCalendar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import RespAlert from "@/Components/RespAlert";
import MySurveyTable from "./Partials/MySurveyTable";
import { CalendarMonth, TableRows } from "@mui/icons-material";
import { Button } from "@mui/material";

const MySurveyPage = ({ resFormBack, surveys }) => {
    const [showAlert, setShowAlert] = useState(false);
        const [showCalendar, setShowCalendar] = useState(false);

        const eventList = surveys.map((survey) => {
            return {
                id: survey.id,
                survey_id: survey.survey_id,
                title: "0" + survey.id + " : " + survey.simp_recognition?.institute,
                start: survey.start_date.split(" ")[0],
                end: survey.end_date.split(" ")[0],
                color: survey.is_surveyor_team?.status
                    ? "green"
                    : "grey",
                description: survey.description,
                status: survey.is_surveyor_team?.status || false,
            };
        });
        useEffect(() => {
            if (resFormBack?.success) {
                setShowAlert(true);
            }
            if (resFormBack?.error) {
                setShowAlert(true);
            }
        }, [resFormBack?.timestamp]); // Use timestamp to trigger effect
  return (
    <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    My Survey
                </h2>
            }
        >
            <Head title="My Survey" />
            <RespAlert
                showAlert={showAlert}
                resp={resFormBack}
                handleCloseAlert={() => setShowAlert(false)}
            />
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    <div className="flex justify-between mb-4">
                        <p className="text-xl font-bold">
                            My Surveys{" "}{showCalendar ? "(Calendar)" : "(Table)"}
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={() => setShowCalendar(!showCalendar)}
                            >
                                {showCalendar ? (
                                    <TableRows />
                                ) : (
                                    <CalendarMonth />
                                )}
                            </Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {showCalendar ? (
                            <MySurveyCalendar eventList={eventList} />
                        ) : (
                            <MySurveyTable surveys={surveys} />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
  )
}

export default MySurveyPage
