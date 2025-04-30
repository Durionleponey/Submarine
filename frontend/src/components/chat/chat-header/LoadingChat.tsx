import { CircularProgress, Box } from "@mui/material";

const LoadingChat = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100%"
        >
            <CircularProgress sx={{ color: "rgba(244,189,48,0.73)" }} size={80} />
        </Box>
    );
};

export { LoadingChat };
