import {CircularProgress, Paper, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React, {useEffect, useState} from "react";
import { Message } from "../../gql/graphql";
import DoneAllIcon from '@mui/icons-material/DoneAll';import IconButton from "@mui/material/IconButton";
import DoneIcon from '@mui/icons-material/Done';
import {useGetMessageViewers} from "../../hooks/useGetMessageViewers";
import {useLazyQuery} from "@apollo/client";

interface ChatBubbleProps {
    message: Message;
    loggedUserId: string | undefined;
    chatId: string;
}

//i chose not to query directly to the parent like message.views because i'ts more opti, user don't want to know all of the viewer for all messages


const ChatBubble = ({ message, loggedUserId, chatId }:ChatBubbleProps) => {

    useEffect(() => {
        console.log("disable view viewers")
        setOpen(false);


    }, [chatId]);



    const [open,setOpen] = useState(false);

    //console.log(message);
    //console.log(loggedUserId);

    // @ts-ignore
    const [loadMessageViewers, { data, loading, error }] = useGetMessageViewers();





    const handleClickIconButton = async() => {
        console.log("from bublle",message)

        try {
            const { data,loading } = await loadMessageViewers({
                variables: {
                    messageId: message._id,
                    chatId: chatId,
                }
            })

            console.log("--> error",error)

            setOpen(true);

            setTimeout(() => {
                setOpen(false);
            }, 5000);

        } catch (error) {
            console.error("Error fetching viewers:", error);
        }


    };



    if (message.userId === loggedUserId) {
        return(


            <Stack
                direction="row"
                spacing={2}
                alignItems="flex-end"
                justifyContent="flex-end"
                sx={{ width: "100%", mb: 2, ml:-2 }}
            >


                <Stack spacing={0.5} alignItems="flex-end" sx={{maxWidth: "80%"}}>  {}
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

                        {new Date(message.createdAt).toLocaleDateString()} at {new Date(message.createdAt).toLocaleTimeString()}
                        <IconButton onClick={handleClickIconButton} aria-label="voir" disabled={loading}>
                            {loading ? (
                                <CircularProgress size={16} />
                            ) : (
                                <DoneIcon fontSize="small" />
                            )}
                        </IconButton>


                    </Typography>

                    {open && <Typography variant="caption" color="text.secondary">

                        {data?.getMessageViewers?.length === 0 && <>Send, but read by nobody yet</>}

                        {data?.getMessageViewers && data?.getMessageViewers?.length > 0 && (
                            <Typography variant="caption" color="text.secondary">
                                Read by {data?.getMessageViewers.join(', ')}
                            </Typography>
                        )}

                    </Typography>}
                </Stack>
            </Stack>


        )
    }

    return (



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
                        backgroundColor: "rgb(43,45,48)",
                        borderRadius: "15px",
                    }}
                >
                    <Typography sx={{ wordBreak: 'break-word', whiteSpace: 'normal' }} variant={"body1"}>{message?.content}</Typography>
                </Paper>
                <Typography variant="caption" color="text.secondary">

                    {message.userPseudo} - {new Date(message.createdAt).toLocaleDateString()} at {new Date(message.createdAt).toLocaleTimeString()}
                    <IconButton onClick={handleClickIconButton} aria-label="voir" disabled={loading}>
                        {loading ? (
                            <CircularProgress size={16} />
                        ) : (
                            <DoneIcon fontSize="small" />
                        )}
                    </IconButton>

                </Typography>






                {open && <Typography variant="caption" color="text.secondary">

                    {data?.getMessageViewers?.length === 0 && <>Send, but read by nobody yet</>}

                    {data?.getMessageViewers && data?.getMessageViewers?.length > 0 && (
                        <Typography variant="caption" color="text.secondary">
                            Read by {data?.getMessageViewers.join(', ')}
                        </Typography>
                    )}

                </Typography>}
            </Stack>
        </Stack>

    )

}

export default ChatBubble;