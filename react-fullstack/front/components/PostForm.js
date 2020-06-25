import React, { useEffect, useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ADD_POST_REQUEST } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const { imagePaths, isAddingPost, postAdded } = useSelector((state) => {
    return state.posts;
  });

  useEffect(() => {
    if (postAdded) {
      setText("");
    }
  }, [postAdded]);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      // 없으면 form에서 페이지 reloading이 된다.
      if (!text || !text.trim()) {
        return alert("게시글을 작성해주세요.");
      }
      console.log(`onSubmit Post: ${text}`);
      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          content: text.trim(),
        },
      });
    },
    [text]
  );

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  return (
    <div>
      <Form
        encType="multipart/form-data"
        style={{ marginBottom: 20 }}
        onSubmit={onSubmitForm}>
        <Input.TextArea
          maxLength={140}
          placeholder="please input content"
          value={text}
          onChange={onChangeText}
        />
        <div>
          <Input type="file" multiple hidden />
          <Button>이미지 업로드</Button>
          <Button
            type="primary"
            style={{ float: "right" }}
            htmlType="submit"
            loading={isAddingPost}>
            생성
          </Button>
        </div>
        <div>
          {imagePaths.map((value, index) => (
            <div
              key={index}
              style={{
                maxWidth: "300px",
                margin: "0 auto",
              }}>
              <img src={value} alt={value} style={{ maxWidth: "100%" }} />
              <Button>제거</Button>
            </div>
          ))}
        </div>
      </Form>
    </div>
  );
};

export default PostForm;
