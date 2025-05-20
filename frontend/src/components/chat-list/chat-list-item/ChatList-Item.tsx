import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {ListItemButton} from "@mui/material";
import router from "../../Routes";
import {Chat} from "../../../gql/graphql";


interface ChatListItemProps {
    chat: Chat;
    selected: boolean;

}


const ChatListItem  = ({chat, selected}:ChatListItemProps) => {


    return (
        <>
        <ListItem alignItems="flex-start" disablePadding={true}>
            <ListItemButton onClick={()=> router.navigate(`/chats/${chat._id}`)} selected={selected}   sx={{
                borderRadius: "12px",
                "&.Mui-selected": {
                    backgroundColor: "rgba(244,189,48,0.37)",
                    color: "#fff",
                },
                "&.Mui-selected:hover": {
                    backgroundColor: "rgba(244,189,48,0.2)",
                },
                "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                },
            }}>

            <ListItemAvatar>
                <Avatar alt={""} src="" />
            </ListItemAvatar>
            <ListItemText
                primary={chat.name}
/*                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            sx={{color: 'text.primary', display: 'inline', userSelect: 'text',}}
                        >
                            <p>
                                chatId :{chat._id}

                            </p>
                            <p>
                                creator :{chat.userId}

                            </p>
                            <p>guests :</p>
                            <ul style={{margin: 0, paddingLeft: "1rem"}}>
                                {chat.userIds.map((id) => (
                                    <li key={id} style={{listStyleType: "circle"}}>{id}</li>
                                ))}
                            </ul>


                        </Typography>

                    </React.Fragment>
                }*/
            />

            </ListItemButton>

        </ListItem>

        </>
    )


}



export default ChatListItem;


