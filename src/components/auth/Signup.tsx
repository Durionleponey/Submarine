import Auth from "./Auth";
import {Link} from "react-router-dom";
import {Link as MUIlink} from "@mui/material"


const Signup = () => {
    return (<Auth submitLabel={"Signup"} submitColor={"primary"} onSubmit={async () => {}}>
        <Link to={'/login'} style={{ alignSelf:"center" }}>
            <MUIlink>Login</MUIlink>
        </Link>
    </Auth>);
}

export default Signup;