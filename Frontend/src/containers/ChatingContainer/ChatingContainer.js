import React from 'react';

import FriendList from '../../component/Friend/FriendList/FriendList';
import Chating from '../../component/Chating/Chating';
import Header from '../../component/common/Header/Header';
import { useHistory } from 'react-router-dom';

const ChatingContainer = () => {
    // const history = useHistory();
    
    // window.onpopstate = function() {
    //     history.go(0)
    // }

    return (
        <React.Fragment>
            <FriendList />
            <Header />
            <Chating />
        </React.Fragment>
    )
}

export default ChatingContainer;