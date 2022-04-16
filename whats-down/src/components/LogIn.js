//user validation
//start register
//lunch chatdowns
import InputLine from './InputLine';
import Button from './Button';
import Register from './Register';

var user_list_local
const Login = ({ user_list, addUser, checkUser }) => {
    user_list_local = user_list;
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
                <button class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" >Sign Up</button>
            </div>


            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <Register user_list={user_list} checkUser={checkUser} addUser={addUser} />
                    </div>
                </div>
            </div>
        </div>
    )
}



const logBu = function loginButton() {
    console.log("Click")
    var myCollapseS = document.getElementById('success')
    var myCollapseE = document.getElementById('error_message')

    if (user_list_local.map((user) => (user.user_name === document.getElementById('username').value && user.password === document.getElementById('password').value)).includes(true)) {
        myCollapseE.classList.add('collapse');
        myCollapseS.classList.remove('collapse');
        
    }
    else {
        myCollapseE.classList.remove('collapse');
        myCollapseS.classList.add('collapse');
        //myCollapseS.classList.hide()
    }

}

export default Login