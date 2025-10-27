import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


const DialogCourier = ({ is_dialog, title, cancel, ok }) => (
  <Dialog className="dialog"
          open={is_dialog}
          onClose={cancel}
          disableBackdropClick
          disableEscapeKeyDown
          aria-labelledby="confirmation-dialog-title"
          fullWidth
  >
    <DialogContent>{title}</DialogContent>
    <DialogActions>
      <Button onClick={cancel} color="primary">Нет</Button>
      <Button onClick={ok} variant="contained" color="primary">Да</Button>
    </DialogActions>
  </Dialog>
)

export default DialogCourier;
