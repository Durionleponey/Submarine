import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from "@mui/material/Button";

interface IChatHeaderProps {
    chatName: string | null | undefined;
}

const ChatHeader = ({ chatName }:IChatHeaderProps) => {
    return (
        <Box
            component="header"
            sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
            }}
        >
            <Typography variant="h4" component="h1">
                {chatName}
            </Typography>

            <Tooltip title="Add a user to the group">
                <Button
                    sx={{
                        color: 'inherit',
                        ml: 'auto'
                    }}
                    variant="text"        // 'text' | 'contained' | 'outlined'
                    startIcon={<PersonAddIcon />}
                >
                    Add member
                </Button>
            </Tooltip>
        </Box>
    );
}

export default ChatHeader;