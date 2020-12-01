import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DeleteLead(props) {
  const deleteLead = () => {
    console.log(props.leadId);
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
        <DialogTitle id="alert-dialog-title">
          {"Do you wish to delete this lead?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={deleteLead} color="secondary" variant="contained">
            Delete
          </Button>
          <Button
            onClick={props.closeDelete}
            color="primary"
            autoFocus
            variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
