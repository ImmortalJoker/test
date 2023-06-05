import { Avatar, Button } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { deepPurple } from "@mui/material/colors";
import Login from ".";
import { useState } from "react";

const LoginButton: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  
  const { user, initials, login, logout } = useAuth();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (value: string | undefined): void => {
    if (value) {
      login(value);
    }
  };

  return (
    user
      ? <div onClick={logout}>
        <Avatar alt={user} sx={{ bgcolor: deepPurple[500] }}>{initials}</Avatar>
      </div>
      : (
        <>
          <Button color="secondary" variant="outlined" onClick={handleClick}>Log In</Button>
          <Login open={open} onClose={handleClose} />
        </>
      )
  )
};

export default LoginButton;
