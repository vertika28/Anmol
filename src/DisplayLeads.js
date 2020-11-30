import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddLeadModal from './AddLeadModal';
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
        '&:nth-of-type(odd)': {
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
    const [open, setOpen] = React.useState(false);
    const url = 'http://54.209.73.0:4000/api/leads/?location_string=India';
    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        let mounted = true;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const infos = data.map((info) => ({
                    name: info.first_name + ' ' + info.last_name,
                    email: info.email,
                    mobilenum: info.mobile,
                    locationType: info.location_type,
                    locationString: info.location_string
                }));
                if (mounted) {
                    setLeadsInfo(infos);
                }
            });
        return () => mounted = false;
    }, []);
    return (
        <div>
            <button className='add_lead_modal_btn' onClick={handleOpen}>Add Lead</button>
            <TableContainer component={Paper}>
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
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.email}</StyledTableCell>
                                <StyledTableCell align="left">{row.mobilenum}</StyledTableCell>
                                <StyledTableCell align="left">{row.locationType}</StyledTableCell>
                                <StyledTableCell align="left">{row.locationString}</StyledTableCell>
                                <StyledTableCell align="left">
                                    <button className='update_lead_modal_btn'>Mark Update</button>
                                    <button className='delete_lead_modal_btn'>Delete</button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddLeadModal open={open} />


        </div>
    )
}

export default DisplayLeads
