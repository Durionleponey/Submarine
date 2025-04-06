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





const useCreateChat = () =>{


    return useMutation(createChatDocument);
}


export {useCreateChat};