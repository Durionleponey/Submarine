import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import ChatListHeader from "./chat-list-header/ChatListHeader";
import {Stack} from "@mui/material";
import {useState} from "react";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import {useGetChat} from "../../hooks/useGetChat";
import {Chat} from "../../gql/graphql";
import ChatListItem from './chat-list-item/ChatList-Item';

const ChatList  = () =>  {

    const [chatListaddModel, setChatListaddModel] = useState(false);
    const {data} = useGetChat();

    // @ts-ignore

    return (
        <>
            <ChatListAdd open={chatListaddModel} handleClose={() => setChatListaddModel(false)} />
            <Stack>


                <ChatListHeader handleAddChat={() => setChatListaddModel(true)}/>
                <Divider/>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: "86.5vh", overflowY: 'auto' }}>

                    {data?.chatss.map((chat: Chat) => (
                        <ChatListItem chat={chat} />
                    )).reverse()}

                </List>
            </Stack>
        </>

    );
}

export default ChatList;