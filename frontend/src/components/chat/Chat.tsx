import {useParams} from "react-router-dom";
import {useGetSingleChat} from "../../hooks/useGetSingleChat";

const Chat = () => {
    const params = useParams();
    const { data } = useGetSingleChat({_id: params._id!})

    return (
        <h1>{data?.chat.name}</h1>
    )
}

export default Chat