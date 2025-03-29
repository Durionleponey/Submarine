import {makeVar} from "@apollo/client";
import {AlertColor} from "@mui/material";



export interface SnackInterface {
    text: string;
    type: AlertColor;

}

export const snackVar = makeVar<SnackInterface | undefined>(undefined);

