import { graphql } from "../gql";
import { useMutation } from "@apollo/client";


const createViewMessageDocument = graphql(`
    mutation viewMessage($messageId: String, $chatId: String!) {
        viewMessage(messageId: $messageId, chatId: $chatId)
    }
`);


const useViewMessage = () => {
    return useMutation(createViewMessageDocument);
};

export { useViewMessage };


/*

const createMessageDocument:TypedDocumentNode<CreateMessageMutation, CreateMessageMutationVariables> = graphql(//call back
        `mutation createMessage($createMessageInput: CreateMessageInput!) {
        createMessage(createMessageInput: $createMessageInput) {
            _id
            content
            createdAt
            userPseudo
            userId
        }}`)
*/