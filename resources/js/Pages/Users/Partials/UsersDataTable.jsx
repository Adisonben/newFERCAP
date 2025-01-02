import React, { useState } from "react";
import { Chip, Stack, Button } from "@mui/material";
import { Edit, Delete, PowerSettingsNew } from "@mui/icons-material";
import UserModal from "./UserModal";
import { useForm, router } from "@inertiajs/react";
import DeleteModal from "@/Components/DeleteModal";

const UsersDataTable = ({ usersList = [] }) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [editingUser, setEditingUser] = useState(null);

    const { data, setData, reset, put, processing, errors } = useForm({
        role: "",
        email: "",
        password: "",
        target_id: "",
    });

    const handleEdit = (userData) => {
        setEditingUser(userData);
        setData({
            name: userData.name,
            ordering: userData.ordering,
            target_id: userData.id,
        });
        setShowModal(true);
    };

    const handleDeleteShow = (userData) => {
        setDeleteUserId(userData.id);
        setShowDeleteModal(true);
    }

    const handleDeleteClose = () => {
        setDeleteUserId(null);
        setShowDeleteModal(false);
    }

    const handleDeleteSubmit = (e) => {
        e.preventDefault();

        router.delete(`/users/${deleteUserId}`, {
            preserveScroll: true,
            onFinish: () => {
                setDeleteUserId(null);
                setShowDeleteModal(false);
            },
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle your update logic here
        // After successful update:
        put(`/users/${data.target_id}`, {
            preserveScroll: true,
            onFinish: () => {
                setShowModal(false);
                setEditingUser(null);
            },
        });
    };

    const handleClose = () => {
        setShowModal(false);
        setEditingUser(null);
        reset();
    };

    const toggleStatus = (userId) => {
        router.get(`/users/toggle-status/${userId}`, {
            preserveScroll: true,
        });
    }

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border">
                <thead className="bg-gray-700 dark:bg-gray-700">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Email
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Role
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
                    {usersList?.length > 0 ? (
                        usersList.map((user, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {user.full_name ? user.full_name : '-N/A-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {user.role_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    <Chip
                                        label={
                                            // 0 = inactivate, 1 = activate, 2 = deleted, 3 = uncompleted
                                            user.status === 0
                                                ? "Inactivate"
                                                : user.status === 1
                                                ? "Activate"
                                                : user.status === 2
                                                ? "Deleted"
                                                : "Uncompleted"
                                        }
                                        color={
                                            user.status === 1
                                                ? "success"
                                                : user.status === 1
                                                ? "error"
                                                : "warning"
                                        }
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Stack spacing={1} direction="row">
                                        <Button
                                            variant="contained"
                                            startIcon={<Edit />}
                                            size="small"
                                            onClick={() =>
                                                handleEdit(user)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            startIcon={<Delete />}
                                            color="error"
                                            size="small"
                                            onClick={() => handleDeleteShow(user)}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="contained"
                                            startIcon={<PowerSettingsNew />}
                                            color="info"
                                            size="small"
                                            onClick={() => toggleStatus(user.id)}
                                        >
                                            Disable
                                        </Button>
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

            <UserModal
                show={showModal}
                onClose={handleClose}
                onSubmit={handleSubmit}
                data={data}
                setData={(field, value) =>
                    setData(field, value)
                }
                errors={errors}
                isEdit={!!editingUser}
            />

            <DeleteModal
                show={showDeleteModal}
                onClose={handleDeleteClose}
                onSubmit={handleDeleteSubmit}
                title="User"
            />
        </>
    );
};

export default UsersDataTable;
