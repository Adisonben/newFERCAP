import React, { useEffect, useState } from "react";
import FileItem from "@/Components/FileItem";
import { router } from "@inertiajs/react";
import {
    Description,
    Visibility,
    FileDownload,
    Person,
    Add,
    Save,
    ArrowBack,
} from "@mui/icons-material";
import { Button, styled } from "@mui/material";
import SurveyorListModal from "./SurveyorListModal";
import MemberItem from "./MemberItem";
import { useForm } from "@inertiajs/react";

const GreyButton = styled(Button)({
    backgroundColor: "#9CA3AF",
    color: "#1F2937",
    "&:hover": {
        backgroundColor: "#6B7280",
    },
});

const SurveyTeam = ({ survey_id, teamList, recog_id }) => {
    const [show, setShow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { data, setData, reset, post, processing, errors } = useForm({
        survey_id: survey_id,
        team_member: teamList.reduce((acc, member) => {
            acc[member.id] = member.team_role;
            return acc;
        }, {}) || {},
    });

    const handleSaveSurveyTeam = (e) => {
        e.preventDefault();
        post("/surveys/save-team", {
            preserveScroll: true,
        });
    };

    const deleteTeamMember = async (member_id) => {
        try {
            router.delete(`/surveys/${survey_id}/survey-team/member/${member_id}`);
        } catch (error) {
            alert('An unexpected error occurred. Please try again.');
        } finally {
            setShowDeleteModal(false);
        }
    };

    const backToRecog = () => {
        window.history.back();
    }

    return (
        <>
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="flex justify-between mb-4">
                    <p className="text-xl font-bold">Servey Team Member</p>
                    <div className="flex gap-2">
                        <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => setShow(true)}
                            disabled={processing}
                        >
                            <Add />
                        </Button>
                        <form onSubmit={handleSaveSurveyTeam}>
                            <Button
                                size="small"
                                variant="contained"
                                type="submit"
                                disabled={processing}
                            >
                                <Save />
                            </Button>
                        </form>
                        <GreyButton size="small" variant="contained" onClick={backToRecog} disabled={processing}>
                            <ArrowBack />
                        </GreyButton>
                    </div>
                </div>
                <div className="overflow-y-auto h-80">
                    <div className="space-y-2 mb-4">
                        {teamList &&
                            teamList.map((member) => (
                                <MemberItem
                                    key={member.id}
                                    member={member}
                                    data={data}
                                    setData={setData}
                                    deleteTeamMember={deleteTeamMember}
                                    showDeleteModal={showDeleteModal}
                                    setShowDeleteModal={setShowDeleteModal}
                                />
                            ))}
                    </div>
                </div>
            </div>
            <SurveyorListModal
                show={show}
                setShow={setShow}
                surveyId={survey_id}
            />
        </>
    );
};

export default SurveyTeam;
