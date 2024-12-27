import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import Dropdown from "@/Components/Dropdown";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { userMenu, adminMenu } from "./menuData";
import { grey } from "@mui/material/colors";

const drawerWidth = 240;

export default function UncompleteLayout(props) {
    const { children } = props;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <main>{children}</main>
        </div>
    );
}
