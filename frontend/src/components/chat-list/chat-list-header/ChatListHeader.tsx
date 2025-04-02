import React from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import ChatListHeaderAddButton from "./ChatListHeaderAddButton";

const ChatListHeader = () => {


    return (


        <AppBar position="static" color="transparent">
        <Toolbar>
            <IconButton size="large" edge="start">

                <ChatListHeaderAddButton/>


            </IconButton>

        </Toolbar>
        </AppBar>)

}

export default ChatListHeader;