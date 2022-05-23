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


const Login = ({ user_list, addUser, checkUser, set_current_user }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logBu = function loginButton() {
        var myCollapseS = document.getElementById('success')
        var myCollapseE = document.getElementById('error_message')
        //check if user and password in data base
        if (checkUser(document.getElementById('username').value) && user_list[document.getElementById('username').value].user_name === document.getElementById('username').value && user_list[document.getElementById('username').value].password === document.getElementById('password').value) {
            myCollapseE.classList.add('collapse');
            myCollapseS.classList.remove('collapse');
            set_current_user(user_list[document.getElementById('username').value])
            handleOnClick();

        }
        else {
            myCollapseE.classList.remove('collapse');
            myCollapseS.classList.add('collapse');
            //myCollapseS.classList.hide()
        }

    }
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/chat', { replace: true }), [navigate]);

    
    const [token, setToken] = useState("")
    function loginToken(){
        $.ajax({
            url: 'https://localhost:7144/api/Login?username=a&password=b',
            type: 'POST',
            contentType: 'application/json',
            success: function (data) {setToken(data)},
            error: function(){},
        });
    }
    function getWhether(){
        $.ajax({
            url: 'https://localhost:7144/WeatherForecast',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            data:{},
            contentType: 'application/json',
            success: function (data) {console.log(data)},
            error: function(){},
        });        
    }
    
    return (
        <div className='container'>
            <span className='contact-header'>Log in to Whats Down</span>

            <InputLine label='Username' placeholder='Username' type='text' id='username' />
            <InputLine label='Password' placeholder='Password' type='password' id='password' fun={logBu} />

            <div className="collapse" id="error_message">
                <div className="alert alert-danger" role="alert" id="alert">
                    Wrong username or password
                </div>
            </div>

            <div className="collapse" id="success">
                <div className="alert alert-success" role="alert" id="alert">

                    Login Successful
                </div>
            </div>

            <div className="buttons">
                <button label='Login' className="btn btn-primary" onClick={logBu} id='login_button' >Login</button>
                <button className="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleShow} >Sign Up</button>
            </div>
   
            <div>
                <button className="btn btn-secondary" onClick={loginToken}>{token}</button>
            </div>   
            <div>
                <button className="btn btn-secondary" onClick={getWhether}>getWheter</button>
            </div>


            <Modal show={show} onHide={handleClose}>

                <Modal.Body>
                    <Register user_list={user_list} checkUser={checkUser} addUser={addUser} close={handleClose} />
                </Modal.Body>
            </Modal>
        </div>
    )
}





export default Login