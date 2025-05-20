import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Auth from "../auth/Auth";
import router from "../Routes";

const Branding = () => {


    return(// TODO:modifier ca c'est moche lol
        <>
            <img
                src="/img/submarineLogo.png"
                alt="logo"
                style={{
                    width: "100%",
                    maxWidth: "40px",
                    height: "auto",
                    display: "block",
                    margin: "10px"
                }}
            />
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                    mr: 2,
                    display: {xs: 'none', md: 'flex'},
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    //cursor: 'pointer',
                }}
            >
                Submarine
            </Typography>
        </>
    )
}

export default Branding;