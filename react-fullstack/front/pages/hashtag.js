import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

function Hashtag({ tag }) {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);

  const onScroll = useCallback(() => {
    /**
     * window.scrollY : 스크롤 내린 거리
     * document.documentElement.clientHeight : 화면 높이
     * document.documentElement.scrollHeight : 전체 화면 높이
     */
    console.log(
      window.scrollY,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight
    );
    if (
      window.scrollY !== 0 &&
      window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 100
    ) {
      if (hasMorePost) {
        dispatch({
          type: LOAD_HASHTAG_POSTS_REQUEST,
          lastId: mainPosts[mainPosts.length - 1].id,
          data: tag,
        });
      }
    }
  }, [hasMorePost, mainPosts.length]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]);

  return (
    <div>
      {mainPosts.map((value, index) => (
        <PostCard key={index.toString()} post={value} />
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
  const { tag } = context.query;
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: tag,
    lastId: 0,
  });
  return { tag: context.query.tag };
};

export default Hashtag;
