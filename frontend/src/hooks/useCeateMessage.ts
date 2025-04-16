import {graphql} from "../gql";
import {useMutation} from "@apollo/client";
import {getMessagesDocument} from "./useGetMessages";




const createMessageDocument = graphql(
    `mutation createMessage($createMessageInput: CreateMessageInput!) {
        createMessage(createMessageInput: $createMessageInput) {
            _id
            content
            createdAt
        }}`)


export const MessageFragment = graphql(`
    fragment MessageFragment on Message {
        _id
        content
        createdAt
    }
`);

/*

const useCreateMessage = () => {
    return useMutation(createMessageDocument);
}
*/

const useCreateMessage = (chatId: string) => {
    return useMutation(createMessageDocument, {
        update(cache, { data }) {//update is play if the mutation worked
            const newMessage = data?.createMessage;//call back from graphql data.createMessage.content ect
            if (!newMessage) return;

            try {
                const existingMessages = cache.readQuery({
                    query: getMessagesDocument,
                    variables: { chatId }
                });

                if (!existingMessages?.getMessages) return;

                cache.writeQuery({
                    query: getMessagesDocument,
                    variables: { chatId },
                    data: {
                        getMessages: [...existingMessages.getMessages, newMessage]//merge the new and the old messages
                    }
                });
            } catch (e) {
                console.warn("No existing messages found in cache", e);
            }
        },
    });
}

export {useCreateMessage};