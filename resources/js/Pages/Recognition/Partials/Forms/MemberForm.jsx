import React, { useState, useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Button, styled, Alert } from "@mui/material";
import { router } from "@inertiajs/react";
import axios from "axios";
import { CloudUpload, Delete } from "@mui/icons-material";

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

const MemberForm = ({ data, setData }) => {
    // const [membeFile, setMemberFile] = useState(null);
    // const [staffFile, setStaffFile] = useState(null);
    // const [sopFile, setSopFile] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (errors) {
            const timer = setTimeout(() => {
                setErrors(null);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [errors]);

    const handleUpload = async (fileUpload, fileType) => {
        const formData = new FormData();
        formData.append(`file_store`, fileUpload);
        formData.append(`file_type`, fileType);

        try {
            const response = await axios.post("/api/upload-file", formData);
            if (response.status === 200) {
                switch (fileType) {
                    case "members":
                        // setMemberFile(response.data);
                        setData("rec_files", {
                            ...data.rec_files,
                            members: response.data,
                        });
                        break;
                    case "staffs":
                        // setStaffFile(response.data);
                        setData("rec_files", {
                            ...data.rec_files,
                            staffs: response.data,
                        })
                        break;
                    case "sops":
                        // setSopFile(response.data);
                        setData("rec_files", {
                            ...data.rec_files,
                            sops: response.data,
                        })
                        break;
                    default:
                        break;
                }
                console.log("File uploaded successfully");
            } else {
                console.log("Failed to upload file");
            }
        } catch (error) {
            console.log("error uploading file");
        }
    };

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        const fileType = event.target.id;
        handleUpload(uploadedFile, fileType);
    };

    const deleteFile = async (file_type) => {
        // setFile(null);
        const response = await axios.delete(`/api/delete-file/${data.rec_files[file_type].file_id}`);
        if (response.status === 200) {
            console.log("File deleted successfully");
            setData("rec_files", {
                ...data.rec_files,
                [file_type]: null,
            });
        } else {
            console.log("Failed to delete file");
            setErrors("Failed to delete file");
        }
    };

    return (
        <>
            <div>
                {errors && <Alert severity="error" className="mb-2" >{errors}</Alert>}
                <p>List of member</p>
                <div className="mb-4 border px-4 py-2 rounded-lg">
                    <div>
                        {data.rec_files?.members ? (
                            <div className="flex justify-between items-center">
                                <p>{data.rec_files.members.file_name}</p>
                                <Button
                                    component="label"
                                    variant="contained"
                                    tabIndex={-1}
                                    size="small"
                                    color="error"
                                    onClick={() => deleteFile("members")}
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
                                    id="members"
                                    onChange={(event) =>
                                        handleFileChange(event)
                                    }
                                />
                            </Button>
                        )}
                    </div>
                </div>
                <p>List of Staffs</p>
                <div className="mb-4 border px-4 py-2 rounded-lg">
                    <div>
                        {data.rec_files?.staffs ? (
                            <div className="flex justify-between items-center">
                                <p>{data.rec_files.staffs.file_name}</p>
                                <Button
                                    component="label"
                                    variant="contained"
                                    tabIndex={-1}
                                    size="small"
                                    color="error"
                                    onClick={() => deleteFile("staffs")}
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
                                    id="staffs"
                                    onChange={(event) =>
                                        handleFileChange(event)
                                    }
                                />
                            </Button>
                        )}
                    </div>
                </div>
                <p>List of SOPs with English titles</p>
                <div className="mb-4 border px-4 py-2 rounded-lg">
                    <div>
                        {data.rec_files?.sops ? (
                            <div className="flex justify-between items-center">
                                <p>{data.rec_files.sops.file_name}</p>
                                <Button
                                    component="label"
                                    variant="contained"
                                    tabIndex={-1}
                                    size="small"
                                    color="error"
                                    onClick={() => deleteFile("sops")}
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
                                    id="sops"
                                    onChange={(event) =>
                                        handleFileChange(event)
                                    }
                                />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MemberForm;
