import {useLocation, useParams} from "react-router-dom";
import {useGetSingleChat} from "../../hooks/useGetSingleChat";
import {Box, CircularProgress, InputBase, Paper, Stack, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {useCreateMessage} from "../../hooks/useCeateMessage";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useGetMessages} from "../../hooks/useGetMessages";
import Avatar from "@mui/material/Avatar";
import {useMessageCreated} from "../../hooks/useMessageCreated";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { Message } from "../../gql/graphql";
import Tooltip from "@mui/material/Tooltip";
import ClearAllIcon from "@mui/icons-material/esm/icon";
import ChatHeader from "./chat-header/Chat-header";
import {LoadingChat} from "./chat-header/LoadingChat";
import ChatBubble from "./Chat-bubble";
import {useGetMe} from "../../hooks/useGetMe";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {SnackInterface, snackVar} from "../../constants/snack";

const messageToLong:SnackInterface = {

    text:"Message must have max 2000 caracter",
    type:"warning",

}


const Chat = () => {
    const params = useParams();
    const {data: user} = useGetMe();
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


    const [isAtBottom, setIsAtBottom] = useState(true);
    const boxRef = useRef<HTMLDivElement | null>(null);

    const handleScroll = () => {
        if (!boxRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = boxRef.current;
        setIsAtBottom(scrollHeight - scrollTop <= clientHeight + 20);
    };



    const [messagesLocal, setMessagesLocal] = useState<Message[]>([]);
    const [messagesLocal2, setMessagesLocal2] = useState<Message[]>([]);



    const scrollToBottom = () => {

        divRef.current?.scrollIntoView({ block: "end" });

    }

    useLayoutEffect(() => {
        divRef.current?.scrollIntoView({ block: "end" });
    }, [messagesLocal]);

    const createMessageLogic = async () => {

        if (!messageState) {return}
        await createMessage({variables:{createMessageInput: {content:messageState, chatId:chatId}}})
        //wait for createMessage before setMessageState("")

        setMessageState("");


    };

    const [hasLoaded, setHasLoaded] = useState(false);
    const {data:dbMessages,error:dbMessagesError} = useGetMessages(chatId, !hasLoaded);

    useEffect(() => {
        if (chatId && !hasLoaded) {
            setHasLoaded(true);
        }
    }, [chatId]);


    useEffect(() => {
        console.log("useEffect1 - cache message change copy in messageLocal")
        if (dbMessages) {
            // @ts-ignore
            setMessagesLocal([...dbMessages.getMessages, ...messagesLocal2]);


        }


    }, [dbMessages,messagesLocal2]);

    useEffect(() => {
        console.log("useEffect2 - adding last message to messageLocal")

        // @ts-ignore
        const LastMessage = messagesLocal2[messagesLocal2.length - 1]?._id;



        // @ts-ignore
        if(latestMessage?.messageCreated && LastMessage !== latestMessage?.messageCreated._id) {

            // @ts-ignore
            setMessagesLocal2([...messagesLocal2, latestMessage.messageCreated]);
        }
        console.log("🦬🦬 Nouvelle valeur de messagesLocal2 :", messagesLocal2);
    }, [latestMessage]);


    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log("useEffect3 - enter a conv")
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
        setMessageState("");

    }, [location, dbMessages]);

    useEffect(() => {
        console.log("useEffect4 - enable disable send button")
        if (!messageState || messageState.length>2000){
            SetisSendButtonDisabled(true);
        }else{
            SetisSendButtonDisabled(false);
        }
        if(messageState.length>2000){
            snackVar(messageToLong)
        }





    }, [messageState]);

    //console.log(messages)

    if (!messagesLocal || loading) {
        return <LoadingChat/>;
    }

    if (error) {
        return <h1>We looked everywhere, but your chat doesn’t exist 😯</h1>;    }


    if (dbMessagesError) {return<h1>{dbMessagesError.message}</h1>}





    return (
        <Stack sx={{ height: `calc(100dvh - 140px)`, justifyContent: "space-between",}}>



            <ChatHeader chatName={data?.chat.name} />
            <Box   ref={boxRef}
                   onScroll={handleScroll} sx={{maxHeight:"80vh",height:"80vh", overflowY:"auto"}}>


                {(!messagesLocal || messagesLocal.length === 0) && (
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            No message yet, be the first to start the conversation ✨
                        </Typography>
                    </Box>
                )}

                {[...messagesLocal]
                    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map((message) => (

                        <ChatBubble message={message} loggedUserId={user?.me?._id}/>

                    ))}



                {!isAtBottom &&(
                <KeyboardArrowDownIcon   sx={{
                    position: 'fixed',
                    bottom: 150,
                    right: 16,
                    cursor: 'pointer',
                    bgcolor: 'background.paper',
                    borderRadius: '50%',
                    boxShadow: 3,
                    p: 1,
                    backgroundColor: "#2b2d30",
                    zIndex: 1000,
                    fontSize:50
                }}  onClick={() =>{scrollToBottom()}}></KeyboardArrowDownIcon>)}



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
                        if (event.key == "Enter" && messageState.length<2000 && messageState.length>0) {
                            await createMessageLogic()
                        }if (messageState.length>2000){
                            snackVar(messageToLong)
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