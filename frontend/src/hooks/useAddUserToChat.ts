import { graphql } from "../gql";
import { useMutation } from "@apollo/client";

// La mutation corrigée
const ADD_USER = graphql(`
    mutation addUserToChat($email: String!, $chatId: String!) {
        addUserToChat(email: $email, chatId: $chatId)
    }
`);

const useAddUserToChat = () => {
    return useMutation(ADD_USER);
}

export { useAddUserToChat };
