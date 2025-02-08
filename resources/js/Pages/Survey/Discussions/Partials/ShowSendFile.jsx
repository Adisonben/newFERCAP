import React from "react";
import { Description, Visibility, FileDownload, CheckBox, DisabledByDefault } from "@mui/icons-material";
import { getFileSize } from "@/Functions/DataConvert";

const ShowSendFile = ({fileData, clearFileInput}) => {
    return (
        <div className="flex items-center gap-2 justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors min-w-60">
            <div className="flex items-center space-x-3">
                <Description className="h-5 w-5 text-gray-500" />
                <div>
                    <p className="text-sm font-medium text-gray-900">
                        {fileData.name}
                    </p>
                    <p className="text-xs text-gray-500">Size {getFileSize(fileData.size)} {fileData.size > (1024*1024*5) && <span className="text-red-500">This file is larger than 5MB</span>}</p>
                </div>
            </div>
            <div className="flex">
                <button className="hover:bg-gray-200 rounded" title="View" onClick={() => clearFileInput()}>
                    <DisabledByDefault className="h-4 w-4 text-gray-600" />
                </button>

                {/* <button
                    className="p-1 hover:bg-gray-200 rounded"
                    title="Download"
                >
                    <FileDownload className="h-4 w-4 text-gray-600" />
                </button> */}
            </div>
        </div>
    );
};

export default ShowSendFile;
