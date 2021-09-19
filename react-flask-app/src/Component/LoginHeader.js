import Credentials from "./Credentials"
import Login from "./Login"
import { useState } from "react"

const LoginHeader = ({signIn,setSignIn}) => {
    const [notEntered, setnotEntered] = useState(true)
    const [signIned, setSignIned] = useState(false)

    const onClick = () => {
        setSignIned(true)
    }
    return (
        <div className="login-container">

            {notEntered 
            ?
                (signIned 
                ? 
                    <Login signIn={signIn} setSignIn={setSignIn}/>
                : 
                    <div className="signup-header">
                        <h1>Create account</h1>
                        <h2>Already have an account? </h2> <h2 onClick={onClick} style={{cursor: 'pointer', color:'lightblue'}}>Sign in</h2>
                        <Credentials notEntered={notEntered} setnotEntered={setnotEntered}/>
                    </div>)
            :
                <h1>Successfully entered</h1>
            }
        </div>
    )
}

export default LoginHeader
