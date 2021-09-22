import { useState } from "react"
import { Context } from "./Store/appContext";
import { useContext } from "react";
const {REACT_APP_TEST} = process.env;


const Credentials = ({notEntered, setnotEntered}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const {store, actions} = useContext(Context)
    const token = sessionStorage["token"];

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(name,email,password,remember)
        actions.signup(name,email,password).then(()=>{
            console.log("SETING NOTENTERED TO FALSE")
            setnotEntered(false)
        })
    }

    const toggleFnc = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }
    return (
        <div className="cred-container">
            <form onSubmit={(onSubmit)}>
                <div className='form-control'>
                    <input 
                        type='text' 
                        placeholder='Name' 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
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
                <input type='submit' value='Sign up' className='btn btn-block' />
            </form>
        </div>
        
    )
}

export default Credentials
