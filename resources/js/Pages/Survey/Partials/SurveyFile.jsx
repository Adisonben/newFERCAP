import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import SurveyUploadFilesModal from "./SurveyUploadFilesModal";
import SurveyFileItem from "./SurveyFileItem";
import DeleteModal from "@/Components/DeleteModal";
import PermissionGuard from "@/Components/PermissionGuard";

const SurveyFile = ({ survey_id, role_name }) => {
    const [showUploadFilesModal, setShowUploadFilesModal] = useState(false);
    const [surveyFiles, setSurveyFiles] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteSurveyFileId, setDeleteSurveyFileId] = useState(null);

    const getSurveyFiles = async () => {
        const res = await axios
            .get(`/api/survey/${survey_id}/files/public`)
            .then((response) => {
                const fileResponse = response.data.map((file) => {
                    return {
                        ...file.get_file_data,
                        type: file.file_type,
                        survey_file_id: file.id,
                    };
                });
                setSurveyFiles(fileResponse);
            });
    };

    useEffect(() => {
        getSurveyFiles();
    }, []);

    const handleDeleteShow = (SurveyFileId) => {
        setDeleteSurveyFileId(SurveyFileId);
        setShowDeleteModal(true);
    };

    const handleDeleteClose = () => {
        setDeleteSurveyFileId(null);
        setShowDeleteModal(false);
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        await axios
            .delete(`/api/survey-file/delete/${deleteSurveyFileId}`)
            .then((response) => {
                if (response.status === 200) {
                    getSurveyFiles();
                    setDeleteSurveyFileId(null);
                    setShowDeleteModal(false);
                } else {
                    console.log("Error deleting survey file.");
                }
            })
            .catch((error) => {
                console.log("Error deleting survey file.");
            });
    };

    return (
        <>
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="flex justify-between mb-4">
                    <p className="text-xl font-bold">Servey Files</p>
                    <div>
                        <PermissionGuard
                            userRole={role_name}
                            permissionName="add_survey_file"
                        >
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => setShowUploadFilesModal(true)}
                            >
                                Add file
                            </Button>
                        </PermissionGuard>
                    </div>
                </div>
                <div className="overflow-y-auto h-80">
                    <div className="space-y-2 mb-4">
                        {surveyFiles?.map((fileData, index) => (
                            <SurveyFileItem
                                key={index}
                                fileData={fileData}
                                handleDeleteShow={handleDeleteShow}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <SurveyUploadFilesModal
                survey_id={survey_id}
                show={showUploadFilesModal}
                onClose={() => setShowUploadFilesModal(false)}
                getSurveyFiles={getSurveyFiles}
            />
            <DeleteModal
                show={showDeleteModal}
                onClose={handleDeleteClose}
                onSubmit={handleDeleteSubmit}
                title="Survey File"
            />
        </>
    );
};

export default SurveyFile;
