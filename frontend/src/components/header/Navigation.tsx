import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";


interface NavigationProps {
    pages: string[]
}


const Navigation = ({pages}: NavigationProps) => {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (

        <>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page}
                    </Button>
                ))}
            </Box>
        </>)

}

export default Navigation;