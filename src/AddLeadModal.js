import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import {
    Paper,
    Grid,
    Button,
    MenuItem
} from '@material-ui/core';
import qs from 'qs';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));



const AddLeadModal = (props) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);



    const validate = (values) => {
        const errors = {};
        if (!values.first_name) {
            errors.first_name = 'Required';
        }
        if (!values.last_name) {
            errors.last_name = 'Required';
        }
        if (!values.email) {
            errors.email = 'Required';
        }
        if (!values.mobile) {
            errors.mobile = 'Required';
        }
        if (!values.location_type) {
            errors.location_type = 'Required';
        }
        if (!values.location_string) {
            errors.location_string = 'Required';
        }
        return errors;
    };
    const onSubmit = async (values) => {
        console.log(values);
        fetch('http://54.209.73.0:4000/api/leads/?location_string=India', {
            method: 'POST',
            body: qs.stringify(values, 0, 2),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => { return response.json(); })
            .then(responseData => {

            });
    }


    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Add Lead</h2>
            <Form
                onSubmit={onSubmit}
                initialValues={{

                }}
                validate={validate}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper style={{ padding: 16 }}>
                            <Grid container alignItems="flex-start" spacing={2}>
                                <Grid item xs={6} >
                                    <Field
                                        fullWidth
                                        required
                                        name="first_name"
                                        component={TextField}
                                        type="text"
                                        label="First Name"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        required
                                        name="last_name"
                                        component={TextField}
                                        type="text"
                                        label="Last Name"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        required
                                        name="email"
                                        component={TextField}
                                        type="text"
                                        label="Email Address"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        required
                                        name="mobile"
                                        component={TextField}
                                        type="text"
                                        label="Mobile"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        required
                                        name="location_type"
                                        component={Select}
                                        label="Location Type"
                                        formControlProps={{ fullWidth: true }}
                                    >
                                        <MenuItem value="Country">Country</MenuItem>
                                        <MenuItem value="City">City</MenuItem>
                                    </Field>
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        required
                                        name="location_string"
                                        component={TextField}
                                        type="text"
                                        label="Location String"
                                    />
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        onClick={reset}
                                        disabled={submitting || pristine}
                                    >
                                        Cancel </Button>
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={submitting}
                                    >
                                        Save</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                    </form>
                )}
            />

        </div>);
    const handleClose = () => {

    };

    return (
        <div>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}

            </Modal>
        </div>
    )
}

export default AddLeadModal
