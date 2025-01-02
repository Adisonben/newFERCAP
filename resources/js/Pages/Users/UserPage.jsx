import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import UserModal from "./Partials/UserModal";
import RespAlert from "@/Components/RespAlert";
import UsersDataTable from "./Partials/UsersDataTable";

const UserPage = ({ resFormBack, users }) => {
    const [creatingUser, setCreatingUser] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (resFormBack?.success) {
            setShowAlert(true);
        }
        if (resFormBack?.error) {
            setShowAlert(true);
        }
    }, [resFormBack?.timestamp]); // Use timestamp to trigger effect

    const createUser = () => {
        setCreatingUser(true);
    };

    const closeModal = () => {
        setCreatingUser(false);
        reset();
    };

    const { data, setData, reset, post, processing, errors } = useForm({
        role: "",
        email: "",
        password: "",
    });

    const storeUser = (e) => {
        e.preventDefault();
        post(route("users.store"), {
            preserveScroll: true,
            onFinish: () => {
                closeModal();
            },
        });
    };
    console.log(errors);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Users
                </h2>
            }
        >
            <Head title="Users" />
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
                                Users Table
                            </p>
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                startIcon={<Add />}
                                onClick={createUser}
                            >
                                Create
                            </Button>
                            <UserModal
                                show={creatingUser}
                                onClose={closeModal}
                                onSubmit={storeUser}
                                data={data}
                                setData={(field, value) =>
                                    setData(field, value)
                                }
                                errors={errors}
                            />
                        </div>
                        <UsersDataTable usersList={users} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UserPage;
