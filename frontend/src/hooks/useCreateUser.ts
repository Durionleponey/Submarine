import {gql, useMutation} from "@apollo/client";
//import {User} from "../model/User";
import {graphql} from "../gql";


//this hook is for graphQL


/*interface CreateUserInput {
    createUserInput: {
        email: string;
        password: string;
    }
}*/

const CREATE_USER = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
    }
  }
`);


//const CREATE_USER = gql("mutation CreateUser($input: CreateUserInput!) { createUser(input: $input) { _id email } }");




/*const useCreateUser = () => {

    return useMutation<User, CreateUserInput>(CREATE_USER)
}

export {useCreateUser};*/

const useCreateUser = () => {

    return useMutation(CREATE_USER)
}

export {useCreateUser};