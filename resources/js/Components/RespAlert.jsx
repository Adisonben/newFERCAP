import React from 'react';
import { Snackbar, Alert } from "@mui/material";

const RespAlert = ({
    showAlert = false,
    resp,
    handleCloseAlert
}) => {
  return (
    <Snackbar
        key={resp?.timestamp}
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
        <Alert
            severity={resp?.success ? "success" : "error"}
            variant="filled"
            onClose={handleCloseAlert}
        >
            {resp?.success ? resp?.success : resp?.error}
        </Alert>
    </Snackbar>
  )
}

export default RespAlert
