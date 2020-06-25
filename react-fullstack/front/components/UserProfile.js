import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction, LOG_OUT_REQUEST } from "../reducers/user";

const UserProfile = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <div style={{ padding: 10 }}>
      <Card
        actions={[
          <div key="post">
            like
            <br />
            {me.post}
          </div>,
          <div key="following">
            following
            <br />
            {me.following}
          </div>,
          <div key="follower">
            follower
            <br />
            {me.follower}
          </div>,
        ]}>
        <Card.Meta
          avatar={<Avatar>{me.nickname[0]}</Avatar>}
          title={me.nickname}
        />
        <Button onClick={onLogout}>로그아웃</Button>
      </Card>
    </div>
  );
};

export default UserProfile;
