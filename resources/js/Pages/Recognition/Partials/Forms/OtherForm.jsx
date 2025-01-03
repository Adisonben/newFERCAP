import React from "react";
import { Button, styled } from "@mui/material";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";

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

const OtherForm = () => {
    return (
        <>
            <div>
                <p>Assessments</p>
                <div className="mb-4 border px-4 py-2 rounded-lg">
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
                <p>Propose Survey Date</p>
                <div className="py-2 flex gap-4 px-4">
                    <div className="mb-4 w-full text-center">
                        <InputLabel htmlFor="start_date" value="Start Date" />

                        <TextInput
                            id="start_date"
                            type="date"
                            className="mt-1 block w-full"
                            // value={data.start_date}
                            // onChange={(e) => setData("start_date", e.target.value)}
                            required
                            autoComplete="start_date"
                        />

                        <InputError className="mt-2" message={""} />
                    </div>
                    <div className="mb-4 w-full text-center">
                        <InputLabel htmlFor="end_date" value="End Date" />

                        <TextInput
                            id="end_date"
                            type="date"
                            className="mt-1 block w-full"
                            // value={data.end_date}
                            // onChange={(e) => setData("end_date", e.target.value)}
                            required
                            autoComplete="end_date"
                        />

                        <InputError className="mt-2" message={""} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default OtherForm;
