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
            <div key="twit">
              twit
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              following
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              follower
              <br />
              {userInfo.Followers}
            </div>,
          ]}>
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      <div style={{ height: "10px" }} />
      {mainPosts.map((value, index) => (
        <PostCard key={index} post={value} />
      ))}
    </div>
  );
}

/**
 * getInitialProps : server-side rendering 의 핵심
 * server에 필요한 데이터를 넣어주기 위해 getInitialProps 함수 안에
 * dispatch함수를 집어 넣어준다.
 * */
User.getInitialProps = async (context) => {
  return { id: parseInt(context.query.id, 10) };
};

export default User;
