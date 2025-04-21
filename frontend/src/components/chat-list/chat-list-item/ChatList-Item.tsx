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
                '&.Mui-selected': {
                    backgroundColor: 'rgba(244,189,48,0.37)',
                    color: 'white',
                },
                '&.Mui-selected:hover': {
                    backgroundColor: 'rgba(244,189,48,0.2)',
                },
            }}>

            <ListItemAvatar>
                <Avatar alt={""} src="" />
            </ListItemAvatar>
            <ListItemText
                primary={chat.name}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: 'text.primary', display: 'inline' }}
                        >
                            <p>
                                creator :{chat.userId}

                            </p>
                            <p>
                                guests :{chat.userIds}

                            </p>

                        </Typography>

                    </React.Fragment>
                }
            />

            </ListItemButton>

        </ListItem>

            <Divider variant="inset" component="li" />
        </>
    )


}



export default ChatListItem;


