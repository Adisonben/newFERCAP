import React, {useState, useEffect} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InfoForm from "./Partials/Forms/InfoForm";
import MemberForm from "./Partials/Forms/MemberForm";
import OtherForm from "./Partials/Forms/OtherForm";
import ProtocolForm from "./Partials/Forms/ProtocolForm";
import { Button } from "@mui/material";
import RespAlert from "@/Components/RespAlert";

const EditRecognitionPage = ({ resFormBack, recognition, rec_files, fullboardProtocols, expeditedProtocols }) => {
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        if (resFormBack?.error) {
            setShowAlert(true);
        }
    }, [resFormBack?.timestamp]); // Use timestamp to trigger effect

    const { id, recognition_id, created_by, expire_date, status, deleted_at, created_at, updated_at, ...filteredRecognition } = recognition;
    const { data, setData, reset, put, processing, errors } = useForm({
        ...filteredRecognition,
        // Protocols
        protocol_board_review: `${recognition.protocol_board_review}` || "",
        protocol_expedited_review: `${recognition.protocol_expedited_review}` || "",
        protocol_board_meeting: `${recognition.protocol_board_meeting}` || "",
        avg_members_per_meeting: `${recognition.avg_members_per_meeting}` || "",
        common_type: {
            full_board: fullboardProtocols || {},
            expedited: expeditedProtocols || {},
        },
        rec_files: rec_files || {
            members: null,
            staffs: null,
            sops: null,
            accessments: null,
        },
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("recognitions.update", recognition.id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Recognitions
                </h2>
            }
        >
            <Head title="Edit Recognitions" />
            <RespAlert
                showAlert={showAlert}
                resp={resFormBack}
                handleCloseAlert={() => setShowAlert(false)}
            />
            <div>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className="flex justify-between mb-4">
                                    <p className="text-xl font-bold">
                                        General Information
                                    </p>
                                </div>
                                <div>
                                    <InfoForm
                                        data={data}
                                        setData={setData}
                                        errors={errors}
                                    />
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
                                        <ProtocolForm
                                            data={data}
                                            setData={setData}
                                            errors={errors}
                                        />
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
                                        <MemberForm
                                            data={data}
                                            setData={setData}
                                        />
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
                                        <OtherForm
                                            data={data}
                                            setData={setData}
                                            errors={errors}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        <Link href={route("recognitions.index")}>
                            <Button
                                type="button"
                                variant="contained"
                                color="error"
                                disabled={processing}
                                // onClick={createProtocolType}
                            >
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            disabled={processing}
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

export default EditRecognitionPage;
