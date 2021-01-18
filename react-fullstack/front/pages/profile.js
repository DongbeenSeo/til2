import React, { useEffect } from "react";
import { Button, List, Card, Icon } from "antd";
import { useDispatch, useSelector } from "react-redux";
import NickNameEditForm from "../components/NickNameEditForm";
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  UNFOLLOW_USER_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
} from "../reducers/user";
import { LOAD_USER_POSTS_REQUEST } from "../reducers/post";
import PostCard from "../components/PostCard";
import { useCallback } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const { me, followingList, followerList } = useSelector(
    (state) => state.user
  );
  const { mainPosts } = useSelector((state) => state.post);

  const onUnFollow = useCallback(
    (userId) => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId,
      });
    },
    []
  );

  const onRemoveFollower = useCallback(
    (userId) => () => {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: userId,
      });
    },
    []
  );

  return (
    <div>
      <NickNameEditForm />
      <List
        style={{ marginBottom: 20 }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={<Button style={{ width: "100%" }}>더 보기</Button>}
        dataSource={followingList}
        renderItem={(item) => (
          <List.Item style={{ marginTop: 20 }}>
            <Card
              actions={[
                <Icon key="stop" type="stop" onClick={onUnFollow(item.id)} />,
              ]}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
      <List
        style={{ marginBottom: 20 }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={<Button style={{ width: "100%" }}>더 보기</Button>}
        dataSource={followerList}
        renderItem={(item) => (
          <List.Item style={{ marginTop: 20 }}>
            <Card
              actions={[
                <Icon
                  key="stop"
                  type="stop"
                  onClick={onRemoveFollower(item.id)}
                />,
              ]}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
      <div>
        {mainPosts.map((value, index) => (
          <PostCard key={index} post={value} />
        ))}
      </div>
    </div>
  );
};

//SSR로 데이터 세팅
Profile.getInitialProps = async (context) => {
  const state = context.store.getState();
  // 이 직전에 LOAD_USER_REQUEST
  console.log(`Profile.getIniitalProps`, context);
  context.store.dispatch({
    type: LOAD_FOLLOWERS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
  context.store.dispatch({
    type: LOAD_FOLLOWINGS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
  // 이 쯤에서 LOAD_USER_SUCCESS가 돼서 me가 생김.
};
export default Profile;
