import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar } from "antd";

import { LOAD_USER_POSTS_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST } from "../reducers/user";

import PostCard from "../components/PostCard";

function User({ id }) {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id,
    });
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: id,
    });
  }, []);
  return (
    <div>
      {userInfo ? (
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
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      {mainPosts.map((value) => (
        <PostCard key={value.createAt} post={value} />
      ))}
    </div>
  );
}

User.getInitialProps = async (context) => {
  return { id: parseInt(context.query.id, 10) };
};

export default User;
