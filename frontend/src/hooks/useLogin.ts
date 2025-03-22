import {useState} from "react";
import {API_URL} from "../constants/urls";
import client from "../constants/apollo-client";
//this hoock is not for graphQL


interface LoginRequest {

        email: string;
        password: string;
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
        await client.refetchQueries({include: 'active'});

    };

    return {login, error}
};


export default useLogin;