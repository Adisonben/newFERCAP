import React from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Button, styled } from "@mui/material";

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

const MemberForm = () => {
    return (
        <>
            <div>
                <p>List of member</p>
                <div className="mb-4 border px-4 py-2 rounded-lg">
                    <div>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            size="small"
                            // startIcon={<CloudUploadIcon />}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) =>
                                    console.log(event.target.files)
                                }
                                multiple
                            />
                        </Button>
                    </div>
                </div>
                <p>List of Staffs</p>
                <div className="mb-4 border px-4 py-2 rounded-lg">
                    <div>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            size="small"
                            // startIcon={<CloudUploadIcon />}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) =>
                                    console.log(event.target.files)
                                }
                                multiple
                            />
                        </Button>
                    </div>
                </div>
                <p>List of SOPs with English titles</p>
                <div className="mb-4 border px-4 py-2 rounded-lg">
                    <div>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            size="small"
                            // startIcon={<CloudUploadIcon />}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) =>
                                    console.log(event.target.files)
                                }
                                multiple
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MemberForm;
