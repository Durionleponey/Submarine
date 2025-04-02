import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ChatListItem from "./chat-list-item/ChatList-Item";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import {Stack} from "@mui/material";

const chatList  = () =>  {
    return (

        <Stack>




                <ChatListHeader/>
                <Divider/>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: "86.5vh", overflowY: 'auto' }}>
                        <ChatListItem/>
                        <ChatListItem/>
                        <ChatListItem/>
                        <ChatListItem/>
                        <ChatListItem/>
                        <ChatListItem/>
                        <ChatListItem/>
                        <ChatListItem/>
                        <ChatListItem/>
                        <ChatListItem/>
                        <ChatListItem/>
                        <ChatListItem/>
                        <ChatListItem/>
                        <ChatListItem/>
                </List>



        </Stack>



    );
}

export default chatList;