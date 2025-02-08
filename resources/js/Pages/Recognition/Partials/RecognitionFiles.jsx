import React, { useEffect, useState } from "react";
import FileItem from "@/Components/FileItem";
import { Button } from "@mui/material";
import RecognitionUploadFileModal from "./RecognitionUploadFileModal";
import { recognitionFileTypes } from "@/Functions/MasterDatas";
import DeleteModal from "@/Components/DeleteModal";

const RecognitionFiles = ({ rec_id, rec_status }) => {
    const [files, setFiles] = useState([]);
    const [showUploadFilesModal, setShowUploadFilesModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteRecFileId, setDeleteRecFileId] = useState(null);

    const fetchFiles = async () => {
        try {
            const response = await axios.get(
                `/api/recognition-files/${rec_id}`
            );
            const fileResponse = response.data.map((file) => {
                return {
                    ...file.get_file,
                    file_type: file.file_type,
                    rec_file_id: file.id,
                };
            });
            setFiles(fileResponse);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleDeleteShow = (RecFileId) => {
        setDeleteRecFileId(RecFileId);
        setShowDeleteModal(true);
    };

    const handleDeleteClose = () => {
        setDeleteRecFileId(null);
        setShowDeleteModal(false);
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        await axios
            .delete(`/api/recognition-file/delete/${deleteRecFileId}`)
            .then((response) => {
                if (response.status === 200) {
                    fetchFiles();
                    setDeleteRecFileId(null);
                    setShowDeleteModal(false);
                } else {
                    console.log("Error deleting recognition file.");
                }
            })
            .catch((error) => {
                console.log("Error deleting recognition file.");
            });
    };

    return (
        <>
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="flex justify-between mb-4">
                    <p className="text-xl font-bold">Recognition Files</p>
                    <div>
                        {rec_status !== 0 && rec_status !== 3 && (
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => setShowUploadFilesModal(true)}
                            >
                                Add file
                            </Button>
                        )}
                    </div>
                </div>
                <div className="overflow-y-auto max-h-[850px]">
                    {recognitionFileTypes?.map((fileType) => (
                        <div key={fileType.id}>
                            <div>
                                <p className="font-bold">{fileType.label}</p>
                            </div>
                            <div className="space-y-2 mb-4">
                                {files?.filter(
                                    (file) => file.file_type === fileType.name
                                ).length > 0 ? (
                                    files
                                        .filter(
                                            (file) =>
                                                file.file_type === fileType.name
                                        )
                                        .map((file) => (
                                            <FileItem
                                                key={file.id}
                                                fileData={file}
                                                handleDeleteShow={
                                                    handleDeleteShow
                                                }
                                            />
                                        ))
                                ) : (
                                    <div className="p-3 bg-gray-200 rounded mb-4">
                                        <p className="text-center">
                                            Not have any file yet.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <RecognitionUploadFileModal
                show={showUploadFilesModal}
                onClose={() => setShowUploadFilesModal(false)}
                rec_id={rec_id}
                fetchFiles={fetchFiles}
            />
            <DeleteModal
                show={showDeleteModal}
                onClose={handleDeleteClose}
                onSubmit={handleDeleteSubmit}
                title="Recognition File"
            />
        </>
    );
};

export default RecognitionFiles;
