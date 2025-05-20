import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";
import * as React from "react";
import router from "../Routes";

const MobileBranding = () => {
    return (
        <>
        <Typography
                variant="h5"
                noWrap
                component="a"
                onClick={() => {router.navigate("/")}}
                sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    cursor: 'pointer',
                }}
            >
                Submarine
            </Typography>
        </>
    )
}


export default MobileBranding;