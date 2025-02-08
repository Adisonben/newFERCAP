import React, { useState, useEffect, useRef } from "react";
import { Person, Send, UploadFile, Report, Refresh } from "@mui/icons-material";
import ShowSendFile from "./Partials/ShowSendFile";
import { IconButton, styled, Chip, Switch } from "@mui/material";
import TextInput from "@/Components/TextInput";
import { usePage } from "@inertiajs/react";
import ChatBubble from "@/Components/ChatBubble";
import PermissionGuard from "@/Components/PermissionGuard";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const ChatRoom = ({
    roomId,
    onSubmitFile,
    submitedFile,
    role_name,
    roomStatus,
    setRoomStatus,
}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    const user = usePage().props.auth.user;
    const currentUser = user?.full_name;
    const [errorMessage, setErrorMessage] = useState(null);
    const [roomError, setRoomError] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [file, setFile] = useState(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`/api/get-messages/${roomId}`);
            if (response.status === 200) {
                if (response.data?.length > 0) {
                    const messages = response.data.map((message) => {
                        return {
                            message_id: message.id,
                            room_id: roomId,
                            sender: message.name,
                            content: message.content,
                            timestamp: new Date(
                                message.created_at
                            ).toLocaleString(),
                            fileData: message.file?.get_file_data,
                            fileStatus: message.file?.status,
                        };
                    });
                    setMessages(messages);
                    setRoomError(null);
                }
            } else {
                console.error("Failed to fetch messages!");
                setRoomError("Failed to fetch messages!");
            }
        } catch (error) {
            console.error("Failed to fetch messages!");
            setRoomError("Failed to fetch messages!");
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [refresh]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    }, [errorMessage]);

    const clearFileInput = () => {
        const fileInput = document.getElementById("uploadFile");
        if (fileInput) {
            fileInput.value = "";
        }
        setFile(null);
    };

    const sendMessage = async () => {
        try {
            const response = await axios.post(
                `/api/store-message`,
                {
                    room_id: roomId,
                    content: newMessage,
                    file: file,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 201) {
                console.log("Message sent successfully!");
            } else {
                console.error("Failed to send message!");
                setErrorMessage("Failed to send message!");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Failed to send message!");
        } finally {
            clearFileInput();
            setNewMessage("");
            setRefresh(!refresh);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === "") return;
        sendMessage();
    };

    return (
        <div className="flex flex-col h-full max-h-[50rem] bg-gray-100">
            {/* Header */}
            <div className="bg-white flex justify-between shadow-sm p-4">
                <h1 className="text-xl font-semibold text-gray-800">
                    Chat Room
                </h1>
                {roomStatus ? (
                    <Chip label="Open" color="success" />
                ) : (
                    <Chip label="Close" />
                )}
                {roomError && (
                    <div className="flex items-center bg-red-600 text-white rounded-lg px-2 space-x-1">
                        <Report className="w-4 h-4" />
                        <span className="font-medium text-sm">{roomError}</span>
                    </div>
                )}
                <div>
                    <IconButton
                        aria-label="reFetchMessages"
                        color="primary"
                        onClick={() => setRefresh(!refresh)}
                    >
                        <Refresh fontSize="inherit" />
                    </IconButton>
                    <PermissionGuard userRole={role_name} permissionName="toggle_discussion_room_status">
                        <Switch
                            checked={roomStatus}
                            onChange={() => setRoomStatus(!roomStatus)}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </PermissionGuard>
                </div>
            </div>

            {/* Chat Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <ChatBubble
                        key={index}
                        message={message}
                        role_name={role_name}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        currentUser={currentUser}
                        onSubmitFile={onSubmitFile}
                        submitedFile={submitedFile}
                    />
                ))}
                {errorMessage && (
                    <div className={`flex justify-end`}>
                        <div
                            className={`flex max-w-[80%] bg-red-600 text-white rounded-lg p-2 shadow-sm`}
                        >
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <Report className="w-4 h-4" />
                                    <span className="font-medium text-sm">
                                        {errorMessage}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form
                onSubmit={handleSendMessage}
                className="bg-white border-t py-2 px-4"
            >
                {file && (
                    <ShowSendFile
                        fileData={file}
                        clearFileInput={clearFileInput}
                    />
                )}
                {/* <div className={roomStatus ? "hidden" : "flex space-x-2"}>
                    Room was closed, You can't send message.
                </div> */}
                <div className="flex space-x-2">
                    <TextInput
                        id="newMessage"
                        type="text"
                        disabled={!roomStatus}
                        value={newMessage}
                        className="mt-1 block w-full"
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={roomStatus ? "Type your message..." : "Room was closed, You can't send message."}
                    />
                    <IconButton
                        aria-label="uploadFile"
                        disabled={!roomStatus}
                        component="label"
                        size="large"
                        tabIndex={-1}
                        role={undefined}
                        type="button"
                    >
                        <UploadFile fontSize="inherit" />
                        <VisuallyHiddenInput
                            type="file"
                            id="uploadFile"
                            onChange={(event) => setFile(event.target.files[0])}
                        />
                    </IconButton>
                    <IconButton
                        aria-label="sendMessage"
                        size="large"
                        type="submit"
                        color="primary"
                        disabled={!roomStatus}
                    >
                        <Send fontSize="inherit" />
                    </IconButton>
                </div>
            </form>
        </div>
    );
};

export default ChatRoom;
