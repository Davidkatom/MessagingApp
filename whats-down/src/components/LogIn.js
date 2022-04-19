//user validation
//start register
//lunch chatdowns
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

import InputLine from './InputLine';
import Button from './Button';
import Register from './Register';

var user_list_local
const Login = ({ user_list, addUser, checkUser, getCurrentUserName }) => {
    const logBu = function loginButton() {
        // console.log("Click")
        var myCollapseS = document.getElementById('success')
        var myCollapseE = document.getElementById('error_message')
        //check if user and password in data base
        if (user_list.map((user) => (user.user_name === document.getElementById('username').value && user.password === document.getElementById('password').value)).includes(true)) {
            myCollapseE.classList.add('collapse');
            myCollapseS.classList.remove('collapse');
            // this.props.router.push('/chat')
            handleOnClick();
            
            
    
            console.log("Login Successful");
            // <BrowserRouter>
            //     <Route exact path="/chat" />
            // </BrowserRouter>
            // { getCurrentUserName(document.getElementById('username').value) }
        }
        else {
            myCollapseE.classList.remove('collapse');
            myCollapseS.classList.add('collapse');
            //myCollapseS.classList.hide()
        }
    
    }
    user_list_local = user_list;
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/chat', {replace: true}), [navigate]);
  
    return (
        <div className='container'>
            <span className='contact-header'>Log in to Whats Down</span>

            <InputLine label='Username' placeholder='Username' type='text' id='username' />
            <InputLine label='Password' placeholder='Password' type='password' id='password' />
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
                <Button label='Login' classy="btn btn-primary" onClick={logBu} id='login_button' />
                <button className="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" >Sign Up</button>
            </div>


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <Register user_list={user_list} checkUser={checkUser} addUser={addUser} />
                    </div>
                </div>
            </div>
        </div>
    )
}





export default Login