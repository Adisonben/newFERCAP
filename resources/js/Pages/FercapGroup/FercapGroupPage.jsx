import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import GroupDataTable from "./Partials/GroupDataTable";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import GroupModal from "./Partials/GroupModal";
import RespAlert from "@/Components/RespAlert";
import UserSelection from "./Partials/UserSelection";
import PermissionGuard from "@/Components/PermissionGuard";

const FercapGroupPage = ({ resFormBack, fercapGroups, role_name }) => {
    const [creatingGroup, setCreatingGroup] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (resFormBack?.success) {
            setShowAlert(true);
        }
        if (resFormBack?.error) {
            setShowAlert(true);
        }
    }, [resFormBack?.timestamp]); // Use timestamp to trigger effect

    const createFercapGrop = () => {
        setCreatingGroup(true);
    };

    const closeModal = () => {
        setCreatingGroup(false);
        reset();
    };

    const { data, setData, reset, post, processing, errors } = useForm({
        name: "",
        user_list: [],
    });

    const storeGroup = (e) => {
        e.preventDefault();
        data.user_list = selectedUsers;
        post(route("fercap-groups.store"), {
            preserveScroll: true,
            onFinish: () => {
                closeModal();
            },
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    FERCAP Group
                </h2>
            }
        >
            <Head title="FERCAP Group" />
            <RespAlert
                showAlert={showAlert}
                resp={resFormBack}
                handleCloseAlert={() => setShowAlert(false)}
            />
            <div className="sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <div className="flex justify-between mb-4">
                            <p className="text-xl font-bold">
                                FERCAP Group Table
                            </p>
                            <PermissionGuard userRole={role_name} permissionName="add_fercap_group">
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    startIcon={<Add />}
                                    onClick={createFercapGrop}
                                >
                                    Create
                                </Button>
                                <GroupModal
                                    show={creatingGroup}
                                    onClose={closeModal}
                                    onSubmit={storeGroup}
                                    data={data}
                                    setData={(field, value) =>
                                        setData(field, value)
                                    }
                                    errors={errors}
                                    selectedList={selectedUsers}
                                    setSellectedList={setSelectedUsers}
                                    processing={processing}
                                />
                            </PermissionGuard>
                        </div>
                        <div className="overflow-x-auto">
                            <GroupDataTable fercapGroups={fercapGroups} role_name={role_name} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default FercapGroupPage;
