import React from "react";
import { Description, Visibility, FileDownload, Delete } from "@mui/icons-material";
import { getDateString, getFileSize } from "@/Functions/DataConvert";
import { IconButton } from "@mui/material";

const FileItem = ({ fileData, handleDeleteShow }) => {
    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
                <Description className="h-5 w-5 text-gray-500" />
                <div>
                    <p className="text-sm font-medium text-gray-900">
                        {fileData?.original_name}
                    </p>
                    <p className="text-xs text-gray-500">
                        {fileData?.file_type} - {fileData && getFileSize(fileData.size)} - {getDateString(fileData.created_at)}
                    </p>
                </div>
            </div>
            <div className="flex space-x-2">
                <a
                    href={`/${fileData?.folder}/${fileData?.file_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button
                        className="p-1 hover:bg-gray-200 rounded"
                        title="View"
                    >
                        <Visibility className="h-4 w-4 text-gray-600" />
                    </button>
                </a>

                <a
                    href={"/api/download-file/" + fileData?.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                >
                    <button
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Download"
                    >
                        <FileDownload className="h-4 w-4 text-gray-600" />
                    </button>
                </a>
                <IconButton color="error" variant="contained" size="small" onClick={() => handleDeleteShow(fileData?.rec_file_id)}><Delete /></IconButton>
            </div>
        </div>
    );
};

export default FileItem;
