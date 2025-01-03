import React from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import { Button } from "@mui/material";
import { Input, InputAdornment, OutlinedInput } from "@mui/material";
import "../../../../css/form.css";

const ProtocolForm = () => {
    return (
        <>
            <form action="">
                <div className="mb-4">
                    <InputLabel
                        htmlFor="protocol_board_review"
                        value="protocol_board_review"
                    />

                    <TextInput
                        id="protocol_board_review"
                        className="mt-1 block w-full"
                        // value={data.protocol_board_review}
                        // onChange={(e) => setData("protocol_board_review", e.target.value)}
                        required
                        autoComplete="protocol_board_review"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel
                        htmlFor="protocol_expedited_review"
                        value="protocol_expedited_review"
                    />

                    <TextInput
                        id="protocol_expedited_review"
                        className="mt-1 block w-full"
                        // value={data.protocol_expedited_review}
                        // onChange={(e) => setData("protocol_expedited_review", e.target.value)}
                        required
                        autoComplete="protocol_expedited_review"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel
                        htmlFor="protocol_board_meeting"
                        value="protocol_board_meeting"
                    />

                    <TextInput
                        id="protocol_board_meeting"
                        className="mt-1 block w-full"
                        // value={data.protocol_board_meeting}
                        // onChange={(e) => setData("protocol_board_meeting", e.target.value)}
                        required
                        autoComplete="protocol_board_meeting"
                    />

                    <InputError className="mt-2" message={""} />
                </div>

                <div className="mb-4">
                    <InputLabel value="Common type of protocols reviewed through full board review." />
                    <div className="flex flex-wrap gap-4 my-2">
                        <OutlinedInput
                            id="protocol1"
                            endAdornment={
                                <InputAdornment position="end">
                                    Drug
                                </InputAdornment>
                            }
                            size="small"
                        />
                        <OutlinedInput
                            id="protocol2"
                            size="small"
                            endAdornment={
                                <InputAdornment position="end">
                                    Medicine
                                </InputAdornment>
                            }
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <InputLabel value="Common type of protocols reviewed through expedited review." />
                    <div className="flex gap-4 my-2">
                        <OutlinedInput
                            id="protocol1"
                            endAdornment={
                                <InputAdornment position="end">
                                    Drug
                                </InputAdornment>
                            }
                            size="small"
                        />
                        <OutlinedInput
                            id="protocol2"
                            size="small"
                            endAdornment={
                                <InputAdornment position="end">
                                    Medicine
                                </InputAdornment>
                            }
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <InputLabel
                        htmlFor="avg_members_per_meeting"
                        value="avg_members_per_meeting"
                    />

                    <TextInput
                        id="avg_members_per_meeting"
                        className="mt-1 block w-full"
                        // value={data.avg_members_per_meeting}
                        // onChange={(e) => setData("avg_members_per_meeting", e.target.value)}
                        required
                        autoComplete="avg_members_per_meeting"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel
                        htmlFor="ethical_challenges"
                        value="ethical_challenges"
                    />

                    <TextAreaInput
                        id="ethical_challenges"
                        rows={4}
                        className="mt-1 block w-full"
                        // value={data.ethical_challenges}
                        // onChange={(e) => setData("ethical_challenges", e.target.value)}
                        required
                        autoComplete="ethical_challenges"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
            </form>
        </>
    );
};

export default ProtocolForm;
