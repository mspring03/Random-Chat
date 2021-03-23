import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import Login from './containers/LoginContainer/LoginContainer';
import Signup from './containers/SignupContainer/SignupContainer';
import guestLogin from './containers/GuestLoginContainer/GuestLoginContainer'
import GlobalStyle from './GlobalStyle';

const App = () => {
    return (
        <BrowserRouter>
        <GlobalStyle />
            <Route path='/login' component={Login} />
            <Route path='/guestLogin' component={guestLogin} />
            <Route path='/signup' component={Signup} />
        </BrowserRouter>
    );

}

export default App;