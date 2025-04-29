import {useState} from "react";
import {API_URL} from "../constants/urls";
import client from "../constants/apollo-client";
import {SnackInterface, snackVar} from "../constants/snack";
import {useReactiveVar} from "@apollo/client";
import {authenticateVar} from "../constants/authenticated";
//this hoock is not for graphQL


interface LoginRequest {

        email: string;
        password: string;
}

const succesLogin:SnackInterface = {

    text:"Login in successfully!",
    type:"success",

}

const useLogin = () => {
    const [error, setError] = useState<boolean>();

    const login = async (request:LoginRequest) => {
        const response = await fetch(
            `${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                 body: JSON.stringify(request),
            })
        if (!response.ok) {
            setError(true);
            return;
        }
        setError(false)
        snackVar(succesLogin)
        authenticateVar(true)

        await client.refetchQueries({include: 'active'});//emplty the cache

    };


    return {login, error}
};


export default useLogin;