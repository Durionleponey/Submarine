import {graphql} from "../gql";
import {SubscriptionMessageCreatedArgs} from "../gql/graphql";
import {useMutation} from "@apollo/client";
import {TypedDocumentNode} from "@graphql-typed-document-node/core";

type LeaveAllChatResult = {
    leaveAllChat: number;
};

type LeaveAllChatVariables = Record<string, never>;

const leaveAllChat = graphql(`
    mutation LeaveAllChat {
        leaveAllChat
    }
`) as TypedDocumentNode<LeaveAllChatResult, LeaveAllChatVariables>;

export const useLeaveAllChat = () => {
    return useMutation(leaveAllChat);
};
