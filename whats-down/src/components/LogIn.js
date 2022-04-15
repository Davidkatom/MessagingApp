//user validation
//start register
//lunch chatdowns
import PropTypes from 'prop-types'
import InputLine from './InputLine';
import Button from './Button';

const logins = {a:1,b:2}

const Login = () => {
    return (
        <div>
            <div>                
                <InputLine label='Username' placeholder='Username' type='text' id = 'username'/>
                <InputLine label='Password' placeholder='Password' type='password' id = 'password'/>
                <Button label = 'Login' classy="btn btn-primary" onClick = {logBu} id = 'login_button'/>
            </div>
        </div>
    )
}
const logBu = function loginButton(){
    console.log("Click")
    if(logins[document.getElementById('username').value] == document.getElementById('password').value){
        console.log("Login Successful")
    }
    else{
        console.log("Login Failed")
    }
}

export default Login