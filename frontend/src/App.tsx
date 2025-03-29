
import './style.css'
import React, { useState } from 'react';
import Auth from "./components/auth/Auth";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import router from "./components/Routes";
import {ApolloClient, ApolloProvider} from "@apollo/client";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import StolenHeader from "./components/header/Header";
import Toolbar from "@mui/material/Toolbar";

const darkTheme = createTheme({
    palette:{
        mode : "dark"
    }

})

const App = () => {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={darkTheme}>
                <StolenHeader/>
                <Container>
                    <CssBaseline>
                        <Guard>
                            <RouterProvider router={router}/>
                        </Guard>
                    </CssBaseline>
                </Container>
            </ThemeProvider>
        </ApolloProvider>
)
};

export default App;

