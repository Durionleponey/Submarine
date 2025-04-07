import {gql, useMutation, useQuery} from "@apollo/client";
import {User} from "../model/User";




const GET_CHAT = gql`
    query Chats{
        chatss {
            _id
            userId
            isPrivate
            userIds
            name
        }
    }
`;


const useGetChat = () => {
    return useQuery(GET_CHAT);
}



export { useGetChat };
