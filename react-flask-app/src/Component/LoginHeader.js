import Credentials from "./Credentials"
import { useState } from "react"

const LoginHeader = () => {
    const [notEntered, setnotEntered] = useState(true)
    return (
        <div>
            {notEntered ? 
            <div>
                <h1>Create account</h1>
                <h2>Already have an account? Sign in</h2>
            </div> 
            : <h1>Successfully entered</h1>}
            {notEntered && <Credentials notEntered={notEntered} setnotEntered={setnotEntered}/>}
        </div>
    )
}

export default LoginHeader
