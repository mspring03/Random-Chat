import React from 'react';

import FriendList from '../../component/Friend/FriendList/FriendList';
import RoomList from '../../component/RoomList/RoomList';
import Header from '../../component/common/Header/Header';

const MainContainer = () => {
    return (
        <React.Fragment>
            <FriendList />
            <Header />
            <RoomList />
        </React.Fragment>
    )
}

export default MainContainer;
