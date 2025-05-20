import { graphql } from "../gql";
import {TypedDocumentNode, useLazyQuery, useQuery} from "@apollo/client";
import {QueryUsersArgs} from "../gql/graphql";

const users = graphql(`
    query users($search: String!) {
        users(search: $search){
            pseudo
            email
        }
    }
`);

const useGetUsers = () => {
    return useLazyQuery(users, {
        fetchPolicy: 'network-only'
    });
}

export { useGetUsers };