import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SurveyInfo from "./Partials/SurveyInfo";
import SurveyFile from "./Partials/SurveyFile";
import { Head } from "@inertiajs/react";
import RespAlert from "@/Components/RespAlert";
import DiscussionsCard from "./Discussions/DiscussionsCard";

const disscussionTypes = [
    { type: "report", label: "Survey Report" },
    { type: "action_plan", label: "Action Plan" },
    { type: "evaluation", label: "Survey team evaluation" },
]

const SurveyDetail = ({ survey, resFormBack, disscussionRooms, role_name }) => {
    const [showAlert, setShowAlert] = useState(false);
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
                    Survey Detail
                </h2>
            }
        >
            <Head title="Survey Detail" />
            <RespAlert
                showAlert={showAlert}
                resp={resFormBack}
                handleCloseAlert={() => setShowAlert(false)}
            />
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-5 mb-4">
                <div className="xl:col-span-3 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border">
                    <SurveyInfo survey={survey} role_name={role_name} />
                </div>
                <div className="xl:col-span-2 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border">
                    <SurveyFile survey_id={survey.id} />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 mb-4">
                {disscussionTypes.map((Distype, index) => (
                    <div key={index} className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border">
                        <DiscussionsCard typeData={Distype} role_name={role_name} survey_id={survey.survey_id} roomDatas={disscussionRooms?.filter((roomData) => roomData.room_type === Distype.type)} />
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
};

export default SurveyDetail;
