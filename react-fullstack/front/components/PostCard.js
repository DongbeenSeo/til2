import React, { useCallback, useEffect } from "react";
import { Card, Icon, Avatar, Form, List, Input, Button, Comment } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Link from "next/link";

import { ADD_COMMENT_REQUEST } from "../reducers/post";
import { dateFormat } from "../utils";

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { me } = useSelector((state) => state.user);
  const { commentAdded, isAddingComment } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
    // if(!commentFormOpened){
    //   dispatch
    // }
  }, []);

  const onSubmitComment = useCallback(
    (e) => {
      e.preventDefault();
      if (!me) {
        return alert("로그인이 필요합니다.");
      }
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          postId: post.id,
        },
      });
    },
    [me && me.id]
  );

  useEffect(() => {
    setCommentText("");
  }, [commentAdded === true]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  return (
    <div style={{ marginBottom: "10px" }}>
      <Card
        key={post.createdAt}
        cover={
          post.img && (
            <div
              style={{
                maxWidth: "300px",
                margin: "0 auto",
              }}>
              <img alt="ex" src={post.img} style={{ maxWidth: "100%" }} />
            </div>
          )
        }
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon type="heart" key="heart" />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Icon type="ellipsis" key="ellipsis" />,
        ]}>
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={
            <span>
              {post.User.nickname}&nbsp;
              <span style={{ fontSize: 12 }}>{dateFormat(post.createdAt)}</span>
            </span>
          }
          description={
            // 게시글의 hashtag를 a tag가 아니라 next의 Link로
            <div>
              {post.content.split(/(#[^\s]+)/g).map((v) => {
                if (v.match(/#[^\s]+/)) {
                  return (
                    <Link key={v} href="/hashtag">
                      <a>{v}</a>
                    </Link>
                  );
                }
                return v;
              })}
            </div>
          }
        />
      </Card>
      {commentFormOpened && (
        <>
          <Form onSubmit={onSubmitComment}>
            <Form.Item>
              <Input.TextArea
                placeholder="please input comment"
                row={4}
                value={commentText}
                onChange={onChangeCommentText}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isAddingComment}>
              Send
            </Button>
          </Form>
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  datetime={item.createdAt}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </div>
  );
};

export default PostCard;
