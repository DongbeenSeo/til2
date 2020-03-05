import React from "react";
import { Menu, Input, Button, Row, Col, Card, Avatar } from "antd";
import Link from "next/link";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import { useSelector } from "react-redux";

const AppLayout = ({ children }) => {
  const { user } = useSelector(state => state.user);
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
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
      </Menu>
      {/* <Button>
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </Button> */}
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {user.isLogin ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={6}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;