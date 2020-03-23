import React from "react";
import { Card, Icon, Avatar } from "antd";
import { useSelector } from "react-redux";

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
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={
            <span>
              {post.User.nickname}&nbsp;
              {/* <span style={{ fontSize: 12 }}>{post.createdAt}</span> */}
            </span>
          }
          description={post.content}
        />
      </Card>
    </div>
  );
};

export default PostCard;
