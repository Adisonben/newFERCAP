import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Snackbar, Alert } from "@mui/material";
import { Add } from "@mui/icons-material";
import ProtocolDataTable from "./Partials/ProtocolDataTable";
import ProtocolModal from "./Partials/ProtocolModal";
import PermissionGuard from "@/Components/PermissionGuard";

const ProtocolTypePage = ({ success, error, protocolTypes, role_name }) => {
    const [creatingProtocolType, setCreatingProtocolType] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        if (success?.message) {
            setShowSuccessAlert(true);
            setAlertMessage(success.message);
        }
    }, [success?.timestamp]); // Use timestamp to trigger effect

    useEffect(() => {
        if (error?.message) {
            setShowErrorAlert(true);
            setAlertMessage(error.message);
        }
    }, [error?.timestamp]); // Use timestamp to trigger effect

    const handleCloseSuccess = () => {
        setShowSuccessAlert(false);
        setAlertMessage(null);
    };
    const handleCloseError = () => {
        setShowErrorAlert(false);
        setAlertMessage(null);
    };

    const createProtocolType = () => {
        setCreatingProtocolType(true);
    };

    const closeModal = () => {
        setCreatingProtocolType(false);
        reset();
    };

    const { data, setData, reset, post, processing, errors } = useForm({
        name: "",
        ordering: "",
    });

    const storeProtocolType = (e) => {
        e.preventDefault();

        post(route("protocol-types.store"), {
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
                    Protocol Type
                </h2>
            }
        >
            <Head title="Protocol Type" />
            <Snackbar
                key={success?.timestamp}
                open={showSuccessAlert}
                autoHideDuration={3000}
                onClose={handleCloseSuccess}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={handleCloseSuccess}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>

            <Snackbar
                key={error?.timestamp}
                open={showErrorAlert}
                autoHideDuration={3000}
                onClose={handleCloseError}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    severity="error"
                    variant="filled"
                    onClose={handleCloseError}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
            <div className="sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <div className="flex justify-between mb-4">
                            <p className="text-xl font-bold">
                                Protocol Types Table
                            </p>
                            <PermissionGuard
                                userRole={role_name}
                                permissionName="add_protocol_type"
                            >
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    startIcon={<Add />}
                                    onClick={createProtocolType}
                                >
                                    Create
                                </Button>
                                <ProtocolModal
                                    show={creatingProtocolType}
                                    onClose={closeModal}
                                    onSubmit={storeProtocolType}
                                    data={data}
                                    setData={(field, value) =>
                                        setData(field, value)
                                    }
                                    errors={errors}
                                    processing={processing}
                                />
                            </PermissionGuard>
                        </div>
                        <ProtocolDataTable protocolTypes={protocolTypes} role_name={role_name} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProtocolTypePage;
