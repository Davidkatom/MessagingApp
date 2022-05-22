//input checks
//save user
//return to login
import InputLine from "./InputLine"
import { useState } from "react"



const Register = ({ user_list, addUser, checkUser, close }) => {
    const [down_alert, setAlert] = useState(['', ''])

    //show all existing users for tests: -LEAVE IT FOR NEXT ASSIGNMENT
    // const showUsers = () => {
    //     user_list.map((user) => (
    //         alert('username: ' + user.user_name + ' password: ' + user.password)
    //     ))
    // }
    const [profilePicture, setProfilePicture] = useState();
    const handlePicture = (e) => {
        var a = document.getElementById('picture').value
        console.log(a)
        console.log('here')
        console.log(e)
        console.log(e.target.files[0])
        console.log(URL.createObjectURL(e.target.files[0]))
        setProfilePicture(URL.createObjectURL(e.target.files[0]))
        document.getElementById('profile_mini_pic').classList.remove('collapse');
        // let picture = e.target.value
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
    const on_submit = async(e) => {
        //prevent default form submit - to prevent page reload
        e.preventDefault();
        console.log('on submit')

        let u_name = document.getElementById('user_name').value
        let p_word1 = document.getElementById('password1').value
        let p_word2 = document.getElementById('password2').value
        let d_name = document.getElementById('display_name').value
        //check username doesn't exist
        // if (checkUser(u_name)) {
        //     setAlert(["Username already exists", 'alert alert-danger'])
        //     return
        // }
        if (u_name.length < 3) {
            setAlert(["Username must be at least 3 characters long", 'alert alert-danger'])
            return
        }
        //check password
        if (!validatePassword(p_word1, p_word2)) {
            return
        }
        //check display name
        if (d_name.length < 3) {
            setAlert(["Display name must be at least 3 characters long", 'alert alert-danger'])
            return
        }
        //check profile picture:
        if (profilePicture === undefined) {
            setAlert(["You must add a profile picture", 'alert alert-danger'])
            return
        }
        //add user to userlist after all validation
        await fetch('https://localhost:7144/api/Users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: u_name,
                password: p_word1,
                nickName: d_name,
                profilePicture: profilePicture
                // contact_list: [],
                // chat_history: [],
                // last_message: null
            })
            // }).then(res => res.json())
            // .then(data => {
            //     console.log(data)
            //     addUser(data)
            //     close()
            // }
        })
        /*
        let isRegisterded = addUser({
            user_name: u_name,
            password: p_word1,
            display_name: d_name,
            picture: profilePicture,
        })
        */
        console.log("done");
        let isRegisterded = "success"
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

        close()
    }

    return (

        <div className='container-fluid'>
            <h2 className='display-5'>Sign Up Form</h2>
            <form onSubmit={on_submit}>
                <div className="form-group">
                    <InputLine label='UserName:' type='text' id='user_name' placeholder='Enter UserName' />
                    <InputLine label='Password:' type='password' id='password1' placeholder='Enter Password' />
                    <InputLine label='Confirm Password:' type='password' id='password2' placeholder='Confirm Password' />
                    <InputLine label='Display Name:' type='text' id='display_name' placeholder='Enter Display Name' />
                    <div className="row">
                        <div className="col-sm">
                            <label className="input-group-text" htmlFor='picture'>Upload a Profile Picture:</label>
                            <input type="file" className="form-control" id='picture' onChange={handlePicture}></input>
                        </div>
                        <div className="col-sm collapse" id='profile_mini_pic'>
                            <img src={profilePicture} alt="profile" className="img-thumbnail" width="140" height="140" />
                            {/* <img src="../Images/blank-profile-picture.png" alt="profile" className="img-thumbnail" width="140" height="140" /> */}
                        </div>
                    </div>

                </div>
                <br />
                <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                <br />
                <br />
            </form>

            {/* <Button label='show users' classy="btn btn-primary" onClick={showUsers} /> */}

            <div className="" id="error_message_reg">
                <div className={down_alert[1]} role="alert" id="alert">
                    {down_alert[0]}
                </div>
            </div>
        </div>


    )
}

export default Register