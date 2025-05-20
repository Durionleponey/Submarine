import {graphql} from "../gql";
import {useMutation, useSubscription} from "@apollo/client";
import {SubscriptionMessageCreatedArgs} from "../gql/graphql";

const chatCreatedDocument = graphql(`
    subscription chatCreated{
        chatCreated
    }
`)

export const useChatCreated = () => {
    // @ts-ignore
    return useSubscription(chatCreatedDocument);
}