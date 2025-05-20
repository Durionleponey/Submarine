import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useImperativeHandle, useState} from "react";
import {useLogout} from "../../hooks/useLogout";
import router from "../Routes";
import client from "../../constants/apollo-client";
import {SnackInterface, snackVar} from "../../constants/snack";
import {text} from "node:stream/consumers";
import {authenticateVar} from "../../constants/authenticated";
import {useGetMe} from "../../hooks/useGetMe";


const erreurLogout:SnackInterface = {

    text:"Erreur Logout Failed!",
    type:"error",

}


const succesLogout:SnackInterface = {

    text:"You are now logged out!",
    type:"info",

}




const Option = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { logout } = useLogout();
    const me = useGetMe();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Box sx={{ ml: 2 }}>
                <Box
                    onClick={handleOpenUserMenu}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2,
                        py: 0.5,
                        bgcolor: 'rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        maxWidth: 250,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.2)',
                        },
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: 'white',
                            flexGrow: 1,
                        }}
                    >
                        {me?.data?.me.email}
                    </Typography>
                    <Tooltip title="Open settings">
                        <IconButton sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>


            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem
                    key={'logout'}
                    onClick={async () => {
                        try {
                            await logout();
                            authenticateVar(false);
                            await client.clearStore();
                            snackVar(succesLogout);
                            router.navigate("/login");
                        } catch (err) {
                            snackVar(erreurLogout);
                        }
                        handleCloseUserMenu();
                    }}
                >
                    <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default Option;
