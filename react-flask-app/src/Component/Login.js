import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(email,password,remember)        
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
