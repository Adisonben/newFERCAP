import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import PollIcon from '@mui/icons-material/Poll';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';

export const userMenu = [
    {
        label: "Dashboard",
        path: "/",
        icon: <DashboardIcon />
    },
    {
        label: "Calendar",
        path: "/",
        icon: <CalendarMonthIcon />
    },
    {
        label: "Recognition",
        path: "/recognitions",
        icon: <DescriptionIcon />
    },
    {
        label: "Survey",
        path: "/",
        icon: <PollIcon />
    },
];

export const adminMenu = [
    {
        label: "Protocol type",
        path: "/protocol-types",
        icon: <ListAltIcon />
    },
    {
        label: "FERCAP Group",
        path: "/fercap-groups",
        icon: <GroupsIcon />
    },
    {
        label: "Users",
        path: "/users",
        icon: <PersonIcon />
    },
];
