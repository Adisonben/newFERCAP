import React from "react";
import InfoRow from "@/Components/InfoRow";
import { Button } from "@mui/material";

const statusConfig = {
    0: { label: "Disable", class: "bg-gray-100 text-gray-600" },
    1: { label: "Active", class: "bg-blue-100 text-blue-600" },
    2: { label: "Complete", class: "bg-green-100 text-green-600" },
    3: { label: "Rreject", class: "bg-red-100 text-red-600" },
};

const RecognitionInfo = ({ recognition }) => {
    const data = recognition;

    const full_board_protocols = data?.protocols?.filter(
        (p) => p.pivot?.review_type === "full_board"
    );
    const expedited_protocols = data?.protocols?.filter(
        (p) => p.pivot?.review_type === "expedited"
    );
    return (
        <>
            <div className="p-6 text-gray-900 dark:text-gray-100">
                {/* Header */}
                <div className="flex justify-between items-start mb-4 pb-2 border-b">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {data.institute}
                        </h2>
                        <p className="text-sm text-gray-500">{data.ec_name}</p>
                    </div>
                    <span
                        className={`${
                            statusConfig[data.status]?.class
                        } px-2 py-1 rounded`}
                    >
                        {statusConfig[data.status]?.label}
                    </span>
                </div>

                {/* Main Content - Two Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Institute & Contact Info */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Institute & Contact
                            </h3>
                            <div className="bg-gray-50 p-3 rounded">
                                <InfoRow label="Address" value={data.address} />
                                <InfoRow label="City" value={data.city} />
                                <InfoRow
                                    label="State/Region"
                                    value={data.state_province_region}
                                />
                                <InfoRow
                                    label="ZIP Code"
                                    value={data.zip_code}
                                />
                                <InfoRow label="Country" value={data.country} />
                                <InfoRow label="Phone" value={data.phone} />
                                <InfoRow label="Website" value={data.website} />
                            </div>
                        </div>

                        {/* Contact Person */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Contact Person
                            </h3>
                            <div className="bg-gray-50 p-3 rounded">
                                <InfoRow
                                    label="Name"
                                    value={data.contact_person}
                                />
                                <InfoRow
                                    label="Email"
                                    value={data.contact_email}
                                />
                                <InfoRow
                                    label="Position"
                                    value={data.contact_position}
                                />
                            </div>
                        </div>

                        {/* Leadership */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Leadership
                            </h3>
                            <div className="bg-gray-50 p-3 rounded">
                                <InfoRow
                                    label="Chairperson"
                                    value={data.chairperson}
                                />
                                <InfoRow
                                    label="Chair Email"
                                    value={data.chairperson_email}
                                />
                                <InfoRow
                                    label="Secretary"
                                    value={data.secretary}
                                />
                                <InfoRow
                                    label="Secretary Email"
                                    value={data.secretary_email}
                                />
                            </div>
                        </div>

                        {/* Survey Period */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Survey Period
                            </h3>
                            <div className="bg-gray-50 p-3 rounded">
                                <InfoRow
                                    label="Start Date"
                                    value={data.propose_survey_start_date}
                                />
                                <InfoRow
                                    label="End Date"
                                    value={data.propose_survey_end_date}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Protocol Statistics */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Protocol Statistics
                            </h3>
                            <p className="text-xs">
                                Number of protocols reviewed through full board
                                review the last 3 years
                            </p>
                            <div className="bg-gray-50 p-3 mb-2 rounded">
                                <div className="text-lg font-semibold">
                                    {data.protocol_board_review}
                                </div>
                            </div>

                            <p className="text-xs">
                                Number of protocols reviewed through expedited
                                review the last 3 years
                            </p>
                            <div className="bg-gray-50 p-3 mb-2 rounded">
                                <div className="text-lg font-semibold">
                                    {data.protocol_expedited_review}
                                </div>
                            </div>

                            <p className="text-xs">
                                Number of board meeting per year
                            </p>
                            <div className="bg-gray-50 p-3 mb-2 rounded">
                                <div className="text-lg font-semibold">
                                    {data.protocol_board_meeting}
                                </div>
                            </div>

                            <p className="text-xs">
                                Average Members Per Board Meeting
                            </p>
                            <div className="bg-gray-50 p-3 mb-2 rounded">
                                <div className="text-lg font-semibold">
                                    {data.avg_members_per_meeting}
                                </div>
                            </div>

                            {/* Protocols */}
                            <p className="text-xs">
                                Common type of protocols reviewed through full
                                board review.
                            </p>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                {full_board_protocols ? (
                                    full_board_protocols.map((protocol) => (
                                        <div
                                            className="bg-gray-50 p-3 rounded"
                                            key={protocol.id}
                                        >
                                            <div className="text-lg font-semibold">
                                                {protocol.pivot.number}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {protocol.name}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-gray-50 p-3 rounded">
                                        <div className="text-lg font-semibold">
                                            -
                                        </div>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs">
                                Common type of protocols reviewed through
                                expedited review.
                            </p>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                {expedited_protocols ? (
                                    expedited_protocols.map((protocol) => (
                                        <div
                                            className="bg-gray-50 p-3 rounded"
                                            key={protocol.id}
                                        >
                                            <div className="text-lg font-semibold">
                                                {protocol.pivot.number}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {protocol.name}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-gray-50 p-3 rounded">
                                        <div className="text-lg font-semibold">
                                            -
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Ethical Challenges */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Ethical Challenges
                            </h3>
                            <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                                {data.ethical_challenges}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecognitionInfo;
