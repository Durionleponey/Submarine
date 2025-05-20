import {graphql} from "../gql";
import {useMutation, useSubscription} from "@apollo/client";
import {SubscriptionMessageCreatedArgs} from "../gql/graphql";

const chatCreatedDocument = graphql(`
    subscription chatCreated {
        chatCreated {
            _id
            name
            isPrivate
            userIds
            userId
        }
    }
`)


export const useChatCreated = () => {
    // @ts-ignore
    return useSubscription(chatCreatedDocument);
}