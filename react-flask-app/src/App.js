import './App.css';
import { useState } from "react"
import LoginHeaderWrapper from './Component/LoginHeaderWrapper';
import LandingPage  from './Component/LandingPage';
import MainPage from './Component/MainPage';
import AddFriend from './Component/AddFriend';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import injectContext from './Component/Store/appContext';

function App() {
  const [signIn, setSignIn] = useState(false)
  const addFriend = (friend) =>{
    console.log(friend)
  }
  return (
      <Router>
        <div className = "container">
          <Link to="/landing" className='logo'>
            Covid Bubble
          </Link>
          <div className = "content-wrapper">
            <Switch>

            <Route exact path="/landing" component={() => (<LandingPage/>)}/>
            <Route exact path="/" component={() => (<LoginHeaderWrapper signIn={signIn} setSignIn={setSignIn} />)}/>
            <Route exact path="/mainpage" component={() => (<MainPage setSignIn={setSignIn} signIn= {signIn} />)}/>
            <Route exact path="/editFriends" component={() => (<AddFriend onAdd={addFriend} setSignIn={setSignIn}/>)}/>
            </Switch>
          </div>
        </div>
      </Router>
  )

}


export default injectContext(App);
