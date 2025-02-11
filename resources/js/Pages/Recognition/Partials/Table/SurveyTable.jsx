import React, { useState } from "react";
import { Chip, Stack, Button } from "@mui/material";
import { Edit, Delete, ListAlt, Group } from "@mui/icons-material";
import { router, useForm, Link } from "@inertiajs/react";
import {
    getDateString,
    getSurvStatusColor,
    getSurvStatusLabel,
} from "@/Functions/DataConvert";
import SurveyModal from "../Forms/SurveyModal";
import DeleteModal from "@/Components/DeleteModal";
import PermissionGuard from "@/Components/PermissionGuard";

const SurveyTable = ({ surveys, role_name }) => {
    const [editingSurvey, setEditingSurvey] = useState(false);
    const [deleteSurveyId, setDeleteSurveyId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { data, setData, reset, put, processing, errors } = useForm({
        start_date: "",
        end_date: "",
        fercap_group: "",
        description: "",
        survey_id: "",
    });

    const editSurvey = async (targetSurvey) => {
        reset();
        setTimeout(() => {
            setData((prevData) => ({
                ...prevData,
                start_date: targetSurvey.start_date.split(" ")[0] || "",
                end_date: targetSurvey.end_date.split(" ")[0] || "",
                fercap_group: targetSurvey.fercap_group?.id || "",
                description: targetSurvey.description || "",
                survey_id: targetSurvey.survey_id || "",
            }));

            // Only show modal after data is set
            setEditingSurvey(true);
        }, 0);
    };

    const closeModal = () => {
        if (!processing) {
            setEditingSurvey(false);
            reset();
        }
    };

    const handleUpdateSurvey = (e) => {
        e.preventDefault();
        put(route("surveys.update", data.survey_id), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const handleDeleteShow = (recDataId) => {
        setDeleteSurveyId(recDataId);
        setShowDeleteModal(true);
    };

    const handleDeleteClose = () => {
        setDeleteSurveyId(null);
        setShowDeleteModal(false);
    };

    const handleDeleteSubmit = (e) => {
        e.preventDefault();

        router.delete(`/surveys/${deleteSurveyId}`, {
            preserveScroll: true,
            onFinish: () => {
                setDeleteSurveyId(null);
                setShowDeleteModal(false);
            },
        });
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
                            Info
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Fercap Committee
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
                                    {survey.description ?? "-"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    {survey.fercap_group?.group_name ?? "-"}
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
                                        label={getSurvStatusLabel(
                                            survey.status
                                        )}
                                        color={getSurvStatusColor(
                                            survey.status
                                        )}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Stack spacing={1} direction="row">
                                        <PermissionGuard
                                            userRole={role_name}
                                            permissionName="edit_survey"
                                        >
                                            <Button
                                                variant="contained"
                                                startIcon={<Edit />}
                                                size="small"
                                                onClick={() =>
                                                    editSurvey(survey)
                                                }
                                            >
                                                Edit
                                            </Button>
                                        </PermissionGuard>

                                        <PermissionGuard
                                            userRole={role_name}
                                            permissionName="delete_survey"
                                        >
                                            <Button
                                                variant="contained"
                                                startIcon={<Delete />}
                                                color="error"
                                                size="small"
                                                onClick={() =>
                                                    handleDeleteShow(
                                                        survey.survey_id
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </PermissionGuard>

                                        <PermissionGuard
                                            userRole={role_name}
                                            permissionName="show_survey"
                                        >
                                            <Link
                                                href={route(
                                                    "surveys.show",
                                                    survey.survey_id
                                                )}
                                            >
                                                <Button
                                                    variant="contained"
                                                    startIcon={
                                                        <ListAlt />
                                                    }
                                                    color="info"
                                                    size="small"
                                                >
                                                    Info
                                                </Button>
                                            </Link>
                                        </PermissionGuard>

                                        <PermissionGuard
                                            userRole={role_name}
                                            permissionName="edit_survey_team"
                                        >
                                            <Link
                                                href={route(
                                                    "surveys.team.edit",
                                                    survey.survey_id
                                                )}
                                            >
                                                <Button
                                                    variant="contained"
                                                    startIcon={
                                                        <Group />
                                                    }
                                                    color="secondary"
                                                    size="small"
                                                >
                                                    Team
                                                </Button>
                                            </Link>
                                        </PermissionGuard>
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
            <SurveyModal
                show={editingSurvey}
                onClose={closeModal}
                onSubmit={handleUpdateSurvey}
                data={data}
                setData={(field, value) => setData(field, value)}
                errors={errors}
                isEdit={true}
                processing={processing}
            />
            <DeleteModal
                show={showDeleteModal}
                onClose={handleDeleteClose}
                onSubmit={handleDeleteSubmit}
                title="Survey"
            />
        </>
    );
};

export default SurveyTable;
