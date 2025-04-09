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
        <Stack sx={{ height: "100%", justifyContent: "space-between",}}>

            <h1>{data?.chat.name}</h1>
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

                <IconButton color="secondary">
                    <ArrowCircleUpIcon sx={{ fontSize: 30 }} />
                </IconButton>
            </Paper>



        </Stack>)
}

export default Chat