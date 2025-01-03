import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InfoForm from "./Partials/Forms/InfoForm";
import MemberForm from "./Partials/Forms/MemberForm";
import OtherForm from "./Partials/Forms/OtherForm";
import ProtocolForm from "./Partials/Forms/ProtocolForm";
import { Button } from "@mui/material";

const CreateRecognitionPage = () => {
    const { data, setData, reset, post, processing, errors } = useForm({
        // General Information
        institute: "",
        ec_name: "",
        address: "",
        city: "",
        state_province_region: "",
        zip_code: "",
        country: "",
        phone: "",
        website: "",
        contact_person: "",
        contact_email: "",
        contact_position: "",
        chairperson: "",
        chairperson_email: "",
        secretary: "",
        secretary_email: "",
        // Protocols
        protocol_board_review: "",
        protocol_expedited_review: "",
        protocol_board_meeting: "",
        avg_members_per_meeting: "",
        ethical_challenges: "",
        // Other
        propose_survey_start_date: "",
        propose_survey_end_date: "",
        expire_date: "",
        status: "",
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create Recognitions
                </h2>
            }
        >
            <Head title="Create Recognitions" />
            <div>
                <form action="">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className="flex justify-between mb-4">
                                    <p className="text-xl font-bold">
                                        General Information
                                    </p>
                                </div>
                                <div>
                                    <InfoForm data={data} setData={setData} />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    <div className="flex justify-between mb-4">
                                        <p className="text-xl font-bold">
                                            Protocols
                                        </p>
                                    </div>

                                    <div>
                                        <ProtocolForm />
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    <div className="flex justify-between mb-4">
                                        <p className="text-xl font-bold">
                                            Members
                                        </p>
                                    </div>
                                    <div>
                                        <MemberForm />
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    <div className="flex justify-between mb-4">
                                        <p className="text-xl font-bold">
                                            Other
                                        </p>
                                    </div>
                                    <div>
                                        <OtherForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        <Button
                            variant="contained"
                            color="error"
                            // onClick={createProtocolType}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            // onClick={createProtocolType}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateRecognitionPage;
