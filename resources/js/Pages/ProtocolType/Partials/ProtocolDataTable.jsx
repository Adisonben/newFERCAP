import React, { useState } from "react";
import { Chip, Stack, Button } from "@mui/material";
import { Edit, Delete, PowerSettingsNew } from "@mui/icons-material";
import ProtocolModal from "./ProtocolModal";
import { useForm, router } from "@inertiajs/react";
import DeleteModal from "@/Components/DeleteModal";
import PermissionGuard from "@/Components/PermissionGuard";

const ProtocolDataTable = ({ protocolTypes, role_name }) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteProtocolTypeId, setDeleteProtocolTypeId] = useState(null);
    const [editingProtocolType, setEditingProtocolType] = useState(null);

    const { data, setData, reset, put, processing, errors } = useForm({
        name: "",
        ordering: "",
        target_id: "",
    });

    const handleEdit = (protocolType) => {
        setEditingProtocolType(protocolType);
        setData({
            name: protocolType.name,
            ordering: protocolType.ordering,
            target_id: protocolType.id,
        });
        setShowModal(true);
    };

    const handleDeleteShow = (protocolType) => {
        setDeleteProtocolTypeId(protocolType.id);
        setShowDeleteModal(true);
    };

    const handleDeleteClose = () => {
        setDeleteProtocolTypeId(null);
        setShowDeleteModal(false);
    };

    const handleDeleteSubmit = (e) => {
        e.preventDefault();

        router.delete(`/protocol-types/${deleteProtocolTypeId}`, {
            preserveScroll: true,
            onFinish: () => {
                setDeleteProtocolTypeId(null);
                setShowDeleteModal(false);
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle your update logic here
        // After successful update:
        put(`/protocol-types/${data.target_id}`, {
            preserveScroll: true,
            onFinish: () => {
                setShowModal(false);
                setEditingProtocolType(null);
            },
        });
    };

    const handleClose = () => {
        setShowModal(false);
        setEditingProtocolType(null);
        reset();
    };

    const toggleStatus = (protocolTypeId) => {
        router.get(`/protocol-types/toggle-status/${protocolTypeId}`, {
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
                            Title
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Ordering
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
                    {protocolTypes?.length > 0 ? (
                        protocolTypes.map((protocolType, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {protocolType.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    {protocolType.ordering}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    <Chip
                                        label={
                                            protocolType.status
                                                ? "Active"
                                                : "Disabled"
                                        }
                                        color={
                                            protocolType.status
                                                ? "success"
                                                : "error"
                                        }
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Stack spacing={1} direction="row">
                                        <PermissionGuard
                                            userRole={role_name}
                                            permissionName="edit_protocol_type"
                                        >
                                            <Button
                                                variant="contained"
                                                startIcon={<Edit />}
                                                size="small"
                                                onClick={() =>
                                                    handleEdit(protocolType)
                                                }
                                            >
                                                Edit
                                            </Button>
                                        </PermissionGuard>
                                        <PermissionGuard
                                            userRole={role_name}
                                            permissionName="delete_protocol_type"
                                        >
                                            <Button
                                                variant="contained"
                                                startIcon={<Delete />}
                                                color="error"
                                                size="small"
                                                onClick={() =>
                                                    handleDeleteShow(
                                                        protocolType
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </PermissionGuard>
                                        <PermissionGuard
                                            userRole={role_name}
                                            permissionName="disable_protocol_type"
                                        >
                                            <Button
                                                variant="contained"
                                                startIcon={<PowerSettingsNew />}
                                                color="info"
                                                size="small"
                                                onClick={() =>
                                                    toggleStatus(
                                                        protocolType.id
                                                    )
                                                }
                                            >
                                                {protocolType.status
                                                ? "Disabled"
                                                : "Active"}
                                            </Button>
                                        </PermissionGuard>
                                    </Stack>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ProtocolModal
                show={showModal}
                onClose={handleClose}
                onSubmit={handleSubmit}
                data={data}
                setData={(field, value) => setData(field, value)}
                errors={errors}
                isEdit={!!editingProtocolType}
                processing={processing}
            />
            <DeleteModal
                show={showDeleteModal}
                onClose={handleDeleteClose}
                onSubmit={handleDeleteSubmit}
                title="Protocol Type"
            />
        </>
    );
};

export default ProtocolDataTable;
