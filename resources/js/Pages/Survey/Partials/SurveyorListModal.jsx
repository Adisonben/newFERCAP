import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, Checkbox, Button } from "@mui/material";
import TextInput from "@/Components/TextInput";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";

const SurveyorListModal = ({ show, setShow, surveyId }) => {
    // const [show, setShow] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [surveyors, setSurveyors] = useState([]);

    const fetchSurveyors = async () => {
        // fetch surveyors
        try {
            if (!surveyId) {
                console.error("Survey ID is required");
                return;
            }
            const response = await axios.get(`/api/surveyor-list/${surveyId}`);
            setSurveyors(response.data);
        } catch (error) {
            console.error("Error fetching surveyor list.");
        }
    }

    useEffect(() => {
        fetchSurveyors();
    }, [show]);

    const handleToggle = (userId) => {
        setSelectedUsers((prevSelected) => {
            if (prevSelected.includes(userId)) {
                return prevSelected.filter((id) => id !== userId);
            } else {
                return [...prevSelected, userId];
            }
        });
    };

    // Filter users based on search query
    const filteredUsers = surveyors.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Check if all filtered users are selected
    const areAllFilteredSelected =
        filteredUsers.length > 0 &&
        filteredUsers.every((user) => selectedUsers.includes(user.id));

    // Check if some (but not all) filtered users are selected
    const areSomeFilteredSelected =
        filteredUsers.some((user) => selectedUsers.includes(user.id)) &&
        !areAllFilteredSelected;

    // Handle select all functionality
    const handleSelectAll = () => {
        // If search is active, only select/deselect filtered users
        const relevantUsers = filteredUsers;

        // Check if all filtered users are selected
        const areAllSelected = relevantUsers.every((user) =>
            selectedUsers.includes(user.id)
        );

        if (areAllSelected) {
            // Deselect all filtered users
            setSelectedUsers((prevSelected) =>
                prevSelected.filter(
                    (id) => !relevantUsers.some((user) => user.id === id)
                )
            );
        } else {
            // Select all filtered users
            const newSelectedUsers = new Set([
                ...selectedUsers,
                ...relevantUsers.map((user) => user.id),
            ]);
            setSelectedUsers([...newSelectedUsers]);
        }
    };

    const handleAddSurveyors = () => {
        router.post(`/surveys/${surveyId}/add-team`, {
            teamList: selectedUsers,
        });
        setShow(false);
    }
    return (
        <Modal show={show} onClose={() => setShow(false)}>
            <div className="px-6 py-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Select Surveyors
                </h2>

                <div className="mt-4">
                    <div className="mb-4">
                        <TextInput
                            id="search"
                            type="search"
                            className="block w-full"
                            placeholder="Search user..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Scrollable container */}
                    <div className="mt-2 border rounded-md">
                        <div className="p-2 flex items-center justify-between">
                            <div className="flex items-center space-x-4 px-2">
                                <Checkbox
                                    checked={areAllFilteredSelected}
                                    onChange={handleSelectAll}
                                    indeterminate={areSomeFilteredSelected}
                                />
                                <p className="font-medium truncate">
                                    Select {searchQuery && "filtered"} All Users
                                </p>
                            </div>
                            <Button variant="contained" size="small" onClick={() => setSelectedUsers([])}>
                                Clear All
                            </Button>
                        </div>
                        <div className="h-60 overflow-y-auto">
                            <div className="divide-y">
                                {filteredUsers?.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center space-x-4 p-3 hover:bg-gray-50 cursor-pointer"
                                        >
                                            <div>
                                                <Checkbox
                                                    checked={selectedUsers.includes(
                                                        user.id
                                                    )}
                                                    onChange={() =>
                                                        handleToggle(user.id)
                                                    }
                                                />
                                            </div>
                                            <div
                                                className="flex-1 min-w-0"
                                                onClick={() =>
                                                    handleToggle(user.id)
                                                }
                                            >
                                                <p className="font-medium truncate">
                                                    {user.name}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {user.role}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-3 text-center text-gray-500">
                                        No users found
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Selection summary */}
                    <div className="mt-2 p-2 bg-gray-50 rounded">
                        <p className="text-sm text-gray-600">
                            Selected: {selectedUsers.length} users
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={() => setShow(false)}>
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton
                        className="ms-3"
                        // disabled={processing}
                        onClick={handleAddSurveyors}
                    >
                        Add
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
};

export default SurveyorListModal;
