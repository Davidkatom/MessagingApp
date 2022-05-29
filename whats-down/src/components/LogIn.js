//user validation
//start register
//lunch chatdowns
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

import InputLine from './InputLine';
import Register from './Register';
import Modal from 'react-bootstrap/Modal'
import { useState } from "react"

var local_server = "https://localhost:7144"

const Login = ({  setToken,token }) => {
    //modal show handle and so:
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        document.getElementById('username').value="";
        document.getElementById('password').value="";
        (document.getElementById('success')).classList.add('collapse');
        (document.getElementById('error_message')).classList.add('collapse');
        setShow(true);
    }


    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/chat', { replace: true }), [navigate]);

    
    const [loginError, setloginError] = useState("")
    function loginButton(){
        let user_name = document.getElementById('username').value
        let user_password = document.getElementById('password').value
        let myCollapseS = document.getElementById('success')
        let myCollapseE = document.getElementById('error_message')
        $.ajax({
            url: local_server+'/api/Login?username='+user_name+'&password='+user_password,
            type: 'POST',
            contentType: 'application/json',
            success: function (data) {
                setToken(data)
                myCollapseE.classList.add('collapse');
                myCollapseS.classList.remove('collapse');
                handleOnClick();
            },
            error: function(data){
                //print error message from data
                data.status === 0 ? setloginError("Connection error - server not found"):setloginError(data.responseText)
                myCollapseE.classList.remove('collapse');
                myCollapseS.classList.add('collapse');
            },
        });
    }

    return (
        <div className='container'>
            <span className='contact-header'>Log in to Whats Down</span>

            <InputLine label='Username' placeholder='Username' type='text' id='username' />
            <InputLine label='Password' placeholder='Password' type='password' id='password' />

            <div className="collapse" id="error_message">
                <div className="alert alert-danger" role="alert" id="alert">
                    {loginError}
                </div>
            </div>
            <div className="collapse" id="success">
                <div className="alert alert-success" role="alert" id="alert">
                    Login Successful
                </div>
            </div>

            <div className="buttons">
                <button label='Login' className="btn btn-primary" onClick={loginButton} id='login_button' >Login</button>
                <button className="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleShow} >Sign Up</button>
            </div>
  


            <Modal show={show} onHide={handleClose}>

                <Modal.Body>
                    <Register  close={handleClose} />
                </Modal.Body>
            </Modal>
        </div>
    )
}





export default Login