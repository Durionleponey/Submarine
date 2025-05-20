import "./style.css";
import React, {useEffect} from "react";
import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import Snackbar from "@mui/material/Snackbar";

import client from "./constants/apollo-client";
import router from "./components/Routes";
import { authenticateVar } from "./constants/authenticated";
import Guard from "./components/auth/Guard";
import StolenHeader from "./components/header/Header";
import ChatList from "./components/chat-list/Chatlist";
import Snackbarr from "./components/snackbar/Snackbar";

const darkTheme = createTheme({
  palette: { mode: "dark" },
});

const App = () => {
  const authenticated = useReactiveVar(authenticateVar);
  useEffect(() => {
    document.title = "Submarine";
  }, []);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <StolenHeader />

        <Grid container spacing={2}  wrap="nowrap">
          {authenticated && (
            <Grid>
              <ChatList />
            </Grid>
          )}
          <Container disableGutters maxWidth={false} sx={{ px: 0, width: "80%" }}>
            <Guard>
              <RouterProvider router={router} />
            </Guard>
          </Container>
        </Grid>
        <Snackbarr />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
