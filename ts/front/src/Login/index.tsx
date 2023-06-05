import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useRef } from "react";

interface LoginProps {
  open: boolean;
  onClose: (value: string | undefined) => void;
}

const Login: React.FC<LoginProps> = ({ open, onClose }) => {
  const inputRef = useRef<HTMLInputElement>();

  const handleClose = () => {
    onClose(inputRef.current?.value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Enter user name:</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={inputRef}
          autoFocus
          margin="dense"
          id="name"
          label="User"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>LogIn</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
