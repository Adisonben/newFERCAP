import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import PollIcon from '@mui/icons-material/Poll';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import { FolderShared } from '@mui/icons-material';

export const userMenu = [
    {
        label: "Dashboard",
        path: "/",
        icon: <DashboardIcon />,
        perm: "view_dashboard"
    },
    {
        label: "Recognition",
        path: "/recognitions",
        icon: <DescriptionIcon />,
        perm: "view_recognition"
    },
    {
        label: "Available Survey",
        path: "/available-survey",
        icon: <PollIcon />,
        perm: "view_available_survey"
    },
    {
        label: "My Survey",
        path: "/my-survey",
        icon: <FolderShared />,
        perm: "view_my_survey"
    },
];

export const adminMenu = [
    {
        label: "Protocol type",
        path: "/protocol-types",
        icon: <ListAltIcon />,
        perm: "view_protocol_type"
    },
    {
        label: "FERCAP Group",
        path: "/fercap-groups",
        icon: <GroupsIcon />,
        perm: "view_fercap_group"
    },
    {
        label: "Users",
        path: "/users",
        icon: <PersonIcon />,
        perm: "view_users"
    },
];
