import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/app/ui/alert";
import { logout } from "@/redux/authSlice/authSlice";
import { useAppDispatch } from "@/redux/store/store";
import { Dialog } from "@mui/material";

interface LogoutDialogProps {
    open: boolean;
    onClose: () => void;
    onLogout: () => void;
  }
  
  const LogoutDialog: React.FC<LogoutDialogProps> = ({
    open,
    onClose,
  }) => {
    const dispatch=useAppDispatch()
    const handleLogout = () => {
        dispatch(logout());
        onClose();
      };
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
       <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
            <AlertDialogDescription>
              You will need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Sign Out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </Dialog>
    );
  };
  export {LogoutDialog};
  