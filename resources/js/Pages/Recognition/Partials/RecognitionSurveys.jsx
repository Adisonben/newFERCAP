import React, { useState } from "react";
import SurveyTable from "./Table/SurveyTable";
import { Add, CalendarMonth, TableRows } from "@mui/icons-material";
import { Button } from "@mui/material";
import SurveyModal from "./Forms/SurveyModal";
import { useForm } from "@inertiajs/react";
import PermissionGuard from "@/Components/PermissionGuard";
import SurveyCalendar from "@/Components/SurveyCalendar";

const RecognitionSurveys = ({ rec_id = '', surveys = [], role_name = "" }) => {
    const [creatingSurvey, setCreatingSurvey] = useState(false);
    const currentDate = new Date();
    const [showCalendar, setShowCalendar] = useState(false);
    const eventList = surveys.map((survey) => {
        return {
            id: survey.id,
            title: "0"+ survey.id + " : " + survey.simp_recognition?.institute,
            start: survey.start_date.split(" ")[0],
            end: survey.end_date.split(" ")[0],
            color: {
                1 : "blue",
                0 : "grey",
                2 : "red",
            } [survey.status],
            description: survey.description,
        };
    })

    const { data, setData, reset, post, processing, errors } = useForm({
        start_date: currentDate.toISOString().split("T")[0],
        end_date: "",
        fercap_group: "",
        description: "",
        recognition_id: rec_id,
    });

    const createSurvey = () => {
        setCreatingSurvey(true);
    };

    const closeModal = () => {
        if (processing) {
            return;
        } else {
            setCreatingSurvey(false);
            reset();
        }
    };

    const handleStoreSurvey = (e) => {
        e.preventDefault();
        post(route("surveys.store"), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
            },
        });
    };

    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border">
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="flex justify-between mb-4">
                    <p className="text-xl font-bold">Recognition Surveys {showCalendar ? "(Calendar)" : "(Table)"}</p>
                    <div className="flex gap-2">
                        <PermissionGuard
                            userRole={role_name}
                            permissionName="add_survey"
                        >
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                startIcon={<Add />}
                                onClick={createSurvey}
                            >
                                Create
                            </Button>
                        </PermissionGuard>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => setShowCalendar(!showCalendar)}
                        >
                            {showCalendar ? <TableRows /> : <CalendarMonth />}
                        </Button>
                        <SurveyModal
                            show={creatingSurvey}
                            onClose={closeModal}
                            onSubmit={handleStoreSurvey}
                            data={data}
                            setData={(field, value) => setData(field, value)}
                            errors={errors}
                            processing={processing}
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    {showCalendar ? (
                        <SurveyCalendar eventList={eventList} />
                    ) : (
                        <SurveyTable surveys={surveys} role_name={role_name} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecognitionSurveys;
