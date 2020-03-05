import React from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const dummy = {
  isLogin: true,
  images: [],
  posts: [
    {
      createdAt: '2020-03-05',
      User: {
        id: 1,
        nickname: 'dongbeen',
      },
      content: 'first content',
      img:
        'http://rilly.co.kr/web/product/big/201906/e1ff138fe71a08399d094840fd39a686.jpg',
    },
  ],
};

const Home = () => {
  return (
    <>
      {dummy.isLogin && <PostForm />}
      {dummy.posts.map(p => (
        <PostCard />
      ))}
    </>
  );
};

export default Home;
