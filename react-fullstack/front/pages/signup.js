import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import { SIGN_UP_REQUEST } from '../reducers/user';

export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback(e => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const signup = () => {
  // const [id, setId] = useState('');
  // const [nick, setNick] = useState('');
  // const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);

  //custom hook

  const [id, onChangeId] = useInput('');
  const [nick, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const dispatch = useDispatch();

  const { isSigningUp, me } = useSelector(state => state.user);

  useEffect(() => {
    if (me) {
      alert('메인으로 이동');
      Router.push('/');
    }
  }, [me && me.id]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      //webpack에 console.log없애는 설정이 있음
      if (!term) {
        setTermError(true);
      }
      return dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          id,
          password,
          nick,
        },
      });
    },
    [password, passwordCheck, term]
  );

  // const onChangeId = e => {
  //   setId(e.target.value);
  // };

  // const onChangeNickname = e => {
  //   setNick(e.target.value);
  // };

  // const onChangePassword = e => {
  //   setPasswordRequired(false);
  //   setPassword(e.target.value);
  // };

  const onChangePasswordCheck = useCallback(
    e => {
      if (password === '') {
        setPasswordRequired(true);
      } else {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
      }
    },
    [password]
  );

  const onChangeTerm = useCallback(e => {
    setTermError(!e.target.checked);
    setTerm(e.target.checked);
  }, []);

  return (
    <div style={{ padding: 10 }}>
      <div style={{ fontSize: 18, fontWeight: 'bold' }}>회원가입</div>
      <Form onSubmit={onSubmit}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input
            name="user-id"
            required={true}
            value={id}
            onChange={onChangeId}
          />
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <br />
          <Input
            name="nickname"
            required={true}
            value={nick}
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            type="password"
            name="user-password"
            required={true}
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-passwordCheck">비밀번호체크</label>
          <br />
          <Input
            type="password"
            name="user-passwordCheck"
            required={true}
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
        </div>{' '}
        {passwordError && (
          <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>
        )}
        {passwordRequired && (
          <div style={{ color: 'red' }}>비밀번호를 먼저 입력해주세요.</div>
        )}
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            약관동의
          </Checkbox>
          {termError && (
            <div style={{ marginTop: 10, color: 'red' }}>
              약관에 동의해주세요
            </div>
          )}
        </div>
        <div>
          <Button type="primary" htmlType="submit" loading={isSigningUp}>
            가입하기
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default signup;
