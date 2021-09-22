import { Redirect } from "react-router-dom"
import LoginHeader from "./LoginHeader"

const LoginHeaderWrapper = ({signIn, setSignIn}) => {
    const token = sessionStorage.getItem["token"]
    //  if (signIn){
    //     return <Redirect to="/mainpage" />;
    // }
    return (
        <div>
            {(token && token != "" && token != undefined) ? <Redirect to="/mainpage" /> :
                <div className="loginBox">
                    <LoginHeader signIn={signIn} setSignIn={setSignIn}/>
                </div>
            }
        </div>
    )
}

export default LoginHeaderWrapper
