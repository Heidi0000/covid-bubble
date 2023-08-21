import { Redirect } from "react-router-dom"
import LoginHeader from "./LoginHeader"

const LoginHeaderWrapper = ({signIn, setSignIn}) => {
     if (signIn){
        return <Redirect to="/mainpage" />;
    }
    return (
        <div>
            <div className="section-box">
                <LoginHeader signIn={signIn} setSignIn={setSignIn}/>
            </div>
        </div>
    )
}

export default LoginHeaderWrapper
