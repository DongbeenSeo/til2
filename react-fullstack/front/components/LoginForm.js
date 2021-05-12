import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useInput } from "../pages/signup";
import { LOG_IN_REQUEST } from "../reducers/user";

const LoginError = styled.div`
  margin-top: 10px;
  color: red;
`;

const LoginForm = () => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  const { isLoggingIn, logInErrorReason } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          userId: id,
          password
        }
      });
    },
    [id, password]
  );
  return (
    <div>
      <Form onSubmit={onSubmit} style={{ padding: 10 }}>
        <div>
          <label htmlFor="id">
            아이디
            <br />
            <Input
              id="id"
              name="id"
              required
              value={id}
              onChange={onChangeId}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            비밀번호
            <br />
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={onChangePassword}
            />
          </label>
        </div>
        {logInErrorReason && (
          <LoginError>
            <span>{logInErrorReason.response.data}</span>
          </LoginError>
        )}
        <div style={{ marginTop: "10px" }}>
          <Button type="primary" htmlType="submit" loading={isLoggingIn}>
            로그인
          </Button>
          <Link href="/signup">
            <Button>회원가입</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
