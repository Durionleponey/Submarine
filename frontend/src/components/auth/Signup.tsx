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
                await createUser({

                    variables:{
                        createUserInput: {
                            email,
                            password
                        }
                    },

                })


                //console.log("Signup clicked", variables);


            }}

        >
            <MUIlink component={Link} to="/login" style={{ alignSelf: "center" }}>
                Login
            </MUIlink>
        </Auth>
    );
};

export default Signup;