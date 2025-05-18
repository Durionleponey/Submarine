
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {CircularProgress, FormControlLabel, FormGroup, InputBase, List, ListSubheader, Paper, Stack, Switch, TextField} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import {useCreateChat} from "../../../hooks/useCreateChat";
import router from "../../Routes";
import {useAddUserToChat} from "../../../hooks/useAddUserToChat";
import any = jasmine.any;
import {useParams} from "react-router-dom";
import {SnackInterface, snackVar} from "../../../constants/snack";
import {useGetUsers} from "../../../hooks/useGetUsers";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {cursorTo} from "node:readline";


interface ChatListAddMenberInterface {
    open: boolean;
    handleClose: () => void;
}


const successAddUser = (email:String) => ({
    text: `${email} added to chat.`,
    type: "success" as const
});







const ChatListAddMenber = ({open, handleClose}:ChatListAddMenberInterface) => {

    const [isError, setIsError] = useState("");
    const [email, setEmail] = useState("")
    const [addUser] = useAddUserToChat();
    const [getUsers, { data, error, loading }] = useGetUsers();
    const [showSearchResult, setShowSearchResult] = useState(false)
    const [continueTheSearch, setContinueTheSearch] = useState(true)
    const [isTyping, setIsTyping] = useState(false)
    const [previousMailL, setPreviousMailL] = useState(0)


    const params = useParams();
    const chatId = params._id || ""

    const onClosee = () => {
        setIsError("");
        setEmail("")
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
    }, [open]);


    useEffect(() => {

        if (!continueTheSearch){setContinueTheSearch(true);return}
        setIsTyping(true)
        if (email.length > 0) {
            if(data?.users.length == 0 && previousMailL < email.length){setIsTyping(false);return}
            const timeoutId = setTimeout(() => {
                console.log("👀👀👀👀-->query")
                getUsers({ variables: { search: email } });
                setIsTyping(false)
                setShowSearchResult(true);
                setPreviousMailL(email.length)
            }, 1000);

            return () => {setIsTyping(false);clearTimeout(timeoutId);}
        } else {
            setIsTyping(false);
            setShowSearchResult(false);
        }
    }, [email]);








    const handleChatListAddMenber = async () => {




        if (email.length == 0) {
                setIsError("Please enter a email or a pseudo");
                return;

            }

        let userAddToGroup

        try{

            userAddToGroup = await addUser({
                variables: {
                    email: email,
                    chatId:chatId

                }
            })

        }catch (err) {

            // @ts-ignore
            setIsError((err.message).toString());
            console.log(err)
            return;

        }

            handleClose()
        snackVar(successAddUser(email));
            onClosee();

        }




    // @ts-ignore
    return(
        <Modal open={open} onClose={() => {
            handleClose();
            onClosee();
        }}>
            <Box
                sx={{
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "rgb(29,96,220)",
                    borderRadius: "12px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                    p: 4,
                    color: "#f5f5f5",
                    border: "1px solid #2c2c3e",
                }}
            >
                <Stack spacing={2}>

                    <Typography variant="h5" component="h2">Add a user to the group</Typography>

                    {(
                        <TextField inputRef={inputRef} error={!!isError} helperText={isError}
                                   label={"Email or pseudo of the user"}
                                   value={email}
                                   onChange={(event) => setEmail(event.target.value)} onKeyDown={async event => {
                            if (event.key == "Enter") {
                                await handleChatListAddMenber()
                            }

                        }}/>

                    )
                    }


                    {showSearchResult && <List
                        sx={{
                        Width: 360,
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300,
                        '& ul': { padding: 0 },
                    }}
                        subheader={<li />}
                        >
                    {data?.users.map((user) => (
                        <li key={user.pseudo}>
                    <ul>
                            <ListItem key={user.pseudo}   sx={{
                                border: '1px solid #ccc',
                                borderRadius: '12px',
                                mb: 1,
                                px: 2,
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    backgroundColor: 'rgba(244,189,48,0.73)',
                                    borderColor: '#1976d2',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                },
                            }}>
                                <ListItemText primary={user.pseudo} sx={{ cursor: 'pointer' }} onClick={() => {
                                    setEmail(user.pseudo)
                                    setContinueTheSearch(false)

                                }}/>
                            </ListItem>
                    </ul>
                </li>
                ))}
            </List>}

                    {loading || isTyping && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                            <CircularProgress color="secondary" />
                        </Box>
                    )}


                    {showSearchResult && !loading && !isTyping && !data?.users[0] && <>no pseudo matching</>}



                    <Button variant="contained" onClick={handleChatListAddMenber} sx={{textTransform: "none"}}>Add
                        User</Button>
                </Stack>


            </Box>

        </Modal>

    )

}

export default ChatListAddMenber;