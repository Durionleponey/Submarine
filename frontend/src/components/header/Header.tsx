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
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Branding from "./Branding";
import MobileNavigation from "./MobileNavigation";
import MobileBranding from "./MobileBranding";
import Navigation from "./Navigation";
import Option from "./Option";
import {useReactiveVar} from "@apollo/client";
import {authenticateVar} from "../../constants/authenticated";
import {Grid} from "@mui/material";
import {useGetMe} from "../../hooks/useGetMe";





const Header = () =>{

}


//idk what this code is doing but its there
const StolenHeader= () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const authenticated = useReactiveVar(authenticateVar)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };





    //console.log("😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️",me?.data?.me.email)

    return (

                <AppBar position="static"   sx={{
                    borderRadius: "0 0 16px 16px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}>
                <Container >
                    <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>

                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                            <Branding />
                            <MobileBranding />
                        </Box>


                        {authenticated && (<Option />)}


                    </Toolbar>
                </Container>
            </AppBar>

    );
}
export default StolenHeader;
