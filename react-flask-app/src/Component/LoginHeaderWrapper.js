import { Redirect } from "react-router-dom"
import LoginHeader from "./LoginHeader"

const LoginHeaderWrapper = ({signIn, setSignIn}) => {
     if (signIn){
        return <Redirect to="/mainpage" />;
    }
    return (
        <div>
            <div className="loginBox">
                <LoginHeader signIn={signIn} setSignIn={setSignIn}/>
            </div>
        </div>
    )
}

export default LoginHeaderWrapper
