import {graphql} from "../gql";
import {ChatFragment} from "./useCreateChat";
import {useMutation, useQuery} from "@apollo/client";
import {ChatsQueryVariables} from "../gql/graphql";




const getSingleChat = graphql(`
    query Chat($_id: String!) {
        chat(_id: $_id) {
            _id
            userId
            isPrivate
            userIds
            name
            
        }
    }
`)



const useGetSingleChat = (variables: { _id: string }) =>{
    // @ts-ignore
    return useQuery(getSingleChat, {variables,errorPolicy:"all"})
}

export {useGetSingleChat};