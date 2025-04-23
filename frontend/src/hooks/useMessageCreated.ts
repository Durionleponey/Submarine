import {graphql} from "../gql";
import {useMutation, useSubscription} from "@apollo/client";
import {SubscriptionMessageCreatedArgs} from "../gql/graphql";

const messageCreatedDocument = graphql(`
    subscription messageCreated($chatId: String!){
        messageCreated(chatId:$chatId){
            ...MessageFragment
        }
    }
`)

export const useMessageCreated = (variables:SubscriptionMessageCreatedArgs) => {
    return useSubscription(messageCreatedDocument, {variables});
}