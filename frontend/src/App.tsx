
import './style.css'
import { useState } from 'react';
import Auth from "./components/auth/Auth";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import router from "./components/Routes";
import {ApolloClient, ApolloProvider} from "@apollo/client";
import client from "./constants/apollo-client";

const darkTheme = createTheme({
    palette:{
        mode : "dark"
    }

})

const App = () => {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={darkTheme}>
                <Container>
                    <CssBaseline>
                        <RouterProvider router={router}/>
                    </CssBaseline>
                </Container>
            </ThemeProvider>
        </ApolloProvider>
)
};

export default App;

