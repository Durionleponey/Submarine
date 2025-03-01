import {Button, Stack, TextField} from "@mui/material";
import LogoBig from "../brand/logoBig"
import React, {useState} from "react";

interface AuthProps {
    submitLabel: string
    submitColor: "primary" | "secondary"
    onSubmit: (credentials: { email:string; password: string;}) => Promise<void>;
    children: React.ReactNode;
}


const Auth = ({submitLabel, submitColor, onSubmit, children}:AuthProps) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <Stack spacing={5} sx={
            { height: "100vh", maxWidth: {xs: '70%', md: '30%'}, margin: "0 auto", justifyContent: "center"}}>
            <LogoBig/>
            <TextField type="mail" label="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
            <TextField type="password" label="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
            <Button variant="outlined" color={submitColor} onClick={() => onSubmit({email, password})}>{submitLabel}</Button>
            { children }
        </Stack>
    )


}
export default Auth;
