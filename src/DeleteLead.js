import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./DeleteLead.css";
import CloseIcon from "@material-ui/icons/Close";
import { createMuiTheme } from "@material-ui/core/";
import IconButton from "@material-ui/core/IconButton";

export default function DeleteLead(props) {
  const theme = createMuiTheme();
  const deleteLead = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/leads/${props.leadId}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          props.closeDelete();
          props.fetchLeads();
        } else {
          props.closeDelete();
          alert("Error occurred");
        }
      })
      .catch((error) => {
        props.closeDelete();
        alert("Error", error.message);
      });
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.closeDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ width: "70%" }}>
          {"Do you wish to delete this lead?"}
          <IconButton
            edge="start"
            color="inherit"
            style={{
              position: "absolute",
              right: theme.spacing(0.1),
              top: theme.spacing(1),
              color: theme.palette.grey[500],
            }}
            onClick={props.closeDelete}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={deleteLead}
            variant="contained"
            className="delete_lead_form"
          >
            Delete
          </Button>
          <Button
            onClick={props.closeDelete}
            color="primary"
            autoFocus
            variant="contained"
            className="cancel_lead_form"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
