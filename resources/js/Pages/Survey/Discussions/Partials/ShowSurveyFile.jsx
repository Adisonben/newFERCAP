import React from 'react'
import { Description, Visibility, FileDownload } from "@mui/icons-material";
import { getFileSize } from "@/Functions/DataConvert";

const ShowSurveyFile = ({ fileData = []}) => {
    const cardCass = {
        0: "bg-gray-50 rounded text-gray-500",
        1: "bg-green-500 rounded text-white"
    }[Object.keys(fileData).length > 0 ? 1 : 0];
  return (
    <div className={"flex items-center justify-between p-3  transition-colors " + cardCass}>
            {Object.keys(fileData).length > 0 ? (
                <>
                    <div className="flex items-center space-x-3">
                        <Description className="h-5 w-5 " />
                        <div>
                            <p className="text-sm font-medium ">
                                {fileData?.original_name}
                            </p>
                            <p className="text-xs ">
                                {fileData && getFileSize(fileData.size)}
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
                                className="p-1 rounded"
                                title="View"
                            >
                                <Visibility className="h-4 w-4 hover:text-gray-200" />
                            </button>
                        </a>

                        <a
                            href={"/api/download-file/" + fileData?.id}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                        >
                            <button
                                className="p-1 rounded"
                                title="Download"
                            >
                                <FileDownload className="h-4 w-4 hover:text-gray-200" />
                            </button>
                        </a>
                    </div>
                </>
            ) : (
                <p className="text-sm text-yellow-500 text-center w-full">No file approved yet.</p>
            )}
        </div>
  )
}

export default ShowSurveyFile
