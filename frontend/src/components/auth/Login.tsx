import Auth from "./Auth";
import { Link } from "react-router-dom";
import {Link as MUIlink} from "@mui/material"
import useLogin from "../../hooks/useLogin";


const Login = () => {
    const { login, error, } = useLogin()
    console.log(login)
    console.log(error)
    return (
        <Auth submitLabel="Login" submitColor={"secondary"} onSubmit={(request) => login(request)} error={
            error ? "Credential are wrong! try 'Azerty123!' if you are loking for the password" : ""}>
            <Link to="/signup" style={{alignSelf:"center"}}>
                <MUIlink >
                    Signup
                </MUIlink>
            </Link>
        </Auth>
    );
};

export default Login;
