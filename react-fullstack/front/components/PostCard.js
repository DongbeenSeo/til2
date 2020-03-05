import React from "react";
import { Card, Icon, Avatar } from "antd";
import { useSelector } from "react-redux";

const dummy = {
  isLogin: true,
  images: [],
  posts: [
    {
      createdAt: "2020-03-05",
      User: {
        id: 1,
        nickname: "dongbeen"
      },
      content: "first content",
      img:
        "http://rilly.co.kr/web/product/big/201906/e1ff138fe71a08399d094840fd39a686.jpg"
    }
  ]
};

const PostCard = ({ post }) => {
  return (
    <div>
      <Card
        key={post.createdAt}
        cover={
          post.img && (
            <div
              style={{
                maxWidth: "300px",
                margin: "0 auto"
              }}>
              <img alt="ex" src={post.img} style={{ maxWidth: "100%" }} />
            </div>
          )
        }
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon type="heart" key="heart" />,
          <Icon type="message" key="message" />,
          <Icon type="ellipsis" key="ellipsis" />
        ]}>
        <Card.Meta
          avatar={<Avatar>{post.user.nickname[0]}</Avatar>}
          title={post.user.nickname}
          description={post.content}
        />
      </Card>
    </div>
  );
};

export default PostCard;
