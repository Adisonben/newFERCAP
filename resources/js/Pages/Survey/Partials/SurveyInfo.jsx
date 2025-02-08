import React, { useEffect, useState } from "react";
import { getDateString } from "@/Functions/DataConvert";
import PermissionGuard from "@/Components/PermissionGuard";
import InfoRow from "@/Components/InfoRow";

const statusConfig = {
    0: { label: "Close", class: "bg-gray-100 text-gray-600" },
    1: { label: "Ongoing", class: "bg-blue-100 text-blue-600" },
    2: { label: "Complete", class: "bg-green-100 text-green-600" },
    3: { label: "Fail", class: "bg-red-100 text-red-600" },
    4: { label: "Unknown", class: "bg-red-100 text-gray-600" },
};

const SurveyInfo = ({ survey, role_name }) => {
    const [surveyTeam, setSurveyTeam] = useState([]);

    const fetchSurveyTeam = async () => {
        const response = await axios.get(`/api/survey-team/${survey.id}`);
        setSurveyTeam(response.data);
    };

    useEffect(() => {
        fetchSurveyTeam();
    }, []);
    return (
        <div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
                {/* Header */}
                <div className="flex justify-between items-start mb-4 pb-2 border-b">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Survey0{survey.id}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {survey.simp_recognition?.institute || "-"}
                        </p>
                    </div>
                    <span
                        className={`${
                            statusConfig[survey.status]?.class
                        } px-2 py-1 rounded`}
                    >
                        {statusConfig[survey.status]?.label}
                    </span>
                </div>

                {/* Main Content - Two Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Information */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Information
                            </h3>
                            <div className="bg-gray-50 p-3 rounded">
                                <InfoRow
                                    label="Description"
                                    value={survey.description || "-"}
                                />
                                <InfoRow
                                    label="Fercap Group"
                                    value={survey.fercap_group.group_name}
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
                                    value={getDateString(survey.start_date)}
                                />
                                <InfoRow
                                    label="End Date"
                                    value={getDateString(survey.end_date)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Team member */}
                        <PermissionGuard
                            userRole={role_name}
                            permissionName="view_survey_team"
                        >
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Team member
                                </h3>
                                <div className="bg-gray-50 p-3 rounded">
                                    {surveyTeam?.map((team) => (
                                        <InfoRow
                                            key={team.id}
                                            label={team.team_role}
                                            value={team.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        </PermissionGuard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyInfo;
