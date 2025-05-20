import { graphql } from "../gql";
import {
    GetMessagesQuery,
    GetMessagesQueryVariables,
} from "../gql/graphql";
import { useQuery } from "@apollo/client";

export const getMessagesDocument = graphql(`
    query getMessages($chatId: String!) {
        getMessages(chatId: $chatId) {
            _id
            content
            createdAt
            userPseudo
            userId
            radius
        }
    }
`);

const useGetMessages = (
    chatId: string,
    skip = false
) => {
    return useQuery<GetMessagesQuery, GetMessagesQueryVariables>(
        getMessagesDocument,
        {
            variables: { chatId },
            skip,                           // if true will not execute
            fetchPolicy: "network-only",
            errorPolicy:"all",
            nextFetchPolicy: "cache-first",
        }
    );
};

export { useGetMessages };
