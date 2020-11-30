import React from 'react';
import './DeleteLead.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const DeleteLead = (props) => {
    const submit = () => {
        confirmAlert({
            title: 'Do you wish to delete this lead?',
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => alert('Deleted')
                },
                {
                    label: 'Cancel',
                    onClick: () => alert('Cancelled')
                }
            ]
        })
    };
    return (
        <div className="container">
            <button onClick={submit}>Confirm dialog</button>
        </div>
    )
}

export default DeleteLead