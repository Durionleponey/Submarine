import {graphql} from "../gql";
import {useMutation} from "@apollo/client";




const createMessageDocument = graphql(
    `mutation createMessage($createMessageInput: CreateMessageInput!) {
        createMessage(createMessageInput: $createMessageInput) {
            _id
            content
            createdAt
        }}`)


const useCreateMessage = () => {
    return useMutation(createMessageDocument);
}

export {useCreateMessage};