import Auth from "./Auth";
import { Link } from "react-router-dom";
import { Link as MUIlink } from "@mui/material";
import { useCreateUser } from "../../hooks/useCreateUser";

const Signup = () => {
    const [createUser] = useCreateUser();

    return (
        <Auth
            submitLabel={"Signup"}
            submitColor={"primary"}
            onSubmit={async ({ email, password }) => {
                const variables = {
                    createUserInput: {
                        email,
                        password
                    }
                };

            }}
        >
            <Link to={"/login"} style={{ alignSelf: "center" }}>
                <MUIlink>Login</MUIlink>
            </Link>
        </Auth>
    );
};

export default Signup;
