import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import LoginContainer from './containers/login/LoginContainer';
import SignupContainer from './containers/signup/SignupContainer'
import GlobalStyle from './GlobalStyle';

const App = () => {
    return (
        <BrowserRouter>
        <GlobalStyle />
            <Route path="/login" component={LoginContainer} />
            <Route path='/signup' component={SignupContainer} />
        </BrowserRouter>
    );

}

export default App;