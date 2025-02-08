import React, { useState } from "react";
import { Chip, Stack, Button } from "@mui/material";
import {
    Edit,
    Delete,
    PowerSettingsNew,
    CheckCircle,
    Report
} from "@mui/icons-material";
import { Link, router } from "@inertiajs/react";
import DeleteModal from "@/Components/DeleteModal";
import {
    getDateString,
    getRecStatusColor,
    getRecStatusLabel,
} from "@/Functions/DataConvert";
import PermissionGuard from "@/Components/PermissionGuard";
import TextInput from "@/Components/TextInput";

const RecognitionsTable = ({ recognitions = [], role_name }) => {
    const [deleteRecId, setDeleteRecId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleDeleteShow = (recDataId) => {
        setDeleteRecId(recDataId);
        setShowDeleteModal(true);
    };

    const [instituteFilter, setInstituteFilter] = useState("");
    const [ecNameFilter, setEcNameFilter] = useState("");

    // Filter users based on search query
    const filteredRecog = recognitions?.filter(
        (recog) =>
            recog.institute
                .toLowerCase()
                .includes(instituteFilter.toLowerCase()) &&
            recog.ec_name.toLowerCase().includes(ecNameFilter.toLowerCase())
    );

    const handleDeleteClose = () => {
        setDeleteRecId(null);
        setShowDeleteModal(false);
    };

    const handleDeleteSubmit = (e) => {
        e.preventDefault();

        router.delete(`/recognitions/${deleteRecId}`, {
            preserveScroll: true,
            onFinish: () => {
                setDeleteRecId(null);
                setShowDeleteModal(false);
            },
        });
    };

    const allowRecognition = (recognitionId) => {
        router.get(`/recognitions/set-allow/${recognitionId}`, {
            preserveScroll: true,
        });
    };
    const rejectRecognition = (recognitionId) => {
        router.get(`/recognitions/set-reject/${recognitionId}`, {
            preserveScroll: true,
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
                            Institute
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Name Of EC
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Submitted
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
                    <tr>
                        <th
                            scope="col"
                            className="px-6 pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                            <TextInput
                                id="institute_filter"
                                className="block w-full h-8"
                                value={instituteFilter}
                                onChange={(e) =>
                                    setInstituteFilter(e.target.value)
                                }
                                placeholder="Search by institute..."
                            />
                        </th>
                        <th
                            scope="col"
                            className="px-6 pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                            <TextInput
                                id="ec_name_filter"
                                className="block w-full h-8"
                                value={ecNameFilter}
                                onChange={(e) =>
                                    setEcNameFilter(e.target.value)
                                }
                                placeholder="Search by ec name..."
                            />
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        ></th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        ></th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        ></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {filteredRecog?.length > 0 ? (
                        filteredRecog.map((recognition, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {recognition.institute ?? "-"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    {recognition.ec_name ?? "-"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    {getDateString(recognition.created_at)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    <Chip
                                        label={getRecStatusLabel(
                                            recognition.status
                                        )}
                                        color={getRecStatusColor(
                                            recognition.status
                                        )}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Stack spacing={1} direction="row">
                                        <PermissionGuard
                                            permissionName="edit_recognition"
                                            userRole={role_name}
                                        >
                                            <Link
                                                href={route(
                                                    "recognitions.edit",
                                                    recognition.recognition_id
                                                )}
                                            >
                                                <Button
                                                    variant="contained"
                                                    startIcon={<Edit />}
                                                    size="small"
                                                >
                                                    Edit
                                                </Button>
                                            </Link>
                                        </PermissionGuard>
                                        <PermissionGuard
                                            permissionName="delete_recognition"
                                            userRole={role_name}
                                        >
                                            <Button
                                                variant="contained"
                                                startIcon={<Delete />}
                                                color="error"
                                                size="small"
                                                onClick={() =>
                                                    handleDeleteShow(
                                                        recognition.recognition_id
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </PermissionGuard>

                                        {recognition.status === 0 && (
                                            <>
                                                <PermissionGuard
                                                    permissionName="setallow_recognition"
                                                    userRole={role_name}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        startIcon={
                                                            <CheckCircle />
                                                        }
                                                        color="success"
                                                        size="small"
                                                        onClick={() =>
                                                            allowRecognition(
                                                                recognition.recognition_id
                                                            )
                                                        }
                                                    >
                                                        Allow
                                                    </Button>
                                                </PermissionGuard>
                                                <PermissionGuard
                                                    permissionName="setreject_recognition"
                                                    userRole={role_name}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        startIcon={
                                                            <Report />
                                                        }
                                                        color="warning"
                                                        size="small"
                                                        onClick={() =>
                                                            rejectRecognition(
                                                                recognition.recognition_id
                                                            )
                                                        }
                                                    >
                                                        Reject
                                                    </Button>
                                                </PermissionGuard>
                                            </>
                                        )}

                                        <PermissionGuard
                                            permissionName="show_recognition"
                                            userRole={role_name}
                                        >
                                            <Link
                                                href={route(
                                                    "recognitions.show",
                                                    recognition.recognition_id
                                                )}
                                            >
                                                <Button
                                                    variant="contained"
                                                    startIcon={
                                                        <PowerSettingsNew />
                                                    }
                                                    color="info"
                                                    size="small"
                                                >
                                                    Info
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
            <DeleteModal
                show={showDeleteModal}
                onClose={handleDeleteClose}
                onSubmit={handleDeleteSubmit}
                title="Recognition"
            />
        </>
    );
};

export default RecognitionsTable;
