import Auth from "./Auth";
import { Link } from "react-router-dom";
import { Link as MUIlink } from "@mui/material";
import { useCreateUser } from "../../hooks/useCreateUser";
import {useState} from "react";
import {authenticateVar} from "../../constants/authenticated";


const Signup = () => {
    const [createUser] = useCreateUser();
    const [isError, setIsError] = useState<undefined | string>();
    const [isSucces, setIsSucces] = useState<undefined | boolean>();


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
                    setIsSucces(true);


                }catch (error) {
                    //alert("Password not strong anought or email already use!")
                    setIsError("The email is already in use or the password is not strong enough. It must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
                    setIsSucces(false);
                }

                //console.log("Signup clicked", variables);
            }}
            error={isError}
            success={isSucces}


        >
            <MUIlink component={Link} to="/login" style={{ alignSelf: "center" }}>
                Login
            </MUIlink>

        </Auth>
    );
};

export default Signup;