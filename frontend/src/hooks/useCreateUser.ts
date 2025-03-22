import {gql, useMutation} from "@apollo/client";
import {User} from "../model/User";

//this hook is for graphQL


interface CreateUserInput {
    createUserInput: {
        email: string;
        password: string;
    }
}

const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
    }
  }
`;


//const CREATE_USER = gql("mutation CreateUser($input: CreateUserInput!) { createUser(input: $input) { _id email } }");




const useCreateUser = () => {

    return useMutation<User, CreateUserInput>(CREATE_USER)
}

export {useCreateUser};