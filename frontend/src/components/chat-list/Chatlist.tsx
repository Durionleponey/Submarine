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
import {useEffect, useState} from "react";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import {useGetChat} from "../../hooks/useGetChat";
import {Chat} from "../../gql/graphql";
import ChatListItem from './chat-list-item/ChatList-Item';
import {usePath} from "../../hooks/usePatch";
import {useMessageCreated} from "../../hooks/useMessageCreated";
import {useChatCreated} from "../../hooks/useChatCreated";


const ChatList  = () =>  {

    const [chatListaddModel, setChatListaddModel] = useState(false);
    const {data} = useGetChat();
    const {path} = usePath();
    const { data: latestChat } = useChatCreated()

    const [chats, setChats] = useState<Chat[]>([]);





    const [selectedChatId, setSelectedChatId] = useState("");


    //console.log(chatList)


    useEffect(() => {
        if (data?.chatss) {
            setChats(data.chatss);
        }
    }, [data]);


    useEffect(() => {
        const pathSplit = path.split('chats/');
        if (pathSplit.length ===2){
            setSelectedChatId(pathSplit[1]);

        }

    },[path])


    useEffect(() => {
        if (latestChat?.chatCreated) {
            setChats((prev) => [...prev, latestChat.chatCreated]);
        }
    }, [latestChat]);


    // @ts-ignore

    return (
        <>
            <ChatListAdd open={chatListaddModel} handleClose={() => setChatListaddModel(false)} />
            <Stack >


                <ChatListHeader handleAddChat={() => setChatListaddModel(true)}/>

                <List sx={{ width: '100%', maxWidth: 380, bgcolor: 'background.paper', height: `calc(101dvh - 150px)`, overflowY: 'auto',                "&::-webkit-scrollbar": {
                        width: 8,
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderRadius: 4,
                    },

                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(255,255,255,0.2) transparent",}}>


                    {chats?.map((chat: Chat) => (
                        <ChatListItem chat={chat} selected={chat._id === selectedChatId}/>
                    )).reverse()}

                </List>
            </Stack>
        </>

    );
}

export default ChatList;