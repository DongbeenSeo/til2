import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { connect, useDispatch, useSelector } from 'react-redux';
import { LOG_IN, LOG_OUT, loginAction, logoutAction } from '../reducers/user';

// { dispatch, isLogin, user, login, logout }
const Home = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(loginAction("dongbeen3"));
  //   dispatch(logoutAction);
  //   // });
  // }, []);
  //input: dependensy parameter에 아무것도 넣지 않으면 componentDidMount와 같다
  const { isLogin, user } = useSelector(state => state.user);
  const { posts } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch({
      type: 'HELLO_SAGA',
    });
  }, []);

  // hooks없이 store와 connect하는 code
  // const { user, isLogin } = props;
  return (
    <div style={{ padding: 10 }}>
      {
        <div>
          {isLogin ? `Login Success ${user.nickname}!` : 'please Log In'}
        </div>
      }
      {isLogin && <PostForm />}
      {posts && posts.map((p, index) => <PostCard key={index} post={p} />)}
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

export default Home;
// connect(mapStateToProps, mapDispatchToProps)();
