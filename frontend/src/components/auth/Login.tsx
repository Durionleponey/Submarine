import Auth from "./Auth";
import { Link } from "react-router-dom";
import {Link as MUIlink} from "@mui/material"
import useLogin from "../../hooks/useLogin";


const Login = () => {
    const { login, error } = useLogin()
    return (
        <Auth submitLabel="Login" submitColor={"secondary"} onSubmit={(request) => login(request)}>
            <Link to="/signup" style={{alignSelf:"center"}}>
                <MUIlink >
                    Signup
                </MUIlink>
            </Link>
        </Auth>
    );
};

export default Login;
