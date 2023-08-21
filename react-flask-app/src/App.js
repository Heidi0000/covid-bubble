import './App.css';
import LoginHeaderWrapper from './Component/LoginHeaderWrapper';
import { useState } from "react"
import MainPage from './Component/MainPage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import injectContext from './Component/Store/appContext';

function App() {
  const [signIn, setSignIn] = useState(false)
 
  return (
      <Router>
        <div className = "container">
          <div className='logo'>
            Covid Bubble
          </div>
          <div className = "content-wrapper">
            <Switch>

              <Route exact path="/" component={() => (<LoginHeaderWrapper signIn={signIn} setSignIn={setSignIn} />)}/>
              <Route exact path="/mainpage" component={() => (<MainPage setSignIn={setSignIn} signIn= {signIn} />)}/>
            </Switch>
          </div>
        </div>
      </Router>
  )

}


export default injectContext(App);
