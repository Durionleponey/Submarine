import Auth from "./Auth";
import { Link } from "react-router-dom";
import {Link as MUIlink} from "@mui/material"
import useLogin from "../../hooks/useLogin";
import {useContext, useEffect, useState} from "react";
import {LoadingChat} from "../chat/chat-header/LoadingChat";
import {useReactiveVar} from "@apollo/client";
import {authenticateVar} from "../../constants/authenticated";


const Login = () => {
    const { login, error, } = useLogin()
    const [loading, setLoading] = useState(false);
    console.log(login)
    console.log(error)
    const authenticated = useReactiveVar(authenticateVar);


    useEffect(() => {
    setLoading(false);

    }, [authenticated]);


    useEffect(() => {

        if (error){setLoading(false);
        }
    }, [error]);


    if (loading) {
        return (<LoadingChat/>);
    }

    if (authenticated){return <h1></h1>}



    return (
        <Auth submitLabel="Login" submitColor={"secondary"} onSubmit={async (request) => {
            setLoading(true);
            await login(request);
        }}
              error={
            error ? "Credential are wrong! try 'Azerty123!' if you are loking for the password" : ""}>
            <Link to="/signup" style={{alignSelf:"center"}}>
                <MUIlink>
                    Signup
                </MUIlink>
            </Link>
        </Auth>
    );
};

export default Login;
