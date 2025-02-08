import React, { useState, useEffect } from "react";
import { Button, styled, Alert } from "@mui/material";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { CloudUpload } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const OtherForm = ({ data, setData, errors }) => {
    // const [accessmentFiles, setAccessmentFiles] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleUpload = async (fileUpload, fileType) => {
        const formData = new FormData();
        formData.append(`file_store`, fileUpload);
        formData.append(`file_type`, fileType);

        try {
            const response = await axios.post("/api/upload-file", formData);
            if (response.status === 200) {
                switch (fileType) {
                    case "accessments":
                        setData("rec_files", {
                            ...data.rec_files,
                            accessments: response.data,
                        });
                        break;
                    default:
                        break;
                }
                console.log("File uploaded successfully.");
            } else {
                console.log("Failed to upload file");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        const fileType = event.target.id;
        handleUpload(uploadedFile, fileType);
    };

    const deleteFile = async (file_type) => {
        // setFile(null);
        const response = await axios.delete(
            `/api/delete-file/${data.rec_files[file_type].file_id}`
        );
        if (response.status === 200) {
            console.log("File deleted successfully");
            setData("rec_files", {
                ...data.rec_files,
                [file_type]: null,
            });
        } else {
            console.log("Failed to delete file");
            setError("Failed to delete file");
        }
    };

    return (
        <>
            <div>
                {error && <Alert severity="error" className="mb-2" >{error}</Alert>}
                <p>Assessments</p>
                <div className="mb-4 border px-4 py-2 rounded-lg">
                    {data.rec_files?.accessments ? (
                        <div className="flex justify-between items-center">
                            <p>{data.rec_files.accessments.file_name}</p>
                            <Button
                                component="label"
                                variant="contained"
                                tabIndex={-1}
                                size="small"
                                color="error"
                                onClick={() => deleteFile("accessments")}
                            >
                                Delete
                            </Button>
                        </div>
                    ) : (
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            size="small"
                            color="info"
                            startIcon={<CloudUpload />}
                        >
                            Upload file
                            <VisuallyHiddenInput
                                type="file"
                                id="accessments"
                                onChange={(event) => handleFileChange(event)}
                            />
                        </Button>
                    )}
                </div>
                <p>Propose Survey Date</p>
                <div className="py-2 flex gap-4 px-4">
                    <div className="mb-4 w-full text-center">
                        <InputLabel htmlFor="start_date" value="Start Date" />

                        <TextInput
                            id="start_date"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.propose_survey_start_date}
                            onChange={(e) =>
                                setData(
                                    "propose_survey_start_date",
                                    e.target.value
                                )
                            }
                            autoComplete="propose_survey_start_date"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.propose_survey_start_date}
                        />
                    </div>
                    <div className="mb-4 w-full text-center">
                        <InputLabel htmlFor="end_date" value="End Date" />

                        <TextInput
                            id="end_date"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.propose_survey_end_date}
                            onChange={(e) =>
                                setData(
                                    "propose_survey_end_date",
                                    e.target.value
                                )
                            }
                            autoComplete="propose_survey_end_date"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.propose_survey_end_date}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default OtherForm;
