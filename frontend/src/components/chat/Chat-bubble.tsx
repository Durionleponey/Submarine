import {Paper, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React from "react";
import { Message } from "../../gql/graphql";

interface ChatBubbleProps {
    message: Message;
    loggedUserId: string | undefined;
}




const ChatBubble = ({ message, loggedUserId }:ChatBubbleProps) => {

    //console.log(message);
    //console.log(loggedUserId);

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

                        </Typography>
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

            </Typography>
        </Stack>
    </Stack>

)

}

export default ChatBubble;