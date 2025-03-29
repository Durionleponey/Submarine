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
import {useState} from "react";
import {useLogout} from "../../hooks/useLogout";
import router from "../Routes";
import client from "../../constants/apollo-client";
import {SnackInterface, snackVar} from "../../constants/snack";
import {text} from "node:stream/consumers";
import {authenticateVar} from "../../constants/authenticated";


const erreurLogout:SnackInterface = {

    text:"Erreur Logout Failed!",
    type:"error",

}




const Option = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { logout } = useLogout();


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="" />
                    </IconButton>
                </Tooltip>
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

                        <MenuItem key={'logout'} onClick={async() => {
                            try {
                                await logout();
                                authenticateVar(false);
                                router.navigate("/login");
                                client.resetStore();
                                handleCloseUserMenu();

                            }catch (err) {

                                snackVar(erreurLogout);


                            }



                        }}>
                            <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                        </MenuItem>

                </Menu>
            </Box>
        </>
    )
}

export default Option;