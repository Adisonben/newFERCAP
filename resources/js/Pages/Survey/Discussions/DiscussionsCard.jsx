import React, {useState, useEffect} from "react";
import { Button } from "@mui/material";
import { Link } from "@inertiajs/react";
import ShowSurveyFile from "./Partials/ShowSurveyFile";
import PermissionGuard from "@/Components/PermissionGuard";

const DiscussionsCard = ({ typeData, survey_id, roomDatas, role_name }) => {
    const [discussionFile, setDiscussionFile] = useState([]);
    const ecRoomData = roomDatas?.filter((roomData) => roomData.get_target_role.codename === "ec")[0];
    const surveyTeamRoomData = roomDatas?.filter((roomData) => roomData.get_target_role.codename === "surveyor")[0];

    const fetchDiscussionFile = async () => {
        const response = await axios.get(`/api/survey/${survey_id}/file-type/${roomDatas[0]?.room_type}`);
        setDiscussionFile(response?.data?.get_file_data);
    };

    useEffect(() => {
        fetchDiscussionFile();
    }, []);


    return (
        <>
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="flex justify-between mb-4">
                    <p className="text-xl font-bold">{typeData.label}</p>
                </div>
                <div className="overflow-y-auto">
                    <div className="space-y-2 mb-4">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                File
                            </h3>
                            <div className="mb-4">
                                <ShowSurveyFile fileData={discussionFile} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Discussion rooms
                            </h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <PermissionGuard userRole={role_name} permissionName="ec_discussion_room">
                                    <Link href={route("surveys.discussion", {survey_id:survey_id, room_id:ecRoomData.room_id})}>
                                        <Button variant="contained" className="w-full">EC</Button>
                                    </Link>
                                </PermissionGuard>

                                <PermissionGuard userRole={role_name} permissionName="surveyor_discussion_room">
                                    <Link href={route("surveys.discussion", {survey_id:survey_id, room_id:surveyTeamRoomData.room_id})}>
                                        <Button variant="contained" color="secondary" className="w-full">Survey Team</Button>
                                    </Link>
                                </PermissionGuard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DiscussionsCard;
