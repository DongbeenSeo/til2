import React, { useState, useCallback, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";

const CommentForm = ({ post }) => {
  const [commentText, setCommentText] = useState("");

  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { commentAdded, isAddingComment } = useSelector((state) => state.post);

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
          comment: commentText
        }
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

  return (
    <Form onSubmit={onSubmitComment} style={{ marginTop: "10px" }}>
      <Form.Item>
        <Input.TextArea
          placeholder='please input comment'
          row={4}
          value={commentText}
          onChange={onChangeCommentText}
        />
      </Form.Item>
      <Button type='primary' htmlType='submit' loading={isAddingComment}>
        Send
      </Button>
    </Form>
  );
};

export default CommentForm;
