import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, Checkbox, Button } from "@mui/material";
import TextInput from "@/Components/TextInput";

const UserSelection = ({selectedList, setData}) => {
    // const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("/api/select-user-list");
            setUsers(response.data.data);
            // setSelectedUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    // const users = Array.from({ length: 100 }, (_, index) => ({
    //     id: index + 1,
    //     name: `User ${index + 1}`,
    //     email: `user${index + 1}@example.com`,
    //     department: ["Engineering", "Marketing", "Sales", "Design"][index % 4],
    // }));

    const handleToggle = (userId) => {
        setData((prevSelected) => {
            if (prevSelected.includes(userId)) {
                return prevSelected.filter((id) => id !== userId);
            } else {
                return [...prevSelected, userId];
            }
        });
    };

    // Filter users based on search query
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle select all functionality
    const handleSelectAll = () => {
        // If search is active, only select/deselect filtered users
        const relevantUsers = filteredUsers;

        // Check if all filtered users are selected
        const areAllSelected = relevantUsers.every((user) =>
            selectedList.includes(user.id)
        );

        if (areAllSelected) {
            // Deselect all filtered users
            setData((prevSelected) =>
                prevSelected.filter(
                    (id) => !relevantUsers.some((user) => user.id === id)
                )
            );
        } else {
            // Select all filtered users
            const newSelectedUsers = new Set([
                ...selectedList,
                ...relevantUsers.map((user) => user.id),
            ]);
            setData([...newSelectedUsers]);
        }
    };

    // Check if all filtered users are selected
    const areAllFilteredSelected =
        filteredUsers.length > 0 &&
        filteredUsers.every((user) => selectedList.includes(user.id));

    // Check if some (but not all) filtered users are selected
    const areSomeFilteredSelected =
        filteredUsers.some((user) => selectedList.includes(user.id)) &&
        !areAllFilteredSelected;

    return (
        <>
            {/* <CardHeader title="User Selection" /> */}
            <CardContent>
                <div>
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
                                Select All {searchQuery && "Filtered"} Users
                            </p>
                        </div>
                        <Button
                            variant="contained"
                            size="sm"
                            onClick={() => setData([])}
                        >
                            Clear All
                        </Button>
                    </div>
                    <div className="h-60 overflow-y-auto">
                        <div className="divide-y">
                            {filteredUsers.length > 0 ?
                                filteredUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center space-x-4 p-3 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => handleToggle(user.id)}
                                    >
                                        <div onClick={(e) => e.stopPropagation()}>
                                            <Checkbox
                                                checked={selectedList.includes(
                                                    user.id
                                                )}
                                                onChange={() =>
                                                    handleToggle(user.id)
                                                }
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">
                                                {user.name}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {user.role}
                                            </p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="p-3 text-center text-gray-500">
                                        No users found
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* Selection summary */}
                <div className="mt-2 p-2 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">
                        Selected: {selectedList.length} users
                    </p>
                </div>
            </CardContent>
        </>
    );
};

export default UserSelection;
