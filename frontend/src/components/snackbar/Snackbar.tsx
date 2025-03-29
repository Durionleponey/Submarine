import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useReactiveVar} from "@apollo/client";
import {snackVar} from "../../constants/snack";

const Snackbarr= () => {
    const snack = useReactiveVar(snackVar)


    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        snackVar(undefined);
    };

    return (
        <>
            {//!! force to return a bool
                snack && (
                    <Snackbar open={!!snack} autoHideDuration={6000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity={snack?.type}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {snack?.text}
                        </Alert>
                    </Snackbar>

                )
            }
        </>

    );
}


export default Snackbarr;