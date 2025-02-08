import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import RecognitionInfo from "./Partials/RecognitionInfo";
import RecognitionSurveys from "./Partials/RecognitionSurveys";
import RecognitionFiles from "./Partials/RecognitionFiles";
import { Head } from "@inertiajs/react";
import RespAlert from "@/Components/RespAlert";

const RecognitionDetail = ({ recognition, resFormBack, surveys, role_name }) => {
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
                    Recognition Detail
                </h2>
            }
        >
            <Head title="Recognition Detail" />
            <RespAlert
                showAlert={showAlert}
                resp={resFormBack}
                handleCloseAlert={() => setShowAlert(false)}
            />
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-5 mb-4">
                <div className="xl:col-span-3 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border">
                    <RecognitionInfo recognition={recognition} />
                </div>
                <div className="xl:col-span-2 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border">
                    <RecognitionFiles rec_id={recognition.id} rec_status={recognition.status} />
                </div>
            </div>
            {(recognition.status !== 0 && recognition.status !== 3) && (
                <div className="mb-4">
                    <RecognitionSurveys rec_id={recognition.id} surveys={surveys} role_name={role_name} />
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default RecognitionDetail;
