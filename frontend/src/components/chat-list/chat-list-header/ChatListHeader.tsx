import React from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import ChatListHeaderAddButton from "./ChatListHeaderAddButton";
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DisabledVisibleIcon from '@mui/icons-material/DisabledVisible';
import Tooltip from "@mui/material/Tooltip";



const ChatListHeader = () => {


    return (


        <AppBar position="static" color="transparent">
            <Toolbar>

                <Tooltip title="Start a new conversation">
                    <IconButton size="large" edge="start">
                        <AddCircleIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Toggle visibility of the conv">
                    <IconButton size="large" edge="start">
                        <DisabledVisibleIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Delete all chats">
                    <IconButton size="large" edge="start">
                        <ClearAllIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Delete all your chats and your account">
                    <IconButton size="large" edge="start">
                        <CrisisAlertIcon />
                    </IconButton>
                </Tooltip>

            </Toolbar>
        </AppBar>)

}

export default ChatListHeader;