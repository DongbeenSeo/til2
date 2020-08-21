import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { EDIT_NICKNAME_REQUEST } from "../reducers/user";

const NickNameEditForm = () => {
  const [editedName, setEditedName] = useState("");
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  const { mainPosts, isEditingNickname } = useSelector((state) => state.post);

  const onChangeNickname = useCallback((e) => {
    setEditedName(e.target.value);
  }, []);

  const onEditNickname = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: EDIT_NICKNAME_REQUEST,
        data: editedName,
      });
    },
    [editedName]
  );

  useEffect(() => {
    if (me) {
      setEditedName(me.nickname);
    }
  }, []);

  return (
    <div>
      <Form
        onSubmit={onEditNickname}
        style={{
          marginBottom: 20,
          border: "1px solid #d9d9d9",
          padding: 20,
        }}>
        <Input
          addonBefore="닉네임"
          value={editedName}
          onChange={onChangeNickname}
        />
        <Button type="primary" htmlType="submit" loading={isEditingNickname}>
          수정
        </Button>
      </Form>
    </div>
  );
};

export default NickNameEditForm;
