import React, { useCallback, useEffect } from "react";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { connect, useDispatch, useSelector } from "react-redux";
import { LOG_IN, LOG_OUT, loginAction, logoutAction } from "../reducers/user";
import { LOAD_MAIN_POSTS_REQUEST } from "../reducers/post";

// { dispatch, isLogin, user, login, logout }
const Home = () => {
  const { me, user } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const onScroll = useCallback(() => {
    /**
     * window.scrollY : 스크롤 내린 거리
     * document.documentElement.clientHeight : 화면 높이
     * document.documentElement.scrollHeight : 전체 화면 높이
     */
    if (
      hasMorePost &&
      window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 100
    ) {
      dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
        lastId: mainPosts[mainPosts.length - 1].id,
      });
    }
  }, [hasMorePost, mainPosts.length]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts.length]);
  //input: dependensy parameter에 아무것도 넣지 않으면 componentDidMount와 같다

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_MAIN_POSTS_REQUEST,
  //   });
  // }, []);

  // useEffect(() => {
  // dispatch({
  //   type: "HELLO_SAGA"
  // });
  // }, []);

  // hooks없이 store와 connect하는 code
  // const { user, isLoggedIn } = props;
  return (
    <div>
      {me && <PostForm />}
      {mainPosts.map((p, index) => (
        <PostCard key={index} post={p} />
      ))}
    </div>
  );
};

// function mapStateToProps(state) {
//   return {
//     user: state.user,
//     isLogin: state.isLogin
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     login: nick => dispatch(loginAction(nick)),
//     logout: () => dispatch(logoutAction)
//   };
// }

/**
 * context 객체 안에 store라는 객체가 있고 그 안에 dispatch함수가 있다.
 * store: {
    dispatch: [Function (anonymous)],
    subscribe: [Function: subscribe],
    getState: [Function: getState],
    replaceReducer: [Function: replaceReducer],
    [Symbol(observable)]: [Function: observable]
   }
 */
Home.getInitialProps = async (context) => {
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};

export default Home;
// connect(mapStateToProps, mapDispatchToProps)();
