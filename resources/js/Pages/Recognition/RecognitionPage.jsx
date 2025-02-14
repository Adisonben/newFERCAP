import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import RespAlert from "@/Components/RespAlert";
import RecognitionsTable from "./Partials/Table/RecognitionsTable";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import PermissionGuard from "@/Components/PermissionGuard";

const RecognitionPage = ({ resFormBack, recognitions, role_name }) => {
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        if (resFormBack?.error) {
            setShowAlert(true);
        }
        if (resFormBack?.success) {
            setShowAlert(true);
        }
    }, [resFormBack?.timestamp]); // Use timestamp to trigger effect

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Recognitions
                </h2>
            }
        >
            <Head title="Recognitions Table" />
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
                                Recognitions Table
                            </p>
                            <PermissionGuard
                                permissionName={"add_recognition"}
                                userRole={role_name}
                            >
                                <Link
                                    href={route("recognitions.create")}
                                    className="text-white"
                                >
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        startIcon={<Add />}
                                        // onClick={createProtocolType}
                                    >
                                        Create
                                    </Button>
                                </Link>
                            </PermissionGuard>
                        </div>
                        <div className="overflow-x-auto">
                            <RecognitionsTable recognitions={recognitions} role_name={role_name} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default RecognitionPage;
