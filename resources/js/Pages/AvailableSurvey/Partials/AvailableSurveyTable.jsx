import React from "react";
import { Chip, Stack, Button } from "@mui/material";
import { ListAlt, GroupAdd, GroupRemove } from "@mui/icons-material";
import { router } from "@inertiajs/react";
import {
    getDateString,
    getSurvStatusColor,
    getSurvStatusLabel,
} from "@/Functions/DataConvert";

const AvailableSurveyTable = ({ surveys }) => {
    const handleJoinEvent = async (state, surveyId) => {
        if (!surveyId) return;
        router.get(`/api/survey/${state}/${surveyId}`);
    };

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border">
                <thead className="bg-gray-700 dark:bg-gray-700">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Institute
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Description
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Schedule
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Status
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {surveys?.length > 0 ? (
                        surveys.map((survey, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {survey.simp_recognition?.institute ?? "-"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {survey.description ?? "-"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    <p>
                                        Start:{" "}
                                        <b>
                                            {getDateString(survey.start_date)}
                                        </b>
                                    </p>
                                    <p>
                                        End:{" "}
                                        <b>{getDateString(survey.end_date)}</b>
                                    </p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    <Chip
                                        label={
                                            survey.is_surveyor?.status
                                                ? "Joined"
                                                : "Avaliable"
                                        }
                                        color={
                                            survey.is_surveyor?.status
                                                ? "success"
                                                : ""
                                        }
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Stack spacing={1} direction="row">
                                        {/* <Button
                                            variant="contained"
                                            startIcon={<ListAlt />}
                                            color="info"
                                            size="small"
                                        >
                                            Info
                                        </Button> */}
                                        {survey.is_surveyor?.status ? (
                                            <Button
                                                variant="contained"
                                                startIcon={<GroupRemove />}
                                                color="error"
                                                size="small"
                                                onClick={() =>
                                                    handleJoinEvent("leave", survey.id)
                                                }
                                            >
                                                Leave
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                startIcon={<GroupAdd />}
                                                color="success"
                                                size="small"
                                                onClick={() =>
                                                    handleJoinEvent("join", survey.id)
                                                }
                                            >
                                                Join
                                            </Button>
                                        )}
                                    </Stack>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default AvailableSurveyTable;
