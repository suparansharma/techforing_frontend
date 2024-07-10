import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import AuthUser from './AuthUser';

const Header = () => {
    const { token, logout } = AuthUser();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutUser = () => {
        if (token) {
            logout();
            window.location.reload();

        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Logo
                </Typography>
                {isMobile ? (
                    <>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {token ? (
                                <>
                                    <MenuItem onClick={logoutUser}>Logout</MenuItem>
                                    <MenuItem component={Link} to="/home">Home</MenuItem>
                                    <MenuItem component={Link} to="/dashboard">Dashboard</MenuItem>
                                    <MenuItem component={Link} to="/jobmanage">Manage Jobs</MenuItem>
                                </>


                            ) : (
                                <>
                                    <MenuItem component={Link} to="/login">Login</MenuItem>
                                    <MenuItem component={Link} to="/register">Register</MenuItem>
                                    <MenuItem component={Link} to="/jobmanage">Manage Jobs</MenuItem>


                                </>
                            )}

                        </Menu>
                    </>
                ) : (
                    <>
                        {token ? (
                            <>
                                <Button component={Link} to="/home" color="inherit">Home</Button>
                                <Button component={Link} to="/dashboard" color="inherit">Dashboard</Button>
                                <Button component={Link} to="/jobmanage" color="inherit">Manage Jobs</Button>
                                <Button component={Link} to="/" color="inherit">Job Dashboard</Button>

                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={logoutUser}>Logout</MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button component={Link} to="/login" color="inherit">Login</Button>
                                <Button component={Link} to="/register" color="inherit">Register</Button>
                                <Button component={Link} to="/" color="inherit">Job Dashboard</Button>
                            </>
                        )}
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
