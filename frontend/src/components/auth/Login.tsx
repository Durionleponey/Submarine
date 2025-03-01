import Auth from "./Auth";
import { Link } from "react-router-dom";
import {Link as MUIlink} from "@mui/material"


const Login = () => {
    return (
        <Auth submitLabel="Login" submitColor={"secondary"} onSubmit={async () => {}}>
            <Link to="/signup" style={{alignSelf:"center"}}>
                <MUIlink >
                    Signup
                </MUIlink>
            </Link>
        </Auth>
    );
};

export default Login;
