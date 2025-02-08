import React from "react";
import { Description, Visibility, FileDownload } from "@mui/icons-material";

const FileDesign = () => {
    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
                <Description className="h-5 w-5 text-gray-500" />
                <div>
                    <p className="text-sm font-medium text-gray-900">
                        file name
                    </p>
                    <p className="text-xs text-gray-500">file type</p>
                </div>
            </div>
            <div className="flex space-x-2">
                <button className="p-1 hover:bg-gray-200 rounded" title="View">
                    <Visibility className="h-4 w-4 text-gray-600" />
                </button>

                <button
                    className="p-1 hover:bg-gray-200 rounded"
                    title="Download"
                >
                    <FileDownload className="h-4 w-4 text-gray-600" />
                </button>
            </div>
        </div>
    );
};

export default FileDesign;
