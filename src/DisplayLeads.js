import React, { useEffect, useState, useCallback } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddLeadModal from "./AddLeadModal";
import DeleteLeadModal from "./DeleteLead";
import MarkCommunication from "./MarkCommunication";
import "./DisplayLeads.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
function DisplayLeads() {
  const classes = useStyles();
  const [leadsInfo, setLeadsInfo] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCom, setOpenCom] = useState(false);
  const [id, setLeadId] = useState(null);
  const [comMsg, setComMsg] = useState("");
  const url = `${process.env.REACT_APP_API_URL}/api/leads/?location_string=India`;

  const handleOpen = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const openDeleteModal = (id) => {
    setOpenDelete(true);
    setLeadId(id);
  };

  const openComModal = (identity, msg) => {
    setOpenCom(true);
    setLeadId(identity);
    setComMsg(msg);
  };

  const closeDeleteModal = () => {
    setOpenDelete(false);
  };

  const closeCom = () => {
    setOpenCom(false);
  };

  const fetchLeads = useCallback(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const infos = data.map((info) => ({
          id: info.id,
          name: info.first_name + " " + info.last_name,
          email: info.email,
          mobilenum: info.mobile,
          locationType: info.location_type,
          locationString: info.location_string,
          communication: info.communication,
        }));
        setLeadsInfo(infos);
      });
  }, [url]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchLeads();
    }
    return () => (mounted = false);
  }, [fetchLeads]);

  const getComMsg = (event) => {
    setComMsg(event.target.value);
  };

  return (
    <div>
      <button className="add_lead_modal_btn" onClick={handleOpen}>
        Add Lead
      </button>
      <TableContainer component={Paper} className="leads_table">
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Mobile Num</StyledTableCell>
              <StyledTableCell>Location Type</StyledTableCell>
              <StyledTableCell>Location String</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leadsInfo.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="left">{row.mobilenum}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.locationType}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.locationString}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <button
                    className="update_lead_modal_btn"
                    variant="contained"
                    onClick={() => openComModal(row.id, row.communication)}
                  >
                    Mark Update
                  </button>
                  <button
                    className="delete_lead_modal_btn"
                    variant="contained"
                    onClick={() => openDeleteModal(row.id)}
                  >
                    Delete
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddLeadModal
        open={open}
        closeModal={closeModal}
        fetchLeads={fetchLeads}
      />
      <DeleteLeadModal
        open={openDelete}
        closeDelete={closeDeleteModal}
        leadId={id}
        fetchLeads={fetchLeads}
      />

      <MarkCommunication
        open={openCom}
        closeCom={closeCom}
        leadId={id}
        fetchLeads={fetchLeads}
        comMsg={comMsg}
        getComMsg={getComMsg}
      />
    </div>
  );
}

export default DisplayLeads;
