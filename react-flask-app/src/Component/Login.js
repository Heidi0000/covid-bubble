import { useState } from "react"
import { Redirect } from "react-router-dom"
// import { FontAwesomeIcon } from '@fontawesome/react-fontawesome'
import { Link } from 'react-router-dom';


const Login = ({signIn,setSignIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const token = sessionStorage["token"];

    const onSubmit = (e) => {
        e.preventDefault()
        const credentials = {email, password}
        fetch(`${process.env.REACT_APP_TEST}/signin`,{
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }).then(response => {
            if (response.status===200) return response.json();
            else alert('Incorrect Email or Password');
        }).then(data => {
            console.log("this came from the backend", data);
            sessionStorage.setItem("token", data.access_token);
        })
    }

    const toggleFnc = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    return (
        <div>
            {(token && token != "" && token != undefined) ? <Redirect to="/mainpage" /> :
                <div className="signup-header">
                    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>

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
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='Password' 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    
                                />
                                {showPassword?
                                <button  className='show-password-btn' onClick={toggleFnc} 
                                style={{background: "url('https://img.icons8.com/material-outlined/24/000000/closed-eye.png')"}}
                                ></button>
                                :<button  className='show-password-btn' onClick={toggleFnc}
                                style={{background: "url('https://img.icons8.com/material-outlined/24/000000/visible--v2.png')"}}
                                ></button>
                                }

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
            }
        </div>
    )
}

export default Login
