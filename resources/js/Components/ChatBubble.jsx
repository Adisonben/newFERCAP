import React from "react";
import { Person } from "@mui/icons-material";
import ChatFile from "./ChatFile";

const ChatBubble = ({message, currentUser, onSubmitFile, submitedFile, setRefresh, refresh, role_name}) => {
    return (
        <div
            className={`flex ${
                message.sender === currentUser ? "justify-end" : "justify-start"
            }`}
        >
            <div
                className={`flex max-w-[80%] ${
                    message.sender === currentUser
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800"
                } rounded-lg p-3 shadow-sm`}
            >
                <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                        <Person className="w-4 h-4" />
                        <span className="font-medium text-sm">
                            {message.sender}
                        </span>
                        <span className="text-xs opacity-75">
                            {message.timestamp}
                        </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                    { message.fileData && (
                        <ChatFile refresh={refresh} role_name={role_name} setRefresh={setRefresh} fileStatus={message?.fileStatus} fileData={message.fileData} onSubmitFile={onSubmitFile} submitedFile={submitedFile} messageId={message?.message_id} />
                    ) }
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;
