import {gql, useMutation, useQuery} from "@apollo/client";
import {User} from "../model/User";



/*interface GetMe {
    GetMeInput: {
        _id: string;
        email: string;
    }
}*/




    const GET_ME = gql`
  query {
    me {
      _id
      email
    }
  }
`;


//const CREATE_USER = gql("mutation CreateUser($input: CreateUserInput!) { createUser(input: $input) { _id email } }");



const useGetMe = () => {
    return useQuery<{ me: User }>(GET_ME, {
        errorPolicy: "all", // 👈 évite le "Uncaught ApolloError"
    });
}



export { useGetMe };
