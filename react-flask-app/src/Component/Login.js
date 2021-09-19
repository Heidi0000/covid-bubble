import { useState } from "react"
import { Redirect } from "react-router-dom"

const Login = ({signIn,setSignIn}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        const credentials = {email, password}
        fetch(`${process.env.REACT_APP_TEST}/signin`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(credentials)
        }).then(response => {
            if (response.status===201){
                alert('Incorrect Email or Password')
            }
            else{
                setSignIn(true)
            }
            response.json()
        }).then(data => console.log(data))
    }

    return (
        <div>
            <h1>Log in</h1>
            <div className="cred-container">
                
            <form onSubmit={(onSubmit)}>
                <div className='form-control'>
                    <input 
                        type='text' 
                        placeholder='Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
               
                <div className='form-control'>
                    <input 
                        type='text' 
                        placeholder='Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='form-control-check'>
                    
                    <input 
                        type='checkbox' 
                        checked = {remember}
                        value={remember} 
                        onChange={(e) => setRemember(e.currentTarget.checked)}
                    /><label>Remember me</label>
                </div>
                <input type='submit' value='Sign in' className='btn btn-block' />
            </form>
        </div>
        </div>
    )
}

export default Login
