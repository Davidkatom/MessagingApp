//user validation
//start register
//lunch chatdowns
import InputLine from './InputLine';
import Button from './Button';

const logins = { a: 1, b: 2 }
const Login = () => {
    return (
        <div class='container'>
            <InputLine label='Username' placeholder='Username' type='text' id='username' />
            <InputLine label='Password' placeholder='Password' type='password' id='password' />
            <div class="collapse" id="error_message">
                <div class="alert alert-danger" role="alert" id="alert">
                    Wrong username or password
                </div>
            </div>

            <div class="collapse" id="success">
                <div class="alert alert-success" role="alert" id="alert">
                    Login Successful
                </div>
            </div>

            <div class="buttons">
                <Button label='Login' classy="btn btn-primary" onClick={logBu} id='login_button' />
                <Button label='Sign Up' classy="btn btn-secondary btn-sm" onClick={logBu} id='register_button' />
            </div>

        </div>
    )
}
const logBu = function loginButton() {
    console.log("Click")
    var myCollapseS = document.getElementById('success')
    var myCollapseE = document.getElementById('error_message')

    if (logins[document.getElementById('username').value] == document.getElementById('password').value) {
        console.log("suc")
        myCollapseE.classList.add('collapse');
        myCollapseS.classList.remove('collapse');

    }
    else {
        console.log("error")
        myCollapseE.classList.remove('collapse');
        myCollapseS.classList.add('collapse');
        //myCollapseS.classList.hide()
    }
}



export default Login