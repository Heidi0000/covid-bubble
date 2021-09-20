import { useState } from "react"

const {REACT_APP_TEST} = process.env;


const Credentials = ({notEntered, setnotEntered}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(name,email,password,remember)
        const credentials = {name, email,password}
        fetch(`${process.env.REACT_APP_TEST}/signup`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(credentials)
        }).then(response => response.json()).then(data => console.log(data))
    
        setnotEntered(!notEntered)
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
                    <button onClick={toggleFnc}>Show Password</button>
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
