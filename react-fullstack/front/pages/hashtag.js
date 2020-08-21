import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HASHTAG_POSTS_REQUEST } from "../reducers/post";
import PostCard from "../components/PostCard";

function Hashtag({ tag }) {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: tag,
    });
  }, []);
  return (
    <div>
      {mainPosts.map((value, index) => (
        <PostCard key={index} post={value} />
      ))}
    </div>
  );
}

/**
 * next에서 넣어준 최초의 lifeCycle
 * componentDidMount보다 먼저 실행된다.
 * front와 server에서 모두 실행된다.
 */
Hashtag.getInitialProps = async (context) => {
  return { tag: context.query.tag };
};

export default Hashtag;
