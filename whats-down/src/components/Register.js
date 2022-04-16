//input checks
//save user
//return to login
import InputLine from "./InputLine"
import Button from "./Button"
import { useState } from 'react';



const Register = ({ user_list, addUser, checkUser }) => {
    const [alert, setAlert] = useState(['', 'alert alert-danger'])

    //show all existing users for tests:
    const showUsers = () => {
        user_list.map((user) => (
            setAlert(['username: ' + user.user_name + ' password: ' + user.password, 'alert alert-secondary'])
        ))
    }
    //password validation
    function validatePassword(p1, p2) {
        let errors = [];
        if (p1 !== p2) {
            errors.push("Passwords don't match");
        }
        if (p1.length < 3) {
            errors.push("Your password must be at least 8 characters");
        }
        if (p1.search(/[a-z]/i) < 0) {
            errors.push("Your password must contain at least one letter");
        }
        if (p1.search(/[0-9]/) < 0) {
            errors.push("Your password must contain at least one digit");
        }
        if (errors.length > 0) {
            setAlert([errors.join(". "), 'alert alert-danger']);
            return false;
        }
        return true;
    }

    //user validation and registreation
    const on_submit = (e) => {

        //prevent default form submit - to prevent page reload
        e.preventDefault();
        let u_name = document.getElementById('user_name').value
        let p_word1 = document.getElementById('password1').value
        let p_word2 = document.getElementById('password2').value
        let d_name = document.getElementById('display_name').value
        //check username doesn't exist
        if (checkUser(u_name)) {
            setAlert(["Username already exists", 'alert alert-danger'])
            return
        }
        if (u_name.length < 3) {
            setAlert(["Username must be at least 3 characters long", 'alert alert-danger'])
            return
        }
        //check password
        if(!validatePassword(p_word1, p_word2)){
            return
        }
        
        //check display name
        if (d_name.length < 3) {
            setAlert(["Display name must be at least 3 characters long", 'alert alert-danger'])
            return
        }
        //check picture
        //todo add picture check


        //add user to userlist after all validation
        let isRegisterded = addUser({
            user_name: u_name,
            password: p_word1,
            display_name: d_name,
            picture: document.getElementById('picture').value,
        })
        if (isRegisterded === "success") {
            setAlert(["Register Successful", 'alert alert-success'])
        } else {
            setAlert(["Register Failed", 'alert alert-danger'])
        }
        //clear all form inputs
        document.getElementById('user_name').value = ''
        document.getElementById('password1').value = ''
        document.getElementById('password2').value = ''
        document.getElementById('display_name').value = ''
        document.getElementById('picture').value = ''
    }
    return (
        <div>Register Form
            <form onSubmit={on_submit}>
                <div class="form-group">
                    <InputLine label='UserName:' type='text' id='user_name' placeholder='Enter UserName' />
                    <InputLine label='Password:' type='password' id='password1' placeholder='Enter Password' />
                    <InputLine label='Confirm Password:' type='password' id='password2' placeholder='Confirm Password' />
                    <InputLine label='Display Name:' type='text' id='display_name' placeholder='Enter Display Name' />
                    <InputLine label='Picture:' id='picture' placeholder='Enter a picture' />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <Button label='Back' classy="btn btn-primary" />
            </form>

            <Button label='show users' classy="btn btn-primary" onClick={showUsers} />

            <div class="" id="error_message_reg">
                    <div class={alert[1]} role="alert" id="alert">
                        {alert[0]}
                    </div>
                </div>
        </div>


    )
}

export default Register