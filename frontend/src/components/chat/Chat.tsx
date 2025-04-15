import {useParams} from "react-router-dom";
import {useGetSingleChat} from "../../hooks/useGetSingleChat";
import {Box, InputBase, Paper, Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {useCreateMessage} from "../../hooks/useCeateMessage";
import {useState} from "react";
import {useGetMessages} from "../../hooks/useGetMessages";

const Chat = () => {
    const params = useParams();
    const [messageState, setMessageState] = useState("");
    const chatId = params._id || ""
    //console.log("chatId", chatId);
    const { data, loading} = useGetSingleChat({_id: chatId || ""})
    const [createMessage] = useCreateMessage();

    const {data:messages} = useGetMessages({chatId});

    console.log(messages)

    if (loading) {
        return <h1>Chargement du chat...</h1>;
    }

    if (!data || !data.chat) {
        return <h1>Nous avons cherché partout, votre chat n'existe pas</h1>;
    }



    return (
        <Stack sx={{ height: "100%", justifyContent: "space-between",}}>

            <h1>{data?.chat.name}</h1>
            <Box>
                {messages?.getMessages.map((message) => (
                    <p>{message.content} 👉 {message.createdAt}</p>
                ))}
            </Box>
            <Paper
                sx={{

                    p: "5px 64px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "16px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                }}
            >
                <InputBase
                    placeholder="Message"
                    onChange={(e) => setMessageState(e.target.value)}
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

                <IconButton color="secondary" onClick={() => {
                    createMessage({variables:{createMessageInput: {content:messageState, chatId:chatId}}})
                }}>
                    <ArrowCircleUpIcon sx={{ fontSize: 30 }} />
                </IconButton>
            </Paper>



        </Stack>)
}

export default Chat