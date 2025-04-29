import {Button, Stack, TextField, Typography} from "@mui/material";
import LogoBig from "../brand/logoBig"
import React, {useEffect, useState} from "react";
import {useGetMe} from "../../hooks/useGetMe";
import {useNavigate} from "react-router-dom";

interface AuthProps {
    submitLabel: string
    submitColor: "primary" | "secondary"
    onSubmit: (credentials: { email:string; password: string;}) => Promise<void>;
    children: React.ReactNode;
    error?: string;
    success?: boolean;
}


const Auth = ({submitLabel, submitColor, onSubmit, children, error, success}:AuthProps) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {data} = useGetMe();
    const navigate = useNavigate();


    useEffect(() =>{
        if (data) {
            navigate("/");
        }
    }, [data,navigate]);//i have to put navigate in the array because is good practice

    return(
        <Stack spacing={5} sx={
            { height: "100vh", maxWidth: {xs: '70%', md: '30%'}, margin: "0 auto", justifyContent: "center"}}>
            <LogoBig/>
            {!success &&<><TextField type="mail" label="Email" value={email} error={!!error} helperText={error} onChange={(event) => setEmail(event.target.value)}/>
            <TextField type="password" label="Password" value={password} error={!!error} helperText={error} onChange={(event) => setPassword(event.target.value)}/>
            <Button variant="outlined"  color={submitColor} onClick={() => onSubmit({email, password})}>{submitLabel}</Button></>}
            <>{success && <>  <Typography
                variant="h6"
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
            >
                You are successfully signup 💖🤿!
            </Typography></>}</>
            { children }
        </Stack>
    )


}
export default Auth;
