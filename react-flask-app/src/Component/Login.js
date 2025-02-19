import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { Context } from "./Store/appContext";
import { useHistory } from "react-router";
import { useContext } from "react";

const Login = ({signIn,setSignIn, backToSignup,setBackToSignup, useSampleUSer, setuseSampleUSer}) => {
    const {store, actions} = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token = sessionStorage["token"];
    const history = useHistory()

    useEffect(() => {
        if (useSampleUSer){
            fillInSampleUser();
        }
        useSampleUSer = false;
    }, []);

    const onSubmit = (e) => {
        e.preventDefault()
        if (!email || !password){
            alert("please fill in all fields");
        }
        else{
            actions.login(email,password).then((response)=>{
                if (response){
                    setSignIn(true)
                }
                else {
                    console.log("login unsuccessful");
                }
            })
        }
    };    
    
    const onBackToSignup = () => {
        // signedin (in login header) = true -> login, false -> signup
        setuseSampleUSer(false)
        setBackToSignup(false);
    }

    const fillInSampleUser = () => {
        setEmail('sample@sample.com');
        setPassword('samplePassword');
    }

    if (store.token && store.token != "" && store.token != undefined) history.push("/mainpage");

    return (
        <div className="box-container">
            {(store.token && store.token != "" && store.token != undefined) ? <Redirect to="/mainpage"/> :
                <div className="box-content-container">
                    <div  className="header-title">Sign in</div>
                        <form onSubmit={(onSubmit)}>
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
                            <input type='submit' value='Sign in' className='main-button' />
                            
                        </form>
                        
                        <div className="login-paragraph">
                            Don't have an account? <span className="highlight" 
                            onClick={onBackToSignup} 
                            >Sign up</span>
                            <br></br>
                            <span className="or">or</span>
                            <br></br>
                            Sign in with a <span className="highlight"
                            onClick={fillInSampleUser} 
                            >sample account</span> to see Covid Bubble in action
                        </div>
                </div>
            }
        </div>
    )
}

export default Login
