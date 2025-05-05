import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface AlertDialogInterface {
    AlertMessage: string;
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    title:string;

}

export default function AlertDialog({ AlertMessage,open,setOpen,title }: AlertDialogInterface) {
    //const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {AlertMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  variant="contained" color="info" onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose} variant="contained" color="error" autoFocus>
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}