import { useLocation, useParams } from "react-router-dom";
import { useGetSingleChat } from "../../hooks/useGetSingleChat";
import { Box, CircularProgress, InputBase, Paper, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useCreateMessage } from "../../hooks/useCeateMessage";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import Avatar from "@mui/material/Avatar";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
} from "@mui/material";

import { Message } from "../../gql/graphql";
import Tooltip from "@mui/material/Tooltip";
import ClearAllIcon from "@mui/icons-material/esm/icon";
import ChatHeader from "./chat-header/Chat-header";
import { LoadingChat } from "./chat-header/LoadingChat";
import ChatBubble from "./Chat-bubble";
import { useGetMe } from "../../hooks/useGetMe";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SnackInterface, snackVar } from "../../constants/snack";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ViewerPop from "./Chat-viewer";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useViewMessage } from "../../hooks/useviewMessage";
import EditLocationIcon from '@mui/icons-material/EditLocation';
import {useChatCreated} from "../../hooks/useChatCreated";



const messageToLong: SnackInterface = {

    text: "Message must have max 2000 caracter",
    type: "warning",

}


const Chat = () => {
    const params = useParams();
    const { data: user } = useGetMe();
    const [messageState, setMessageState] = useState("");
    const chatId = params._id || ""
    //console.log("chatId", chatId);
    const { data, loading, error } = useGetSingleChat({ _id: chatId || "" })
    const [createMessage] = useCreateMessage(chatId);
    const divRef = useRef<HTMLDivElement | null>(null);
    const [viewMessage] = useViewMessage();
    const location = useLocation();
    const [isSendButtonDisabled, SetisSendButtonDisabled] = useState(false);
    //console.log("hello",location)
    const { data: latestMessage } = useMessageCreated({ chatId })

    //const { data: latestChat } = useChatCreated()
    const [openViewers, setOpenViewers] = React.useState(false);


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

/*    useEffect(() => {
        console.log("❤️❤️❤️❤️❤️❤️❤️❤️-->", latestChat)

    }, [latestChat]);*/

    useLayoutEffect(() => {
        divRef.current?.scrollIntoView({ block: "end" });
    }, [messagesLocal]);

    const createMessageLogic = async () => {

        if (!messageState) { return }
        await createMessage({ variables: { createMessageInput: { content: messageState, chatId: chatId } } })
        //wait for createMessage before setMessageState("")

        setMessageState("");
    };

    const viewMessageLogic = () => {

        viewMessage({ variables: { chatId: chatId } })
    };
    const { data: dbMessages, error: dbMessagesError } = useGetMessages(chatId);



    useEffect(() => {
        console.log("useEffect1 - cache message change copy in messageLocal");

        if (dbMessages) {
            const mergedMessages = [
                ...dbMessages.getMessages,
                ...messagesLocal2
            ];

            const sortedMessages = mergedMessages.sort(
                (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );

            const limitedMessages = sortedMessages.slice(-50);

            // @ts-ignore
            setMessagesLocal(limitedMessages);

            console.log("🦬🦬 Nouvelle valeur de messagesLocal :", limitedMessages);
        }


    }, [dbMessages, messagesLocal2]);

    const [openLocationDialog, setOpenLocationDialog] = useState(false);
    const [cityInput, setCityInput] = useState("");
    const [radiusInput, setRadiusInput] = useState("");




    useEffect(() => {
        console.log("useEffect2 - adding last message to messageLocal")

        // @ts-ignore
        const LastMessage = messagesLocal2[messagesLocal2.length - 1]?._id;



        // @ts-ignore
        if (latestMessage?.messageCreated && LastMessage !== latestMessage?.messageCreated._id) {




            // @ts-ignore
            setMessagesLocal2([...messagesLocal2, latestMessage.messageCreated]);
            // @ts-ignore
            viewMessage({ variables: { chatId: chatId, messageId: latestMessage?.messageCreated._id } })



        }
        //console.log("🦬🦬 Nouvelle valeur de messagesLocal2 :", messagesLocal2);
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
        console.log("useEffect5 - reset db local")
        viewMessageLogic()
        setMessagesLocal2([])
    }, [chatId]);
    const handleConfirmLocation = async () => {
        if (!cityInput || !radiusInput) return;

        const radius = parseFloat(radiusInput);
        if (isNaN(radius)) {
            alert("⛔ Rayon invalide !");
            return;
        }

        const geoUrl = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityInput)}&format=json`;

        try {
            const res = await fetch(geoUrl);
            const data = await res.json();

            if (!data || data.length === 0) {
                alert("❌ Ville introuvable.");
                return;
            }

            let options = "📍 Plusieurs résultats trouvés, choisis :\n";
            data.forEach((city: any, i: number) => {
                options += `${i + 1}. ${city.display_name}\n`;
            });

            const choice = prompt(options);
            const index = parseInt(choice ?? "");
            if (isNaN(index) || !data[index - 1]) {
                alert("❌ Choix invalide.");
                return;
            }

            const selectedCity = data[index - 1];
            const latitude = parseFloat(selectedCity.lat);
            const longitude = parseFloat(selectedCity.lon);

            await createMessage({
                variables: {
                    createMessageInput: {
                        content: messageState,
                        chatId,
                        latitude,
                        longitude,
                        radius,
                        city: selectedCity.display_name, // ← IMPORTANT
                    },
                },
            });
            console.log({
                content: messageState,
                chatId,
                latitude,
                longitude,
                radius,
                city: selectedCity.display_name,
            });



            setMessageState("");
            setOpenLocationDialog(false);
        } catch (err) {
            alert("❌ Erreur lors de la géolocalisation.");
            console.error(err);
        }
    };
    const [geoLat, setGeoLat] = useState<number | null>(null);
    const [geoLon, setGeoLon] = useState<number | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setGeoLat(pos.coords.latitude);
            setGeoLon(pos.coords.longitude);
        });
    }, []);






    useEffect(() => {
        console.log("useEffect4 - enable disable send button")
        if (!messageState || messageState.length > 2000) {
            SetisSendButtonDisabled(true);
        } else {
            SetisSendButtonDisabled(false);
        }
        if (messageState.length > 2000) {
            snackVar(messageToLong)
        }





    }, [messageState]);

    //console.log(messages)

    if (!messagesLocal || loading) {
        return <LoadingChat />;
    }

    if (error) {
        return <h1>We looked everywhere, but your chat doesn’t exist 😯</h1>;
    }


    if (dbMessagesError) { return <h1>{dbMessagesError.message}</h1> }
    type MessageWithVisibilityEntry = {
        message: Message;
        isVisible: boolean;
        info?: string | null;
    };






    const displayedMessageIds = new Set(messagesLocal.map((msg) => msg._id));

    return (
        <Stack sx={{ height: `calc(100dvh - 140px)`, justifyContent: "space-between" }}>
            <ChatHeader chatName={data?.chat.name} />
            <Box ref={boxRef} onScroll={handleScroll} sx={{ maxHeight: "80vh", height: "80vh", overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent", "&::-webkit-scrollbar": { width: 8 }, "&::-webkit-scrollbar-track": { background: "transparent" }, "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 4 } }}>
                {(!messagesLocal || messagesLocal.length === 0) && (
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            No message yet, be the first to start the conversation ✨
                        </Typography>
                    </Box>
                )}

                {[...messagesLocal].map((message) => (
                    <ChatBubble key={message._id} message={message} loggedUserId={user?.me?._id} chatId={chatId} />
                ))}

                {!isAtBottom && (
                    <KeyboardArrowDownIcon sx={{ position: 'fixed', bottom: 150, right: 16, cursor: 'pointer', bgcolor: 'background.paper', borderRadius: '50%', boxShadow: 3, p: 1, backgroundColor: "#2b2d30", zIndex: 1000, fontSize: 50 }} onClick={() => { scrollToBottom() }} />
                )}

                {openViewers && <ViewerPop open={openViewers} setOpen={setOpenViewers} />}
                <div ref={divRef}></div>
            </Box>
            <Paper
                onSubmit={e => {
                    e.preventDefault();
                }}
                component="form"
                elevation={0}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "99%",
                    p: "8px 16px",
                    bgcolor: "rgba(35,39,42,0.8)",
                    borderRadius: "24px",
                    marginY: 1,
                    marginBottom: "-70px",
                }}
            >
                <IconButton sx={{ mr: 1 }} disabled={true}>
                    <AttachFileIcon fontSize="small" />
                </IconButton>

                <InputBase
                    inputRef={inputRef}
                    value={messageState}
                    placeholder="Message"
                    onChange={(e) => setMessageState(e.target.value)}
                    onKeyDown={async event => {
                        if (event.key == "Enter" && messageState.length < 2000 && messageState.length > 0) {
                            await createMessageLogic()
                        } if (messageState.length > 2000) {
                            snackVar(messageToLong)
                        }


                    }}
                    sx={{
                        flex: 1,
                        ml: 1,
                        fontSize: "1.1rem",
                        color: "inherit",
                        ".MuiInputBase-input::placeholder": { opacity: 0.6 },
                    }}
                />
                <IconButton
                    disabled={isSendButtonDisabled}
                    color="secondary"
                    onClick={createMessageLogic}
                >
                    <ArrowCircleUpIcon sx={{ fontSize: 28 }} />
                </IconButton>
                <IconButton
                    disabled={isSendButtonDisabled}
                    color="secondary"
                    onClick={() => setOpenLocationDialog(true)}
                >
                    <EditLocationIcon sx={{ fontSize: 28 }} />
                </IconButton>


            </Paper>
            <Dialog open={openLocationDialog} onClose={() => setOpenLocationDialog(false)}>
                <DialogTitle>📍 Message géolocalisé</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Ville"
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Rayon (km)"
                        value={radiusInput}
                        onChange={(e) => setRadiusInput(e.target.value)}
                        type="number"
                        fullWidth
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenLocationDialog(false)}>Annuler</Button>
                    <Button
                        onClick={handleConfirmLocation}
                        variant="contained"
                        disabled={!messageState || isSendButtonDisabled}
                    >
                        Envoyer
                    </Button>
                </DialogActions>
            </Dialog>


        </Stack>)
}

export default Chat