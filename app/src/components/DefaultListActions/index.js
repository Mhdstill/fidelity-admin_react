import React, { useState } from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DefaultListActions(props) {

    const navigate = useNavigate();
    const { editRedirectPath } = props;
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handlEditClick = () => navigate(editRedirectPath);
    const handleDelete = () => props.onDelete();

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

            <div style={{fontSize: '1.5rem', color: 'var(--main-color)', cursor: 'pointer'}}>
                <FontAwesomeIcon icon={faEdit} className='me-2' onClick={handlEditClick} />
                <FontAwesomeIcon icon={faTrash} onClick={handleShowModal} />
            </div>
        </>


    );
}

export default DefaultListActions;