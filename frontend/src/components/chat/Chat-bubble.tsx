import {CircularProgress, Paper, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React, {useEffect, useState} from "react";
import { Message } from "../../gql/graphql";
import DoneAllIcon from '@mui/icons-material/DoneAll';import IconButton from "@mui/material/IconButton";
import {useGetMessageViewers} from "../../hooks/useGetMessageViewers";
import {useLazyQuery} from "@apollo/client";

interface ChatBubbleProps {
    message: Message;
    loggedUserId: string | undefined;
    chatId: string;
}

// Unlike message.views, this will not query directly to the parent for better performance.
// Users do not need to know all of the viewers for every single message sent.

const ChatBubble = ({ message, loggedUserId, chatId }: ChatBubbleProps) => {
    useEffect(() => {
        console.log("disable view viewers")
        setOpen(false);
    }, [chatId]);

    } catch (error) {
        console.error("Error fetching viewers:", error);
    }


    const [open, setOpen] = useState(false);

    const [loadMessageViewers, { data, loading, error }] = useGetMessageViewers();

    const handleClickIconButton = async() => {
        try {
            const { data,loading } = await loadMessageViewers({
                variables: {
                    messageId: message._id,
                    chatId: chatId,
                }
            })
        setOpen(true);
        setTimeout(() => {
            // Optional: add logic here if needed
        }, 0);
    };

    const formattedDate = new Date(message.createdAt).toLocaleDateString();
    const formattedTime = new Date(message.createdAt).toLocaleTimeString();

    const isSender = message.userId === loggedUserId;

    return (
        <Stack
            direction="row"
            spacing={2}
            alignItems={isSender ? "flex-end" : "flex-start"}
            justifyContent={isSender ? "flex-end" : "flex-start"}
            sx={{ width: "100%", mb: 2, ml: isSender ? -2 : 0 }}
        >
            {!isSender && (
                <Avatar
                    src=""
                    sx={{
                        width: 25,
                        height: 25,
                    }}
                />
            )}

            <Stack spacing={0.5} alignItems={isSender ? "flex-end" : "flex-start"} sx={{ maxWidth: "80%" }}>
                <Paper
                    component="span"
                    elevation={1}
                    sx={{
                        display: "inline-block",
                        width: "fit-content",
                        p: "0.7rem 1.2rem",
                        backgroundColor: isSender ? "rgba(244,189,48,0.56)" : "rgb(43,45,48)",
                        borderRadius: "15px",
                        cursor: "pointer",
                    }}
                    onClick={handleClickIconButton}
                >
                    <Typography sx={{ wordBreak: "break-word", whiteSpace: "normal" }} variant="body1">
                        {message?.content}
                    </Typography>
                </Paper>

                <Typography variant="caption" color="text.secondary">
                {new Date(message.createdAt).toLocaleDateString()} at {new Date(message.createdAt).toLocaleTimeString()}
                    <IconButton onClick={handleClickIconButton} aria-label="voir" disabled={loading}>
                        {loading ? (
                            <CircularProgress size={16} />
                        ) : (
                            <DoneAllIcon fontSize="small" />
                        )}
                    </IconButton>
                </Typography>


                {open && (
                    <Typography variant="caption" color="text.secondary">
                        {loading && "Loading viewers..."}
                        {error && "Error loading viewers."}
                        {!loading && !error && (
                            <>
                                {data?.getMessageViewers?.length === 0 ? (
                                    <Typography variant="caption" color="text.secondary">
                                        Read by {data?.getMessageViewers}
                                        Read by {data?.getMessageViewers.join(', ')}
                                    </Typography>
                                )}
                            </>
                        )}
                    </Typography>
                )}
            </Stack>
        </Stack>
    );
};

export default ChatBubble;