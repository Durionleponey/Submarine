import {graphql} from "../gql";
import {GetMessagesQueryVariables} from "../gql/graphql";
import {useQuery} from "@apollo/client";

const getMessagesDocument = graphql(`
    query getMessages ($chatId: String!) {
        getMessages(chatId: $chatId) {
            _id
            content
            createdAt
        }
    }
`)

const useGetMessages = (variables: GetMessagesQueryVariables) => {
    return useQuery(getMessagesDocument, {variables})
}

export {useGetMessages};