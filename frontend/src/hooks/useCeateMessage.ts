import {graphql} from "../gql";
import {useMutation} from "@apollo/client";




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


const useCreateMessage = () => {
    // @ts-ignore
    return useMutation(createMessageDocument, {
        update(cache, { data }){
            cache.modify({
                fields: {
                    getMessages(existringMessage=[]) {//default value

                        const newMessageRef = cache.writeFragment({
                            data: data?.createMessage,
                            fragment: MessageFragment
                        })
                        return [...existringMessage, newMessageRef];
                    }
                }
            })
        },
    });
}
export {useCreateMessage};