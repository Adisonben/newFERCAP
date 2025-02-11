import React, { useState, useEffect } from "react";
import { Chip, Stack, Button } from "@mui/material";
import { Edit, Delete, PowerSettingsNew, ListAlt } from "@mui/icons-material";
import UserModal from "./UserModal";
import { useForm, router, Link } from "@inertiajs/react";
import DeleteModal from "@/Components/DeleteModal";
import PermissionGuard from "@/Components/PermissionGuard";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { userRoles, userStatus } from "@/Functions/MasterDatas";
import axios from "axios";

const UsersDataTable = ({ usersList = [], role_name }) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [editingUser, setEditingUser] = useState(null);

    // Search query state
    const [emailFilter, setEmailFilter] = useState("");
    const [nameFilter, setNameFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const { data, setData, reset, put, processing, errors } = useForm({
        role: "",
        email: "",
        password: "",
        target_id: "",
    });

    // Filter users based on search query
    const filteredUsers = usersList?.filter(
        (user) =>
            user.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
            user.full_name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            (roleFilter === "" || user.role_id === parseInt(roleFilter)) &&
            (statusFilter === "" || user.status === parseInt(statusFilter))
    );

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
    };

    const handleDeleteClose = () => {
        setDeleteUserId(null);
        setShowDeleteModal(false);
    };

    const handleDeleteSubmit = (e) => {
        e.preventDefault();

        router.delete(`/users/${deleteUserId}`, {
            preserveScroll: true,
            onFinish: () => {
                setDeleteUserId(null);
                setShowDeleteModal(false);
            },
        });
    };

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
                    <tr>
                        <th
                            scope="col"
                            className="px-6 pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                            <TextInput
                                id="email_filter"
                                value={emailFilter}
                                className="block w-full h-8"
                                onChange={(e) => setEmailFilter(e.target.value)}
                                placeholder="Search by email..."
                            />
                        </th>
                        <th
                            scope="col"
                            className="px-6 pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                            <TextInput
                                id="name_filter"
                                className="block w-full h-8"
                                value={nameFilter}
                                onChange={(e) => setNameFilter(e.target.value)}
                                placeholder="Search by name..."
                            />
                        </th>
                        <th
                            scope="col"
                            className="px-6 pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                            <SelectInput
                                id="role_filter"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="block w-full h-8 text-sm"
                            >
                                <option value="">All user role</option>
                                {userRoles?.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.label}
                                    </option>
                                ))}
                            </SelectInput>
                        </th>
                        <th
                            scope="col"
                            className="px-6 pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                            <SelectInput
                                name="status_filter"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="block w-full h-8 text-sm"
                            >
                                <option value="">All status</option>
                                {userStatus?.map((status) => (
                                    <option key={status.id} value={status.id}>
                                        {status.name}
                                    </option>
                                ))}
                            </SelectInput>
                        </th>
                        <th
                            scope="col"
                            className="px-6 pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        ></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {filteredUsers?.length > 0 ? (
                        filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {user.full_name ? user.full_name : "-N/A-"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {user.role_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    <Chip
                                        label={
                                            // 0 = inactivate, 1 = activate, 2 = deleted, 3 = uncompleted
                                            user.status === 0
                                                ? "Inactive"
                                                : user.status === 1
                                                ? "Active"
                                                : user.status === 2
                                                ? "Deleted"
                                                : "Uncompleted"
                                        }
                                        color={
                                            user.status === 1
                                                ? "success"
                                                : user.status === 0
                                                ? "error"
                                                : user.status === 3
                                                ? "warning"
                                                : ""
                                        }
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {user.status !== 2 && (
                                        <Stack spacing={1} direction="row">
                                            <PermissionGuard
                                                userRole={role_name}
                                                permissionName="edit_user"
                                            >
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
                                            </PermissionGuard>
                                            <PermissionGuard
                                                userRole={role_name}
                                                permissionName="delete_user"
                                            >
                                                <Button
                                                    variant="contained"
                                                    startIcon={<Delete />}
                                                    color="error"
                                                    size="small"
                                                    onClick={() =>
                                                        handleDeleteShow(user)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </PermissionGuard>
                                            {(user.status === 1 ||
                                                user.status === 0) && (
                                                <PermissionGuard
                                                    userRole={role_name}
                                                    permissionName="disable_user"
                                                >
                                                    <Button
                                                        variant="contained"
                                                        startIcon={
                                                            <PowerSettingsNew />
                                                        }
                                                        color="warning"
                                                        size="small"
                                                        onClick={() =>
                                                            toggleStatus(
                                                                user.id
                                                            )
                                                        }
                                                    >
                                                        {user.status
                                                            ? "Disable"
                                                            : "Enable"}
                                                    </Button>
                                                </PermissionGuard>
                                            )}
                                            {/* <Link href={"#"}>
                                                <Button
                                                    variant="contained"
                                                    startIcon={<ListAlt />}
                                                    color="info"
                                                    size="small"
                                                >
                                                    Info
                                                </Button>
                                            </Link> */}
                                        </Stack>
                                    )}
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
                setData={(field, value) => setData(field, value)}
                errors={errors}
                isEdit={!!editingUser}
                processing={processing}
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
