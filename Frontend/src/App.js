import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import Login from './containers/LoginContainer/LoginContainer';
import Signup from './containers/SignupContainer/SignupContainer';
import GuestLogin from './containers/GuestLoginContainer/GuestLoginContainer'
import Main from './containers/MainContainer/MainContainer'
import GlobalStyle from './GlobalStyle';

const App = () => {
    return (
        <BrowserRouter>
        <GlobalStyle />
            <Route path='/login' component={Login} />
            <Route path='/guestLogin' component={GuestLogin} />
            <Route path='/signup' component={Signup} />
            <Route path='/main' component={Main} />
        </BrowserRouter>
    );

}

export default App;