import {useState} from "react";
import {API_URL} from "../constants/urls";
import client from "../constants/apollo-client";
import {SnackInterface, snackVar} from "../constants/snack";
import {useReactiveVar} from "@apollo/client";
import {authenticateVar} from "../constants/authenticated";
import router from "../components/Routes";
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
        setError(false)
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

        await client.refetchQueries({include: 'active'});//emplty the cache

        setError(false)
        snackVar(succesLogin)
        authenticateVar(true)
        router.navigate("/")


    };


    return {login, error}
};


export default useLogin;