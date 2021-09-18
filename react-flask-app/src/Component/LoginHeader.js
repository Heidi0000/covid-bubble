import Credentials from "./Credentials"
import { useState } from "react"

const LoginHeader = () => {
    const [notEntered, setnotEntered] = useState(true)
    const [signIn, setSignIn] = useState(false)

    const onClick = () => {
        setSignIn(true)
    }
    return (
        <div className="login-container">

            {notEntered ?
                (signIn ? 
                <h1>sign in please</h1> 
                : 
                <div className="signup-header">
                    <h1>Create account</h1>
                    <h2>Already have an account? </h2> <h2 onClick={onClick} style={{cursor: 'pointer'}}>Sign in</h2>
                    <Credentials notEntered={notEntered} setnotEntered={setnotEntered}/>
                </div>)
                :
                <h1>Successfully entered</h1>
            }
        </div>
    )
}

export default LoginHeader
