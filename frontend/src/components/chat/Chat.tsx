import {useLocation, useParams} from "react-router-dom";
import {useGetSingleChat} from "../../hooks/useGetSingleChat";
import {Box, InputBase, Paper, Stack, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {useCreateMessage} from "../../hooks/useCeateMessage";
import React, {useEffect, useRef, useState} from "react";
import {useGetMessages} from "../../hooks/useGetMessages";
import Avatar from "@mui/material/Avatar";
import {useMessageCreated} from "../../hooks/useMessageCreated";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { Message } from "../../gql/graphql";
import Tooltip from "@mui/material/Tooltip";
import ClearAllIcon from "@mui/icons-material/esm/icon";
import ChatHeader from "./chat-header/Chat-header";


const Chat = () => {
    const params = useParams();
    const [messageState, setMessageState] = useState("");
    const chatId = params._id || ""
    //console.log("chatId", chatId);
    const { data, loading, error} = useGetSingleChat({_id: chatId || ""})
    const [createMessage] = useCreateMessage(chatId);
    const divRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const [isSendButtonDisabled, SetisSendButtonDisabled] = useState(false);
    //console.log("hello",location)
    const {data: latestMessage} = useMessageCreated({chatId})


    const [messagesLocal, setMessagesLocal] = useState<Message[]>([]);


    const scrollToBottom = () => {

        divRef.current?.scrollIntoView();

    }

    const createMessageLogic = async () => {

        if (!messageState) {return}
        await createMessage({variables:{createMessageInput: {content:messageState, chatId:chatId}}})
        //wait for createMessage before setMessageState("")

        setMessageState("");
        scrollToBottom()

    };

    const [hasLoaded, setHasLoaded] = useState(false);
    const {data:dbMessages,error:dbMessagesError} = useGetMessages(chatId, !hasLoaded);

    useEffect(() => {
        if (chatId && !hasLoaded) {
            setHasLoaded(true);
        }
    }, [chatId]);


    useEffect(() => {
        console.log("useEffect1 - dbMessageChange copy in messageLocal")
        if(dbMessages){
            // @ts-ignore
            setMessagesLocal(dbMessages.getMessages);
        }

    }, [dbMessages]);

    useEffect(() => {
        console.log("useEffect2 - adding last message to messageLocal")

        // @ts-ignore
        const LastMessage = messagesLocal[messagesLocal.length - 1]?._id;



        // @ts-ignore
        if(latestMessage?.messageCreated && LastMessage !== latestMessage?.messageCreated._id) {

            // @ts-ignore
            setMessagesLocal([...messagesLocal, latestMessage.messageCreated]);
        }
        scrollToBottom()
        console.log("🦬🦬 Nouvelle valeur de messagesLocal :", messagesLocal);
    }, [messagesLocal, latestMessage]);


    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log("useEffect3 - enter a conv")
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
        setMessageState("");
        scrollToBottom()
    }, [location, dbMessages]);

    useEffect(() => {
        console.log("useEffect4 - enable disable send button")
        if (!messageState){
            SetisSendButtonDisabled(true);
        }else{
            SetisSendButtonDisabled(false);

        }


    }, [messageState]);

    //console.log(messages)

    if (loading) {
        return <h1>Loading chat...</h1>;
    }

    if (error) {
        return <h1>We looked everywhere, but your chat doesn’t exist 😯</h1>;    }


    if (dbMessagesError) {return<h1>{dbMessagesError.message}</h1>}




    return (
        <Stack sx={{ height: `calc(100dvh - 140px)`, justifyContent: "space-between",}}>



            <ChatHeader chatName={data?.chat.name} />
            <Box sx={{maxHeight:"80vh",height:"80vh", overflowY:"auto"}}>
                {[...messagesLocal]
                    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map((message) => (
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="flex-start"
                        sx={{ mb: 2 }}
                    >
                        <Avatar src=""   sx={{
                            width: 25,
                            height: 25,
                        }}/>
                        <Stack spacing={0.5} alignItems="flex-start" sx={{maxWidth: "80%"}}>  {}
                            <Paper
                                component="span"
                                elevation={1}
                                sx={{
                                    display: "inline-block",
                                    width: "fit-content",
                                    p: "0.7rem 1.2rem",
                                    backgroundColor: "rgba(244,189,48,0.56)",
                                    borderRadius: "15px",
                                }}
                            >
                                <Typography sx={{ wordBreak: 'break-word', whiteSpace: 'normal' }} variant={"body1"}>{message?.content}</Typography>
                            </Paper>
                            <Typography variant="caption" color="text.secondary">

                                On {new Date(message.createdAt).toLocaleDateString()} at {new Date(message.createdAt).toLocaleTimeString()}

                            </Typography>
                        </Stack>
                    </Stack>

                ))}


                <div ref={divRef}></div>
            </Box>
            <Paper
                sx={{

                    p: "5px 64px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "-60px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                }}
            >
                <InputBase
                    inputRef={inputRef}
                    value={messageState}
                    placeholder="Message"
                    onChange={(e) => setMessageState(e.target.value)}
                    onKeyDown={async event =>  {
                        if (event.key == "Enter") {
                            await createMessageLogic()
                        }

                    }}
                    sx={{
                        flex: 1,
                        minHeight: 28,
                        fontSize: "1.3rem",
                        ml: -4,
                    }}
                />
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                        height: "50px",
                        borderRightWidth: "2px",
                        borderColor: "white",
                        m: 1,
                    }}
                />

                <IconButton disabled={isSendButtonDisabled}  color="secondary" onClick={createMessageLogic}>
                    <ArrowCircleUpIcon sx={{ fontSize: 30 }} />
                </IconButton>
            </Paper>
        </Stack>)
}

export default Chat