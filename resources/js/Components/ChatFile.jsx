import React from "react";
import { Description, CheckBox, ThumbDown, ThumbUp } from "@mui/icons-material";
import { getFileSize } from "@/Functions/DataConvert";
import { router } from "@inertiajs/react";
import PermissionGuard from "./PermissionGuard";

const ChatFile = ({
    fileData,
    onSubmitFile,
    submitedFile,
    messageId,
    fileStatus,
    setRefresh,
    refresh,
    role_name = "",
}) => {
    const handleRejectFile = async (fileId) => {
        try {
            const response = await axios.post(`/api/discussion-file/reject`, {
                file_id: fileId,
                message_id: messageId,
            });
            if (response.status === 200) {
                setRefresh(!refresh);
            } else {
                console.error("Failed to reject file!");
            }
        } catch (error) {
            console.error("Failed to reject file!");
        }
    };

    return (
        <div
            className={
                "flex items-center gap-2 justify-between p-2  transition-colors min-w-60 " +
                (submitedFile?.id == fileData.id
                    ? "bg-green-300 hover:bg-green-200 text-gray-500"
                    : fileStatus === 0
                    ? "bg-red-500 text-white"
                    : "bg-gray-50 text-gray-500")
            }
        >
            <div className="flex items-center space-x-3">
                <Description className="h-5 w-5" />
                <a
                    href={`/${fileData.folder}/${fileData.file_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p className="text-sm font-medium text-gray-900">
                        {fileData.original_name}
                    </p>
                    <p className="text-xs">Size {getFileSize(fileData.size)}</p>
                </a>
            </div>
            {submitedFile?.id !== fileData.id && (
                <div className="flex">
                    <PermissionGuard
                        userRole={role_name}
                        permissionName="submit_discussion_file"
                    >
                        <button
                            className=" hover:bg-gray-200 rounded"
                            title="View"
                            onClick={() => onSubmitFile(fileData.id)}
                        >
                            <CheckBox className="h-4 w-4" />
                        </button>
                    </PermissionGuard>
                    <PermissionGuard
                        userRole={role_name}
                        permissionName="reject_discussion_file"
                    >
                        <button
                            className=" hover:bg-gray-200 rounded"
                            title="View"
                            onClick={() => handleRejectFile(fileData.id)}
                        >
                            {fileStatus === 0 ? (
                                <ThumbUp className="h-4 w-4" />
                            ) : (
                                <ThumbDown className="h-4 w-4" />
                            )}
                        </button>
                    </PermissionGuard>
                </div>
            )}
        </div>
    );
};

export default ChatFile;
