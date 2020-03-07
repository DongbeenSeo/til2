import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../reducers/user';

const UserProfile = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logoutAction);
  }, []);
  return (
    <div>
      <Card
        actions={[
          <div key="post">
            like
            <br />
            {user.post}
          </div>,
          <div key="following">
            following
            <br />
            {user.following}
          </div>,
          <div key="follower">
            follower
            <br />
            {user.follower}
          </div>,
        ]}>
        <Card.Meta
          avatar={<Avatar>{user.nickname[0]}</Avatar>}
          title={user.nickname}
        />
        <Button onClick={onLogout}>로그아웃</Button>
      </Card>
    </div>
  );
};

export default UserProfile;
