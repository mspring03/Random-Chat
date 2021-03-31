import React from 'react';

import FriendList from '../../component/Friend/FriendList/FriendList';
import RoomList from '../../component/RoomList/RoomList';
import Header from '../../component/common/Header/Header';
import { useHistory } from 'react-router-dom';

const MainContainer = () => {
    const history = useHistory();
    
    window.onpopstate = function() {
        history.go(0)
    }

    return (
        <React.Fragment>
            <FriendList />
            <Header />
            <RoomList />
        </React.Fragment>
    )
}

export default MainContainer;
