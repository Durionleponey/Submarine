import { graphql } from "../gql";
import {useLazyQuery, useQuery} from "@apollo/client";

const QueryGetMessageViewers = graphql(`
    query getMessageViewers($messageId: String!, $chatId: String!) {
        getMessageViewers(messageId: $messageId, chatId: $chatId)
    }
`);

const useGetMessageViewers = () => {
    return useLazyQuery(QueryGetMessageViewers, {
        fetchPolicy: 'network-only'
    });
}

export { useGetMessageViewers };