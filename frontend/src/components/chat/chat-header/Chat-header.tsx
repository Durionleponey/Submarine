import { Box, Tooltip } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from "@mui/material/Button";
import { useState } from "react"; // <- à importer absolument
import ChatListAddMenber from "./ChatHeaderAddUser";

interface IChatHeaderProps {
    chatName: string | null | undefined;
}

const ChatHeader = ({ chatName }: IChatHeaderProps) => {
    const [openAddMember, setOpenAddMember] = useState(false);

    const handleOpen = () => setOpenAddMember(true);
    const handleClose = () => setOpenAddMember(false);

    return (
        <>
            <Box
                component="header"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: {md: -8, sm: -5},
                    pb: {md: 5, sm: 1},

                }}
            >
                <h1 style={{marginTop: '4px'}}>
                    {chatName}
                </h1>


                <Tooltip title="Add a user to the group">
                    <Button
                        sx={{
                            color: 'inherit',
                            ml: 'auto'
                        }}
                        variant="text"
                        onClick={handleOpen}
                        startIcon={<PersonAddIcon/>}
                    >
                        Add member
                    </Button>
                </Tooltip>
            </Box>

            <ChatListAddMenber open={openAddMember} handleClose={handleClose}/>
        </>
    );
}

export default ChatHeader;
