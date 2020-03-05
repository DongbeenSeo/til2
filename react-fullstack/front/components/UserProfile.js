import React from 'react';
import { Card, Avatar } from 'antd';

const dummy = {
  nickname: 'dongbeen',
  post: 0,
  following: 0,
  follower: 0,
  isLogin: false,
};

const UserProfile = () => {
  return (
    <div>
      <Card
        actions={[
          <div key="post">
            like
            <br />
            {dummy.post}
          </div>,
          <div key="following">
            following
            <br />
            {dummy.following}
          </div>,
          <div key="follower">
            follower
            <br />
            {dummy.follower}
          </div>,
        ]}>
        <Card.Meta
          avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
          title={dummy.nickname}
        />
      </Card>
    </div>
  );
};

export default UserProfile;
