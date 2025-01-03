import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import RespAlert from "@/Components/RespAlert";
import RecognitionsTable from "./Partials/RecognitionsTable";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

const RecognitionPage = () => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Recognitions
                </h2>
            }
        >
            <Head title="Recognitions Table" />
            {/* <RespAlert
                showAlert={showAlert}
                resp={resFormBack}
                handleCloseAlert={() => setShowAlert(false)}
            /> */}
            <div className="sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <div className="flex justify-between mb-4">
                            <p className="text-xl font-bold">
                                Recognitions Table
                            </p>
                            <Link
                                href={route('recognitions.create')}
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
                            {/* <GroupModal
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
                            /> */}
                        </div>
                        <RecognitionsTable />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default RecognitionPage;
