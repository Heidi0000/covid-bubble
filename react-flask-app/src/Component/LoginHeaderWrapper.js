import { Redirect } from "react-router-dom"
import LoginHeader from "./LoginHeader"
import { useLocation } from "react-router-dom";

const LoginHeaderWrapper = ({signIn, setSignIn}) => {
    const location = useLocation();
    if (signIn){
        const myparam = location?.state?.params;
        if (myparam == undefined){
            return <Redirect to="/mainpage" />;
        }
            
        if (!myparam){
            location.state.params = false;
            return <Redirect to="/mainpage" />;
        }
        
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
