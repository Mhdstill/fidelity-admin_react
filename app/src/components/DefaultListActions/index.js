import React, { useContext, useEffect, useState } from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import EllipsisDropdown from '../EllipsisDropdown';
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function DefaultListActions(props) {

    const navigate = useNavigate();
    const { editRedirectPath } = props;
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handlEditClick = () => navigate(editRedirectPath);
    const handleDelete = () => props.onDelete();


    const TableRowActions =
        [
            {
                faIcon: faEdit,
                label: "Modifier",
                handleClick: handlEditClick
            },
            {
                faIcon: faTrash,
                label: "Supprimer",
                handleClick: handleShowModal
            },
        ]

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation de suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer cette ligne ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>

            <EllipsisDropdown buttonItems={TableRowActions} />
        </>


    );
}

export default DefaultListActions;