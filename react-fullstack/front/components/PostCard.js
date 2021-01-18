import React, { useCallback, useEffect } from "react";
import {
  Card,
  Icon,
  Avatar,
  Form,
  List,
  Input,
  Button,
  Comment,
  Popover,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Link from "next/link";

import {
  ADD_COMMENT_REQUEST,
  LOAD_COMMENTS_REQUEST,
  UNLIKE_POST_REQUEST,
  LIKE_POST_REQUEST,
  RETWEET_REQUEST,
  REMOVE_POST_REQUEST,
} from "../reducers/post";
import { dateFormat } from "../utils";
import PostImages from "./PostImages";
import PostCardContent from "./PostCardContent";
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from "../reducers/user";

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState("");

  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  const { commentAdded, isAddingComment } = useSelector((state) => state.post);

  const liked = me && post.Likers && post.Likers.find((v) => v.id === me.id);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: post.id,
      });
    }
  }, []);

  const onSubmitComment = useCallback(
    (e) => {
      e.preventDefault();
      if (!me) {
        return alert("로그인이 필요합니다.");
      }
      // console.log(`commentText: ${commentText}`);
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          postId: post.id,
          comment: commentText,
        },
      });
    },
    [me && me.id, commentText]
  );

  useEffect(() => {
    setCommentText("");
  }, [commentAdded === true]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  const onToggleLike = useCallback(() => {
    if (!me) {
      return alert("로그인이 필요합니다!");
    }
    if (liked) {
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id,
      });
    } else {
      //좋아요를 안 누른 상태
      dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id,
      });
    }
  }, [me && me.id, post && post.id, liked]);

  const onRetweet = useCallback(() => {
    if (!me) {
      return alert("로그인이 필요합니다!");
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [me && me.id, post && post.id]);

  const onFollow = useCallback(
    (userId) => () => {
      dispatch({
        type: FOLLOW_USER_REQUEST,
        data: userId,
      });
    },
    []
  );

  const onUnFollow = useCallback(
    (userId) => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId,
      });
    },
    []
  );

  const onRemovePost = useCallback(
    (userId) => () => {
      console.log(`remove userId: ${userId}`);
      dispatch({
        type: REMOVE_POST_REQUEST,
        data: userId,
      });
    },
    []
  );

  return (
    <div style={{ marginBottom: "10px" }}>
      <Card
        key={post.createdAt}
        cover={
          post.Images && post.Images[0] && <PostImages images={post.Images} />
        }
        actions={[
          <Icon type="retweet" key="retweet" onClick={onRetweet} />,
          <Icon
            type="heart"
            key="heart"
            theme={liked ? "twoTone" : "outlined"}
            twoToneColor="#eb2f96"
            onClick={onToggleLike}
          />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {me && post.UserId === me.id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" onClick={onRemovePost(post.id)}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }>
            <Icon type="ellipsis" key="ellipsis" />
          </Popover>,
        ]}
        extra={
          !me || post.User.id === me.id ? null : me.Followings &&
            me.Followings.find((v) => v.id === post.User.id) ? (
            <Button onClick={onUnFollow(post.User.id)}>UnFollow</Button>
          ) : (
            <Button onClick={onFollow(post.User.id)}>Follow</Button>
          )
        }
        title={
          post.RetweetId ? `${post.User.nickname} 님이 리트윗하셨습니다.` : null
        }>
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images &&
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }>
            <Card.Meta
              avatar={
                <Link
                  href={{
                    pathname: "/user",
                    query: { id: post.Retweet.User.id },
                  }}
                  as={`/user/${post.Retweet.User.id}`}>
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={
                <span>
                  {post.Retweet.User.nickname}&nbsp;
                  <span style={{ fontSize: 12 }}>
                    {dateFormat(post.Retweet.createdAt)}
                  </span>
                </span>
              }
              description={<PostCardContent post={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={
              <Link
                // href={`/user/${post.User.id}`} 해당 url은 서버주소이기 때문에 화면 re-rendering이 발생하기 때문에 front주소로 바꿔야한다.
                href={{ pathname: "/user", query: { id: post.User.id } }}
                as={`/user/${post.User.id}`}>
                <a>
                  <Avatar>{post.User.nickname[0]}</Avatar>
                </a>
              </Link>
            }
            title={
              <span>
                {post.User.nickname}&nbsp;
                <span style={{ fontSize: 12 }}>
                  {dateFormat(post.createdAt)}
                </span>
              </span>
            }
            description={<PostCardContent post={post.content} />}
          />
        )}
      </Card>
      {commentFormOpened && (
        <>
          <Form onSubmit={onSubmitComment} style={{ marginTop: "10px" }}>
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
                  avatar={
                    <Link
                      href={{
                        pathname: "/user",
                        query: { id: item.User.id },
                      }}
                      as={`/user/${item.User.id}`}>
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  datetime={dateFormat(item.createdAt)}
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
