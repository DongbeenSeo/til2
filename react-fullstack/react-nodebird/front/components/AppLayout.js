import React from 'react';
import { Menu, Input, Button, Row, Col, Card, Avatar } from 'antd';
import Link from 'next/link';
import propTypes from 'prop-types';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const dummy = {
  nickname: 'dongbeen',
  post: 0,
  following: 0,
  follower: 0,
  isLogin: false,
};

const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
      </Menu>
      <Button>
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </Button>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {dummy.isLogin ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: propTypes.node,
};

export default AppLayout;
