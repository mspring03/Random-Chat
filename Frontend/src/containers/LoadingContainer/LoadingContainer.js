import React from 'react';

import FriendList from '../../component/Friend/FriendList/FriendList';
import Loading from '../../component/Loading/Loading';
import Header from '../../component/common/Header/Header';

const GuestLoginContainer = () => {
    return (
        <React.Fragment>
            <FriendList />
            <Header />
            <Loading />
        </React.Fragment>
    )
}

export default GuestLoginContainer;