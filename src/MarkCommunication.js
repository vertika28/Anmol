import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import { createMuiTheme } from "@material-ui/core/";
import IconButton from "@material-ui/core/IconButton";

export default function MarkCommunication(props) {
  const theme = createMuiTheme();
  const saveCom = () => {
    const dataObj = { communication: props.comMsg };
    fetch(`${process.env.REACT_APP_API_URL}/api/mark_lead/${props.leadId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    })
      .then((response) => {
        if (response.status === 202) {
          props.closeCom();
          props.fetchLeads();
        } else {
          props.closeCom();
          alert("Error occurred");
        }
      })
      .catch((error) => {
        props.closeCom();
        alert("Error", error.message);
      });
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.closeCom}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Mark Communication"}
          <IconButton
            edge="start"
            color="inherit"
            style={{
              position: "absolute",
              right: theme.spacing(1),
              top: theme.spacing(1),
              color: theme.palette.grey[500],
            }}
            onClick={props.closeCom}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Communication</DialogContentText>
          <TextareaAutosize
            aria-label="empty textarea"
            rowsMin={10}
            style={{ width: "100%" }}
            onChange={props.getComMsg}
            value={props.comMsg ? props.comMsg : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.closeCom}
            color="secondary"
            variant="contained"
          >
            Close
          </Button>
          <Button
            onClick={saveCom}
            color="primary"
            variant="contained"
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
