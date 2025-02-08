
export const getDateString = (date) => {
    const d = new Date(date ?? Date.now());
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return d.toLocaleDateString("en-US", options);
};


export const getFileSize = (bytes) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

// function for get date string as "YYYY-MM-DD" and return next date
export const getNextDate = (date) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    return currentDate.toISOString().split("T")[0];
}

// function for get date string as "YYYY-MM-DD" and return previous date
export const getPrevDate = (date) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    return currentDate.toISOString().split("T")[0];
}

export const getRecStatusLabel = (status) => {
    switch (status) {
        case 0:
            return "Disabled";
        case 1:
            return "Active";
        case 2:
            return "Complete";
        case 3:
            return "Rejected";
        default:
            return "Unknown";
    }
};

export const getRecStatusColor = (status) => {
    switch (status) {
        case 0:
            return "default";
        case 1:
            return "primary";
        case 2:
            return "success";
        case 3:
            return "error";
        default:
            return "default";
    }
};

export const getSurvStatusLabel = (status) => {
    switch (status) {
        case 0:
            return "Close";
        case 1:
            return "Ongoing";
        case 2:
            return "Complete";
        case 3:
            return "Fail";
        default:
            return "Unknown";
    }
};

export const getSurvStatusColor = (status) => {
    switch (status) {
        case 0:
            return "default";
        case 1:
            return "primary";
        case 2:
            return "success";
        case 3:
            return "error";
        default:
            return "default";
    }
};

export const getDisFileStatus = (status) => {
    switch (status) {
        case 0:
            return { label: "Rejected", color: "error" };
        case 1:
            return { label: "Pending", color: "" };
        case 2:
            return { label: "Approved", color: "success" };
        default:
            return { label: "Pending", color: "" };
    }
};
