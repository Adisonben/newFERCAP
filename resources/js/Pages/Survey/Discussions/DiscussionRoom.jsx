import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import ChatRoom from "./ChatRoom";
import { Button } from "@mui/material";
import RespAlert from "@/Components/RespAlert";
import ShowSubmitFile from "./Partials/ShowSubmitFile";
import PermissionGuard from "@/Components/PermissionGuard";

const DiscussionRoom = ({ roomData, resFormBack, submitedFile, role_name }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [roomStatus, setRoomStatus] = useState(roomData.status? true : false);
    useEffect(() => {
        if (resFormBack?.success) {
            setShowAlert(true);
        }
        if (resFormBack?.error) {
            setShowAlert(true);
        }
    }, [resFormBack?.timestamp]); // Use timestamp to trigger effect

    const handleSubmitFile = (fileId) => {
        router.post(`/api/discussion-file/submit`, {
            file_id: fileId,
            room_id: roomData.id,
        });
    };

    const handleRemoveFile = () => {
        router.get(`/api/discussion-file/remove/${submitedFile?.id}`);
    }

    const handleRejectFile = () => {
        router.get(`/api/discussion-file/submit/reject/${submitedFile?.id}`);
    }

    const handleApproveFile = () => {
        router.get(`/api/discussion-file/submit/approve/${submitedFile?.id}`);
    }

    const handleCloseRoom = (setStatus) => {
        axios.get(`/api/discussion-room/${roomData.id}/toggle-status/${setStatus ? 1 : 0}`).then(() => {
            setRoomStatus(setStatus);
        });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {roomData.room_title} Discussion (
                    {roomData?.get_target_role?.codename == "ec"
                        ? "FERCAP - EC"
                        : "FERCAP - Survey Team"}
                    )
                </h2>
            }
        >
            <Head title="Discussion Room" />
            <RespAlert
                showAlert={showAlert}
                resp={resFormBack}
                handleCloseAlert={() => setShowAlert(false)}
            />
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-5 mb-4 h-full">
                <div className="xl:col-span-3 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border">
                    <ChatRoom
                        roomId={roomData.room_id}
                        roomStatus={roomStatus}
                        setRoomStatus={handleCloseRoom}
                        onSubmitFile={handleSubmitFile}
                        submitedFile={submitedFile?.file_data}
                        role_name={role_name}
                    />
                </div>
                <div className="xl:col-span-2 overflow-hidden sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100 bg-white border shadow-sm">
                        <div className="flex justify-center mb-4">
                            <p className="text-xl font-bold">
                                {roomData.room_title} Submit
                            </p>
                        </div>
                        <div className="overflow-y-auto min-h-40">
                            <div>
                                <p className="font-bold">File</p>
                            </div>
                            <div className="space-y-2 mb-4">
                                <ShowSubmitFile fileData={submitedFile?.file_data} status={submitedFile?.status} />
                            </div>
                            <div>
                                <p className="font-bold">Action</p>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <PermissionGuard userRole={role_name} permissionName="handle_discussion_file">
                                    <Button variant="contained" color="success" onClick={() => handleApproveFile()} disabled={submitedFile?.status === 0}>
                                        {submitedFile?.status === 2 ? "Unapprove" : "Approve"}
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleRejectFile()} disabled={submitedFile?.status === 2}>
                                        {submitedFile?.status === 0 ? "Unreject" : "Reject"}
                                    </Button>
                                    <Button variant="contained" color="warning" onClick={() => handleRemoveFile()} disabled={submitedFile?.status === 2}>
                                        Remove
                                    </Button>
                                </PermissionGuard>
                                <Button variant="contained" onClick={() => window.history.back()}>
                                    Go back
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default DiscussionRoom;
