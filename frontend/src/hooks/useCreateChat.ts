import {graphql} from "../gql";
import {useMutation} from "@apollo/client";
import {CreateChatInput, CreateChatMutation} from "../gql/graphql";
import {TypedDocumentNode} from "@graphql-typed-document-node/core";



const createChatDocument = graphql(`
    mutation CreateChat($createChatInput: CreateChatInput!) {
        createChat(createChatInput: $createChatInput) {
            _id
            userId
            isPrivate
            userIds
            name
        }
    }
`);

export const ChatFragment = graphql(`
    fragment ChatFragment on Chat {
        _id
        userId
        isPrivate
        userIds
        name
    }
`);




//i for update the cache so when we create a new chat it will be add directly in the ui but it is a mess i know

const useCreateChat = () =>{


    return useMutation(createChatDocument,{
        update(cache, { data }){
            cache.modify({
                fields: {
                    chatss(existingChats=[]) {
                        const newChatRef = cache.writeFragment({
                            data: data?.createChat,
                            fragment: ChatFragment
                        })
                        return [...existingChats, newChatRef];
                    }
                }
            })
        },
    });
}


export {useCreateChat};