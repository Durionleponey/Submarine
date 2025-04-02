
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";



interface ChatListAddInterface {
    open: boolean;
    handleClose: () => void;
}

const ChatListAdd = ({open, handleClose}:ChatListAddInterface) => {


    return(
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: "absolute" as "absolute",
                top:"50%",
                left:"50%",
                transform:"translate(-50%, -50%)",
                width:400,
                bgcolor: "background.paper",
                border:"3px",
                p:4,
            }}>

                <Typography variant="h5" component="h2">Add Chat</Typography>


            </Box>

        </Modal>
    )

}

export default ChatListAdd;