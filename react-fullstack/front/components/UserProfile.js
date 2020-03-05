import React from "react";
import { Card, Avatar } from "antd";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector(state => state.user);
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
          </div>
        ]}>
        <Card.Meta
          avatar={<Avatar>{user.nickname[0]}</Avatar>}
          title={user.nickname}
        />
      </Card>
    </div>
  );
};

export default UserProfile;
