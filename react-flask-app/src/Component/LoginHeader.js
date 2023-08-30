import Credentials from "./Credentials"
import Login from "./Login"
import { useState } from "react"
import AddFriend from "./AddFriend"
import { Context } from "./Store/appContext"
import { useContext } from "react"

const addFriend = (friend) =>{
    console.log(friend)
  }

const LoginHeader = ({signIn,setSignIn}) => {
    const [notEntered, setnotEntered] = useState(true);
    const [signIned, setSignIned] = useState(false);
    const {store, actions} = useContext(Context);    
    const onClick = () => {
        setSignIned(true)
    }

    return (
        <div >
            {!store.token
            ?
                (signIned 
                ? 
                    <Login signIn={signIn} setSignIn={setSignIn} backToSignup={signIned} setBackToSignup={setSignIned}/>
                : 
                <div className="box-container">
                    <h1 className="header-title">Sign up</h1>
                    <Credentials notEntered={notEntered} setnotEntered={setnotEntered}/>
                    <div className="login-paragraph">
                        Already have an account? <span className="highlight" onClick={onClick}>Sign in</span>
                        <br></br>
                        <span className="or">or</span>
                        <br></br>
                        Sign in with a <span className="highlight">sample account</span> to see Covid Bubble in action
                    </div>
                </div>)
                :
                <div >
                    <AddFriend onAdd={addFriend} setSignIn={setSignIn}/>
                </div>
            }
        </div>
    )
}

export default LoginHeader
