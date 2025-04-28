
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {FormControlLabel, FormGroup, InputBase, Paper, Stack, Switch, TextField} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import {useCreateChat} from "../../../hooks/useCreateChat";
import router from "../../Routes";
import {useAddUserToChat} from "../../../hooks/useAddUserToChat";
import any = jasmine.any;
import {useParams} from "react-router-dom";


interface ChatListAddMenberInterface {
    open: boolean;
    handleClose: () => void;
}





const ChatListAddMenber = ({open, handleClose}:ChatListAddMenberInterface) => {

    const [isError, setIsError] = useState("");
    const [email, setEmail] = useState("")
    const [addUser] = useAddUserToChat();

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






    const handleChatListAddMenber = async () => {




        if (email.length == 0) {
                setIsError("Please enter a email");
                return;

            }

            let userAddToGroup

            try {
                userAddToGroup = await addUser({
                    variables: {
                        email: email,
                        chatId:chatId

                    }
                })

            }catch {
                setIsError("Unknow Error while creating Chat");
            }

            handleClose()
            onClosee();


        }




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
                        <TextField inputRef={inputRef} error={!!isError} helperText={isError} label={"Email of the user"} onChange={(event) => setEmail(event.target.value)} onKeyDown={async event =>  {
                            if (event.key == "Enter") {
                                await handleChatListAddMenber()
                            }

                        }}/>

                    )
                }

                    <Button variant="contained" onClick={handleChatListAddMenber} sx={{ textTransform: "none" }}>Add User</Button>
                </Stack>


            </Box>

        </Modal>

    )

}

export default ChatListAddMenber;