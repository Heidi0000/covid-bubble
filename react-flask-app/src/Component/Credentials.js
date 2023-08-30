import { useState } from "react"
import { Context } from "./Store/appContext";
import { useContext } from "react";
const {REACT_APP_TEST} = process.env;


const Credentials = ({notEntered, setnotEntered}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {store, actions} = useContext(Context)
    const token = sessionStorage["token"];

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(name,email,password)
        if (!name || !email || !password){
            alert("Please fill in all fields");
        } 
        else{
            actions.signup(name,email,password).then(()=>{
                setnotEntered(false)
            })
        }
    }

    return (
        <div>
            <form onSubmit={(onSubmit)}>
            <div className="user-input-form">
                <input className='user-text-input'
                    type='text' 
                    placeholder='Name' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>
            <div className='user-input-form'>
                <input className='user-text-input'
                    type='text' 
                    placeholder='Email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
                <div className='user-input-form'>
                <input className='user-text-input'
                    type="password"
                    placeholder='Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <input type='submit' value='Sign up' className='main-button' />
            </form>
        </div>
        
    )
}

export default Credentials
