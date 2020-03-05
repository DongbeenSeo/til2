import React from 'react';
import { Card, Icon, Avatar } from 'antd';

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

const PostCard = () => {
  return (
    <div>
      <Card
        key={p.createdAt}
        cover={p.img && <img alt="ex" src={p.img} />}
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon type="heart" key="heart" />,
          <Icon type="message" key="message" />,
          <Icon type="ellipsis" key="ellipsis" />,
        ]}>
        <Card.Meta
          avatar={<Avatar>{p.User.nickname[0]}</Avatar>}
          title={p.User.nickname}
          description={p.content}
        />
      </Card>
    </div>
  );
};

export default PostCard;
