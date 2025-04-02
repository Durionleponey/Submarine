
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {FormControlLabel, FormGroup, InputBase, Paper, Stack, Switch, TextField} from "@mui/material";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";



interface ChatListAddInterface {
    open: boolean;
    handleClose: () => void;
}

const ChatListAdd = ({open, handleClose}:ChatListAddInterface) => {

    const [isPrivate, setIsPrivate] = useState(true);


    return(
        <Modal open={open} onClose={handleClose}>
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

                <Typography variant="h5" component="h2">Add Chat</Typography>
                <FormGroup>
                    <FormControlLabel style={{ width:0}} control={<Switch defaultChecked={true} value={isPrivate} onChange={(event) => setIsPrivate(event.target.checked)}/>} label="Private"/>
                </FormGroup>
                {
                    isPrivate ? (
                        <Box sx={{p: "2px 4px", display: "flex", alignItems: "center"}} >
                            <TextField label={"Group Name"}/>
                            <IconButton>
                                <SearchIcon/>
                            </IconButton>

                        </Box>
                    ) : (
                        <TextField label={"User Name"}/>
                    )
                }

                <Button variant="contained">Add</Button>
                </Stack>


            </Box>

        </Modal>

    )

}

export default ChatListAdd;