import React, { useEffect, useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
} from "../reducers/post";
import { useRef } from "react";

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const { imagePaths, isAddingPost, postAdded } = useSelector((state) => {
    return state.post;
  });

  const imageInput = useRef();

  useEffect(() => {
    if (postAdded) {
      setText("");
    }
  }, [postAdded]);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      // 없으면 form event에서 페이지 reloading이 된다.
      const formData = new FormData();
      imagePaths.forEach((value, index) => {
        formData.append("image", value);
      });
      formData.append("content", text);
      if (!text || !text.trim()) {
        return alert("게시글을 작성해주세요.");
      }
      dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      });
    },
    [text, imagePaths]
  );

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      index,
    });
  });

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
          <input
            type="file"
            multiple
            hidden
            ref={imageInput}
            onChange={onChangeImages}
          />
          <Button onClick={onClickImageUpload}>이미지 업로드</Button>
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
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <div style={{ width: "300px" }}>
                <img
                  src={`http://localhost:3065/${value}`}
                  alt={value}
                  style={{ maxWidth: "100%" }}
                />
              </div>
              <Button onClick={onRemoveImage(index)}>제거</Button>
            </div>
          ))}
        </div>
      </Form>
    </div>
  );
};

export default PostForm;
