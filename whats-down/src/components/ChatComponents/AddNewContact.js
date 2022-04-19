import InputLine from "../InputLine"
import Modal from 'react-bootstrap/Modal'
import { useState } from "react";


import { RiContactsLine } from 'react-icons/ri';


const AddNewContact = ({ addContact }) => {
    const [error_message, set_error_message] = useState('default');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function validateAndAddNewContact() {
        //loop throwe all contacts to see if already exists
        var name = document.getElementById('new_user_name')
        var returnVal = addContact(name.value)
        if (returnVal === 'success') {
            cleanAndClose()
        } else {
            set_error_message(returnVal)
            document.getElementById('error_message').classList.remove('collapse');
        }
    }
    function cleanAndClose() {
        document.getElementById('new_user_name').value = ''
        document.getElementById('error_message').classList.add('collapse');
        handleClose()
    }

    return (

        <div>
            <button variant="primary " className="btn btn-light" title="add contact" onClick={handleShow}><RiContactsLine /></button>
            <Modal show={show} onHide={cleanAndClose}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Add new contact</h4>
                </Modal.Header>
                <Modal.Body><InputLine label='Contact-identifier:' type='text' id='new_user_name' placeholder='Contact-identifier' fun = {validateAndAddNewContact}/>
                <div className="align-center collapse" id="error_message">
                    <div className="alert alert-danger" role="alert" id="alert">
                        {error_message}
                    </div>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={() => validateAndAddNewContact()}>
                        Add
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddNewContact