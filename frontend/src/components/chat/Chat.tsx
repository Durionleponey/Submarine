import {useParams} from "react-router-dom";
import {useGetSingleChat} from "../../hooks/useGetSingleChat";
import {InputBase, Paper, Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const Chat = () => {
    const params = useParams();
    const { data } = useGetSingleChat({_id: params._id!})

    return (
        <Stack sx={{ height: "100%", justifyContent: "space-between" }}>

            <h1>{data?.chat.name}</h1>
            <Paper sx={{
                p: "16px 64px",
                display:"flex",
                align: "center",
                width:"100%",
                justifySelf: "flex-end",
            }}>
                <InputBase placeholder="Message" sx={{ml: 1, flex:1, width:"100%"}}/>
                <Divider orientation="vertical" sx={{height:28, m:1}}/>
                <IconButton color="secondary">
                    <ArrowCircleUpIcon/>
                </IconButton>
            </Paper>


        </Stack>)
}

export default Chat