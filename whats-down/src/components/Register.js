//input checks
//save user
//return to login
import InputLine from "./InputLine"
import Button from "./Button"
const Register = () => {
    const register_btn = () => {
        console.log('Clicked')
    }
    return (
        <div>Register Form
            <InputLine label='UserName:' id='userName' placeholder='Enter UserName' />
            <InputLine label='Password:' type='password' id='password1' placeholder='Enter Password' />
            <InputLine label='Confirm Password:' type='password' id='password2' placeholder='Confirm Password' />
            <InputLine label='Display Name:' id='displayName' placeholder='Enter Display Name' />
            <Button label='Register' classy='btn btn-primary' onClick={register_btn} />
        </div>


    )
}

export default Register