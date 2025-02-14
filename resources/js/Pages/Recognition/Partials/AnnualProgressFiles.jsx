import React, { useEffect, useState } from "react";
import FileItem from "@/Components/FileItem";
import { Button } from "@mui/material";
import { recognitionFileTypes } from "@/Functions/MasterDatas";
import DeleteModal from "@/Components/DeleteModal";

const AnnualProgressFiles = ({ rec_id, toggleFetch }) => {
    const [files, setFiles] = useState([]);
    const [showUploadFilesModal, setShowUploadFilesModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteRecFileId, setDeleteRecFileId] = useState(null);

    const fetchFiles = async () => {
        try {
            const response = await axios.get(
                `/api/annual-progress-files/${rec_id}`
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
    }, [toggleFetch]);

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
                <div className="overflow-y-auto max-h-[850px]">
                    {files?.length > 0 ? (
                        files.map((file) => (
                                <FileItem
                                    key={file.id}
                                    fileData={file}
                                    handleDeleteShow={handleDeleteShow}
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
            <DeleteModal
                show={showDeleteModal}
                onClose={handleDeleteClose}
                onSubmit={handleDeleteSubmit}
                title="Recognition File"
            />
        </>
    );
};

export default AnnualProgressFiles;
