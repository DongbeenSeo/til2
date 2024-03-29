import React, { useEffect, useCallback } from "react";
import { Button, List, Card, Icon } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  UNFOLLOW_USER_REQUEST,
  REMOVE_FOLLOWER_REQUEST
} from "../reducers/user";
import { LOAD_USER_POSTS_REQUEST } from "../reducers/post";

import NickNameEditForm from "../components/NickNameEditForm";
import PostCard from "../components/PostCard";
import FollowList from "../components/FollowList";

const Profile = () => {
  const dispatch = useDispatch();
  const {
    me,
    followingList,
    followerList,
    hasMoreFollower,
    hasMoreFollowing
  } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  const onUnFollow = useCallback(
    (userId) => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId
      });
    },
    []
  );

  const onRemoveFollower = useCallback(
    (userId) => () => {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: userId
      });
    },
    []
  );

  const loadMoreFollowings = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      offset: followingList.length
    });
  }, [followingList.length]);

  const loadMoreFollowers = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      offset: followerList.length
    });
  }, [followerList.length]);

  return (
    <div>
      <NickNameEditForm />
      <FollowList
        header={"팔로잉 목록"}
        hasMore={hasMoreFollowing}
        data={followingList}
        onClickMore={loadMoreFollowings}
        onClickStop={(userId) => {
          onUnFollow(userId);
        }}
      />
      <FollowList
        header={"팔로워 목록"}
        hasMore={hasMoreFollower}
        data={followerList}
        onClickMore={loadMoreFollowers}
        onClickStop={onRemoveFollower}
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
  // console.log(`Profile.getIniitalProps`, context);
  context.store.dispatch({
    type: LOAD_FOLLOWERS_REQUEST,
    data: state.user.me && state.user.me.id
  });
  context.store.dispatch({
    type: LOAD_FOLLOWINGS_REQUEST,
    data: state.user.me && state.user.me.id
  });
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: state.user.me && state.user.me.id
  });
  // 이 쯤에서 LOAD_USER_SUCCESS가 돼서 me가 생김.
};
export default Profile;
