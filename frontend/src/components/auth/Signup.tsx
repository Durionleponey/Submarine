import Auth from "./Auth";
import { Link } from "react-router-dom";
import { Link as MUIlink } from "@mui/material";
import { useCreateUser } from "../../hooks/useCreateUser";
import {useState} from "react";


const Signup = () => {
    const [createUser] = useCreateUser();
    const [isError, setIsError] = useState<undefined | string>();


    return (
        <Auth
            submitLabel={"Signup"}
            submitColor={"primary"}
            onSubmit={async ({ email, password }) => {

                try {
                    setIsError("");
                    await createUser({

                        variables:{
                            createUserInput: {
                                email,
                                password
                            }
                        },

                    })
                }catch (error) {
                    //alert("Password not strong anought or email already use!")
                    setIsError("Password not strong anought or email already use!")
                }

                //console.log("Signup clicked", variables);
            }}
            error={isError}

        >
            <MUIlink component={Link} to="/login" style={{ alignSelf: "center" }}>
                Login
            </MUIlink>
        </Auth>
    );
};

export default Signup;