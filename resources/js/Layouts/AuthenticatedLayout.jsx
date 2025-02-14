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
import PermissionGuard from "@/Components/PermissionGuard";

const drawerWidth = 240;

export default function AuthenticatedLayout(props) {
    const { window, header, children } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const user = usePage().props.auth.user;
    const role_name = usePage().props.auth.role_name;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <Toolbar>
                <p className="font-bold text-xl">FERCAP</p>
            </Toolbar>
            <Divider />
            <List>
                {userMenu.map((menu, index) => (
                    <PermissionGuard
                        key={index}
                        permissionName={menu["perm"]}
                        userRole={role_name}
                    >
                        <ListItem disablePadding>
                            <Link href={menu["path"]} className="w-full">
                                <ListItemButton>
                                    <ListItemIcon>{menu["icon"]}</ListItemIcon>
                                    <ListItemText primary={menu["label"]} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    </PermissionGuard>
                ))}
            </List>
            <Divider />
            <List>
                {adminMenu.map((menu, index) => (
                    <PermissionGuard
                        key={index}
                        permissionName={menu["perm"]}
                        userRole={role_name}
                    >
                        <Link href={menu["path"]}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{menu["icon"]}</ListItemIcon>
                                    <ListItemText primary={menu["label"]} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </PermissionGuard>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{ backgroundColor: "#0ABB87" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <nav className="w-full">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="flex gap-2 shrink-0 items-center">
                                    <Link href="/">
                                        {/* <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" /> */}
                                        <img
                                            src="/images/fercapminilogo.png"
                                            alt=""
                                            className="h-full max-h-10 fill-current text-gray-500"
                                        />
                                    </Link>
                                    {header}
                                </div>
                            </div>

                            <div className="sm:ms-6 flex items-center">
                                <div className="relative ms-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                                >
                                                    {user.full_name}

                                                    <svg
                                                        className="-me-0.5 ms-2 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </nav>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* main */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    backgroundColor: grey[100],
                }}
                className="min-h-screen flex flex-col overflow-auto"
            >
                <Toolbar />
                <Box sx={{ p: 3, height: "100%" }}>{children}</Box>
                <Box component="footer" className="mt-auto p-3 bg-white">
                    <p className="text-center md:text-start">
                        © FERCAP cPanel {new Date().getFullYear()}
                    </p>
                </Box>
            </Box>
        </Box>
    );
}
