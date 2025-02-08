import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SurveyInfo from "./Partials/SurveyInfo";
import SurveyTeam from "./Partials/SurveyTeam";
import { Head } from "@inertiajs/react";
import RespAlert from "@/Components/RespAlert";

const EditSurveyTeam = ({ survey, resFormBack, teamList }) => {
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
                    Survey Team
                </h2>
            }
        >
            <Head title="Survey Team" />
            <RespAlert
                showAlert={showAlert}
                resp={resFormBack}
                handleCloseAlert={() => setShowAlert(false)}
            />
            <div>
                <div className="xl:col-span-3 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border">
                    <SurveyTeam survey_id={survey.id} teamList={teamList} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditSurveyTeam;
