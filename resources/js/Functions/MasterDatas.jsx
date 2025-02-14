export const recognitionFileTypes = [
    { id: 1, name: "members", label: "Members" },
    { id: 2, name: "staffs", label: "Staffs" },
    { id: 3, name: "sops", label: "SOPs" },
    { id: 4, name: "accessments", label: "Assessments" },
    { id: 5, name: "invoices", label: "Invoice" },
    { id: 6, name: "receipts", label: "Receipts" },
    { id: 7, name: "letters", label: "Letters" },
    { id: 8, name: "slip", label: "Slip" },
    { id: 9, name: "annual_progress_reports", label: "Annual Progress Reports" }
];

export const permissions = [
    // Page permissions
    {
        name: "view_dashboard",
        roles: ['admin', 'moderator'],
    },
    {
        name: "view_recognition",
        roles: ['admin', 'moderator', 'ec', 'fercap'],
    },
    {
        name: "view_available_survey",
        roles: ['admin', 'surveyor'],
    },
    {
        name: "view_my_survey",
        roles: ['admin', 'surveyor'],
    },
    {
        name: "view_protocol_type",
        roles: ['admin', 'moderator'],
    },
    {
        name: "view_fercap_group",
        roles: ['admin', 'moderator'],
    },
    {
        name: "view_users",
        roles: ['admin'],
    },

    // Action permissions
    // Recognition
    {
        name: "show_recognition",
        roles: ['admin', 'ec', 'moderator', 'fercap'],
    },
    {
        name: "add_recognition",
        roles: ['admin', 'ec', 'moderator'],
    },
    {
        name: "edit_recognition",
        roles: ['admin', 'moderator', 'ec'],
    },
    {
        name: "delete_recognition",
        roles: ['admin', 'moderator', 'ec'],
    },
    {
        name: "setallow_recognition",
        roles: ['admin', 'moderator'],
    },
    {
        name: "setreject_recognition",
        roles: ['admin', 'moderator'],
    },
    // Survey
    {
        name: "add_survey",
        roles: ['admin', 'moderator'],
    },
    {
        name: "show_survey",
        roles: ['admin', 'moderator', 'surveyor', 'fercap', 'ec'],
    },
    {
        name: "edit_survey",
        roles: ['admin', 'moderator'],
    },
    {
        name: "delete_survey",
        roles: ['admin', 'moderator'],
    },
    {
        name: "add_survey_file",
        roles: ['admin', 'moderator', 'ec'],
    },
    // Survey Team
    {
        name: "edit_survey_team",
        roles: ['admin', 'moderator'],
    },
    {
        name: "view_survey_team",
        roles: ['admin', 'moderator', 'fercap', 'surveyor'],
    },

    // Disscussion
    {
        name: "submit_discussion_file", // Submit discussion file share to other discussion room
        roles: ['admin', 'moderator', 'fercap'],
    },
    {
        name: "reject_discussion_file", // Reject discussion file
        roles: ['admin', 'moderator', 'fercap'],
    },
    {
        name: "handle_discussion_file", // Approve discussion file and close discussion room
        roles: ['admin', 'moderator'],
    },
    {
        name: "close_discussion",
        roles: ['admin', 'moderator'],
    },
    {
        name: "ec_discussion_room",
        roles: ['admin', 'moderator', 'ec', 'fercap'],
    },
    {
        name: "surveyor_discussion_room",
        roles: ['admin', 'moderator', 'fercap', 'surveyor'],
    },
    {
        name: "toggle_discussion_room_status",
        roles: ['admin', 'moderator'],
    },

    // Protocol type
    {
        name: "add_protocol_type",
        roles: ['admin', 'moderator'],
    },
    {
        name: "edit_protocol_type",
        roles: ['admin', 'moderator'],
    },
    {
        name: "delete_protocol_type",
        roles: ['admin', 'moderator'],
    },
    {
        name: "disable_protocol_type",
        roles: ['admin', 'moderator'],
    },
    // Fercap group
    {
        name: "add_fercap_group",
        roles: ['admin', 'moderator'],
    },
    {
        name: "edit_fercap_group",
        roles: ['admin', 'moderator'],
    },
    {
        name: "delete_fercap_group",
        roles: ['admin', 'moderator'],
    },
    {
        name: "disable_fercap_group",
        roles: ['admin', 'moderator'],
    },
    // User
    {
        name: "add_user",
        roles: ['admin'],
    },
    {
        name: "edit_user",
        roles: ['admin'],
    },
    {
        name: "delete_user",
        roles: ['admin'],
    },
    {
        name: "disable_user",
        roles: ['admin'],
    },
]

export const userRoles = [
    {
        id: 1,
        name: "admin",
        label: "Admin",
    },
    {
        id: 2,
        name: "moderator",
        label: "Moderator",
    },
    {
        id: 3,
        name: "fercap",
        label: "FERCAP",
    },
    {
        id: 4,
        name: "ec",
        label: "Ethic Committee",
    },
    {
        id: 5,
        name: "surveyor",
        label: "Surveyor",
    },
]

export const userStatus = [
    {
        id: 0,
        name: "Inactivate",
    },
    {
        id: 1,
        name: "Activate",
    },
    {
        id: 2,
        name: "Deleted",
    },
    {
        id: 3,
        name: "Uncomplete",
    },
]
