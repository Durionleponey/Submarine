import {Box, CircularProgress} from "@mui/material";
import Branding from "../header/Branding";
import * as React from "react";
import Typography from "@mui/material/Typography";


const Home = () => {


    const seaEmojis = [
        "🌊", // Vague
        "🐠", // Poisson tropical
        "🐟", // Poisson
        "🐬", // Dauphin
        "🐳", // Baleine avec jet
        "🐋", // Baleine
        "🦈", // Requin
        "🦑", // Calamar
        "🐙", // Pieuvre
        "🪸", // Corail
        "🐚", // Coquillage
        "🏝️", // Île déserte
        "⚓", // Ancre
        "🧜‍♂️", // Triton
        "🧜‍♀️", // Sirène
        "🧭", // Boussole
    ];

    const randomSeaEmoji = seaEmojis[Math.floor(Math.random() * seaEmojis.length)];






    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="80vh"
        >
            <>

                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    style={{ userSelect: "none" }}
                sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'flex'},
                        fontFamily: 'monospace',
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        fontSize:50,
                        cursor: 'default',
                    }}
                >
                    {randomSeaEmoji}
                </Typography>

                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    style={{ userSelect: "none" }}
                sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'flex'},
                        fontFamily: 'monospace',
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        fontSize:15,
                        cursor: 'default',
                    }}
                >
                    select a chat to start
                </Typography>
            </>
        </Box>
    );
}

export default Home;