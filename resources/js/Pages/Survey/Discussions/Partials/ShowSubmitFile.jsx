import React from "react";
import { Description, Visibility, FileDownload } from "@mui/icons-material";
import { getFileSize } from "@/Functions/DataConvert";
import Chip from '@mui/material/Chip';
import { getDisFileStatus } from "@/Functions/DataConvert";

const ShowSubmitFile = ({ fileData = [], status = 1 }) => {
    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
            {Object.keys(fileData).length > 0 ? (
                <>
                    <div className="flex items-center space-x-3">
                        <Description className="h-5 w-5 text-gray-500" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                {fileData?.original_name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {fileData && getFileSize(fileData.size)}
                            </p>
                        </div>
                    </div>
                    <div>
                        <Chip label={getDisFileStatus(status).label} color={getDisFileStatus(status).color} />
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
                    </div>
                </>
            ) : (
                <p className="text-sm text-yellow-500 text-center w-full">No file submitted yet.</p>
            )}
        </div>
    );
};

export default ShowSubmitFile;
