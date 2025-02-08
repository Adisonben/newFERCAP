import React, { useState, useEffect } from "react";
import { Person, Visibility, Delete } from "@mui/icons-material";
import SelectInput from "@/Components/SelectInput";
import { Button } from "@mui/material";
import DeleteModal from "@/Components/DeleteModal";

const MemberItem = ({ member, data, setData, deleteTeamMember, showDeleteModal, setShowDeleteModal }) => {
    const [roleOption, setRoleOption] = useState([]);

    const fetchRole = async () => {
        try {
            const response = await axios.get(`/api/survey-team-roles`);
            setRoleOption(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRole();
    }, []);

    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        deleteTeamMember(member.id)
    };

    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded border hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
                <Person className="h-5 w-5 text-gray-500" />
                <div>
                    <p className="text-sm font-medium text-gray-900">
                        {member.name}
                    </p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                </div>
            </div>
            <div className="flex space-x-2">
                <SelectInput
                    id="fercap_group"
                    value={data.team_member[member.id] || ""}
                    onChange={(e) => {
                        setData("team_member", {
                            ...data.team_member,
                            [member.id]: e.target.value,
                        });
                    }}
                >
                    <option value="" disabled>
                        Select role
                    </option>
                    {roleOption &&
                        roleOption.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                </SelectInput>

                <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => setShowDeleteModal(true)}
                >
                    <Delete />
                </Button>
            </div>
            <DeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onSubmit={handleDeleteSubmit}
                title="Team member"
            />
        </div>
    );
};

export default MemberItem;
