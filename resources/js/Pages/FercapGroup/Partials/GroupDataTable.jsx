import React, { useState } from "react";
import { Button, Stack, Chip, Popover } from "@mui/material";
import { Edit, Delete, PowerSettingsNew, Info } from "@mui/icons-material";
import GroupModal from "./GroupModal";
import { useForm, router } from "@inertiajs/react";
import DeleteModal from "@/Components/DeleteModal";

const GroupDataTable = ({ fercapGroups }) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteGroupId, setDeleteGroupId] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const { data, setData, reset, put, processing, errors } = useForm({
        name: "",
        target_id: "",
        user_list: [],
    });
    console.log(fercapGroups[0].user_list.length);
    const fetchGroupUsers = async (groupId) => {
        try {
            const response = await axios.get(`/api/group-user-list/${groupId}`);
            setSelectedUsers(response.data);
            // setSelectedUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (fercapGroupData) => {
        fetchGroupUsers(fercapGroupData.id);
        setData({
            name: fercapGroupData.group_name,
            target_id: fercapGroupData.id,
        });
        setShowModal(true);
    };

    const handleDeleteShow = (fercapGroupDataId) => {
        setDeleteGroupId(fercapGroupDataId);
        setShowDeleteModal(true);
    };

    const handleDeleteClose = () => {
        setDeleteGroupId(null);
        setShowDeleteModal(false);
    };

    const handleDeleteSubmit = (e) => {
        e.preventDefault();

        router.delete(`/fercap-groups/${deleteGroupId}`, {
            preserveScroll: true,
            onFinish: () => {
                setDeleteGroupId(null);
                setShowDeleteModal(false);
            },
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        data.user_list = selectedUsers;
        // After successful update:
        put(`/fercap-groups/${data.target_id}`, {
            preserveScroll: true,
            onFinish: () => {
                setShowModal(false);
            },
        });
    };

    const handleClose = () => {
        setShowModal(false);
        reset();
    };

    const toggleStatus = (groupId) => {
        router.get(`/fercap-groups/toggle-status/${groupId}`, {
            preserveScroll: true,
        });
    };

    const idPopover = open ? "simple-popover" : undefined;
    const openPopover = Boolean(anchorEl);

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border">
                <thead className="bg-gray-700 dark:bg-gray-700">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Group Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Member
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
                    {fercapGroups?.length > 0 ? (
                        fercapGroups.map((fercapGroup, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {fercapGroup.group_name}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    <Button
                                        variant="text"
                                        aria-describedby={idPopover}
                                        onClick={(event) =>
                                            setAnchorEl(event.currentTarget)
                                        }
                                    >
                                        {fercapGroup.user_list.length} Members
                                    </Button>
                                    <Popover
                                        id={idPopover}
                                        open={openPopover}
                                        anchorEl={anchorEl}
                                        onClose={() => setAnchorEl(null)}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "left",
                                        }}
                                    >
                                        <div className="p-2">
                                            <p className="font-bold">Member List</p>
                                            <ul className="list-decimal pl-5 grid grid-cols-2 gap-x-6">
                                                {fercapGroup.user_list.map((full_name, index) => (
                                                    <li key={index}>{full_name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Popover>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    <Chip
                                        label={
                                            fercapGroup.status
                                                ? "Active"
                                                : "Disabled"
                                        }
                                        color={
                                            fercapGroup.status
                                                ? "success"
                                                : "error"
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
                                                handleEdit(fercapGroup)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            startIcon={<Delete />}
                                            color="error"
                                            size="small"
                                            onClick={() =>
                                                handleDeleteShow(fercapGroup.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="contained"
                                            startIcon={<PowerSettingsNew />}
                                            color="success"
                                            size="small"
                                            onClick={() =>
                                                toggleStatus(fercapGroup.id)
                                            }
                                        >
                                            Disable
                                        </Button>
                                        {/* <Button
                                            variant="contained"
                                            startIcon={<Info />}
                                            color="info"
                                            size="small"
                                        >
                                            Info
                                        </Button> */}
                                    </Stack>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <GroupModal
                show={showModal}
                onClose={handleClose}
                onSubmit={handleEditSubmit}
                data={data}
                setData={(field, value) => setData(field, value)}
                errors={errors}
                isEdit={true}
                selectedList={selectedUsers}
                setSellectedList={setSelectedUsers}
            />
            <DeleteModal
                show={showDeleteModal}
                onClose={handleDeleteClose}
                onSubmit={handleDeleteSubmit}
                title="FERCAP Group"
            />
        </>
    );
};

export default GroupDataTable;
