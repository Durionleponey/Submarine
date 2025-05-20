import React from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import ChatListHeaderAddButton from "./ChatListHeaderAddButton";
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DisabledVisibleIcon from '@mui/icons-material/DisabledVisible';
import CompareIcon from '@mui/icons-material/Compare';
import Tooltip from "@mui/material/Tooltip";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import RefreshIcon from '@mui/icons-material/Refresh';
import AlertDialog from "./AlertDialog";



interface ChatListHeaderProps {
    handleAddChat:() => void;
    fun:()=>void;

}





const ChatListHeader = ({handleAddChat, fun}:ChatListHeaderProps) => {
    const [open, setOpen] = React.useState(false);



    return (


        <AppBar position="static" color="transparent" sx={{ mt: 1 }}>
            <Toolbar sx={{ justifyContent: "center" }}>

{/*                <Tooltip title="Start a new private conversation">
                    <IconButton size="large" edge="start" disabled={true}>
                        <AddCircleIcon />
                    </IconButton>
                </Tooltip>*/}

                <Tooltip title="Create a new group">
                    <IconButton size="large" edge="start" onClick={handleAddChat}>
                        <GroupAddIcon />
                    </IconButton>
                </Tooltip>

{/*                <Tooltip title="Toggle visibility of the conversation">
                    <IconButton size="large" edge="start" disabled={true}>
                        <DisabledVisibleIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Toggle visibility of the Submarine Brainding">
                    <IconButton size="large" edge="start" disabled={true}>
                        <CompareIcon />
                    </IconButton>
                </Tooltip>*/}

                <Tooltip title="Leave all your chat">
                    <IconButton onClick={() => {setOpen(true)}} size="large" edge="start">
                        <ClearAllIcon />
                    </IconButton>
                </Tooltip>

{/*                <Tooltip title="Delete all your chats and your account">
                    <IconButton size="large" edge="start" disabled={true}>
                        <CrisisAlertIcon />
                    </IconButton>
                </Tooltip>*/}

                {open && <AlertDialog fun={fun} title={"Leave all your chats ?"} AlertMessage="Leave all chats ? Your messages will not be deleted ! This action can't be undone." open={open} setOpen={setOpen} />}


                {/*                <Tooltip title="Refresh the chat list">
                    <IconButton size="large" edge="start" disabled={true}>
                        <RefreshIcon />
                    </IconButton>//i will make a subscription
                </Tooltip>*/}

            </Toolbar>
        </AppBar>)

}

export default ChatListHeader;