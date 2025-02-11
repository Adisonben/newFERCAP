import React, { useState, useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import { Button } from "@mui/material";
import { Input, InputAdornment, OutlinedInput } from "@mui/material";
import "../../../../css/form.css";

const ProtocolForm = ({ data, setData, errors }) => {
    const [protocolTypes, setProtocolTypes] = useState([]);

    const fetchProtocolTypes = async () => {
        try {
            const response = await axios.get("/api/protocol-types");
            setProtocolTypes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProtocolTypes();
    }, []);

    return (
        <>
            <div className="mb-4">
                <InputLabel
                    htmlFor="protocol_board_review"
                    value="Number of protocols reviewed through full board review the last 3 years*"
                />

                <TextInput
                    id="protocol_board_review"
                    className="mt-1 block w-full"
                    value={data.protocol_board_review}
                    onChange={(e) =>
                        setData("protocol_board_review", e.target.value)
                    }
                    required
                    autoComplete="protocol_board_review"
                />

                <InputError
                    className="mt-2"
                    message={errors.protocol_board_review}
                />
            </div>
            <div className="mb-4">
                <InputLabel
                    htmlFor="protocol_expedited_review"
                    value="Number of protocols reviewed through expedited review the last 3 years*"
                />

                <TextInput
                    id="protocol_expedited_review"
                    className="mt-1 block w-full"
                    value={data.protocol_expedited_review}
                    onChange={(e) =>
                        setData("protocol_expedited_review", e.target.value)
                    }
                    required
                    autoComplete="protocol_expedited_review"
                />

                <InputError
                    className="mt-2"
                    message={errors.protocol_expedited_review}
                />
            </div>
            <div className="mb-4">
                <InputLabel
                    htmlFor="protocol_board_meeting"
                    value="Number of board meeting per year*"
                />

                <TextInput
                    id="protocol_board_meeting"
                    className="mt-1 block w-full"
                    value={data.protocol_board_meeting}
                    onChange={(e) =>
                        setData("protocol_board_meeting", e.target.value)
                    }
                    required
                    autoComplete="protocol_board_meeting"
                />

                <InputError
                    className="mt-2"
                    message={errors.protocol_board_meeting}
                />
            </div>

            <div className="mb-4">
                <InputLabel value="Common type of protocols reviewed through full board review." />
                <div className="flex flex-wrap gap-4 my-2">
                    {protocolTypes.map((protocolType) => (
                        <OutlinedInput
                            id={"fullBoardProtocol" + protocolType.id}
                            type="number"
                            key={protocolType.id}
                            value={
                                data.common_type.full_board[protocolType.id] ||
                                0
                            }
                            onChange={(e) => {
                                const maxOrdering = protocolType.ordering || 0;
                                const updatedFullBoard = {
                                    ...data.common_type.full_board,
                                    [protocolType.id]: e.target.value > maxOrdering ? maxOrdering : e.target.value , // Update only the specific key
                                };
                                setData("common_type", {
                                    ...data.common_type,
                                    full_board: updatedFullBoard,
                                });
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    {protocolType.name}
                                </InputAdornment>
                            }
                            size="small"
                        />
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <InputLabel value="Common type of protocols reviewed through expedited review." />
                <div className="flex gap-4 my-2">
                    {protocolTypes.map((protocolType) => (
                        <OutlinedInput
                            id={"expeditedProtocol" + protocolType.id}
                            type="number"
                            key={protocolType.id}
                            value={
                                data.common_type.expedited[protocolType.id] ||
                                0
                            }
                            onChange={(e) => {
                                const maxOrdering = protocolType.ordering || 0;
                                const updatedFullBoard = {
                                    ...data.common_type.expedited,
                                    [protocolType.id]: e.target.value > maxOrdering ? maxOrdering : e.target.value , // Update only the specific key
                                };
                                setData("common_type", {
                                    ...data.common_type,
                                    expedited: updatedFullBoard,
                                });
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    {protocolType.name}
                                </InputAdornment>
                            }
                            size="small"
                        />
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <InputLabel
                    htmlFor="avg_members_per_meeting"
                    value="Average Members Per Board Meeting*"
                />

                <TextInput
                    id="avg_members_per_meeting"
                    className="mt-1 block w-full"
                    type="number"
                    value={data.avg_members_per_meeting}
                    onChange={(e) =>
                        setData("avg_members_per_meeting", e.target.value)
                    }
                    required
                    autoComplete="avg_members_per_meeting"
                />

                <InputError
                    className="mt-2"
                    message={errors.avg_members_per_meeting}
                />
            </div>
            <div className="mb-4">
                <InputLabel
                    htmlFor="ethical_challenges"
                    value="Ethical Challenges"
                />

                <TextAreaInput
                    id="ethical_challenges"
                    rows={4}
                    className="mt-1 block w-full"
                    value={data.ethical_challenges}
                    onChange={(e) =>
                        setData("ethical_challenges", e.target.value)
                    }
                    autoComplete="ethical_challenges"
                />

                <InputError
                    className="mt-2"
                    message={errors.ethical_challenges}
                />
            </div>
        </>
    );
};

export default ProtocolForm;
