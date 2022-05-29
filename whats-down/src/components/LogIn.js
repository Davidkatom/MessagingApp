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

var local_server = "http://whatsdown.epizy.com/server/"

const Login = ({  setToken,token }) => {
    //modal show handle and so:
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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
                // console.log(token)
                myCollapseE.classList.add('collapse');
                myCollapseS.classList.remove('collapse');
                handleOnClick();
            },
            error: function(data){
                setloginError(data.responseText)
                myCollapseE.classList.remove('collapse');
                myCollapseS.classList.add('collapse');
            },
        });
    }
    async function TestFunc(){
        $.ajax({
            url: local_server+'/WeatherForecast',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },  
            data:{},
            success: function (data) {
                console.log('omer is here');

                console.log(data);
            },
            error: function (data) {
                console.log("failed");
                console.log(data);
                console.log(token);
            }
        });
    }
/*    async function GetMeFunc(){
        $.ajax({
            url: 'https://localhost:7144/api/Users/Me',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },  
            data:{tokey:token},
            success: function (data) {
                console.log('omer is here');
                
                console.log(data);
            },
            error: function (data) {
                console.log("failed");
                console.log(data);
                console.log(token);
            }
        });
    }*/

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