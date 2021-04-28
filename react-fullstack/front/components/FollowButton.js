import React from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";

const FollowButton = ({ post, onFollow, onUnFollow }) => {
  const { me } = useSelector((state) => state.user);
  return !me || post.User.id === me.id ? null : me.Followings &&
    me.Followings.find((v) => v.id === post.User.id) ? (
    <Button onClick={onUnFollow(post.User.id)}>UnFollow</Button>
  ) : (
    <Button onClick={onFollow(post.User.id)}>Follow</Button>
  );
};

export default FollowButton;
