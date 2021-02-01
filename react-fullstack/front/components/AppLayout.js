import React, { useEffect } from "react";
import { Menu, Input, Button, Row, Col, Card, Avatar } from "antd";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import styled from "styled-components";

import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSearch = (value) => {
    /**
     * 동적 라우팅
     * 내부적으로는 /hashtag
     * 외부적으로는 /hashtag/%s
     */
    Router.push(
      { pathname: "/hashtag", query: { tag: value } },
      `/hashtag/${value}`
    );
  };

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile" prefetch>
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Input.Search
            enterButton
            onSearch={onSearch}
            style={{ verticalAlign: "middle" }}
          />
        </Menu.Item>
      </Menu>
      {/* <Button>
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </Button> */}
      <Row gutter={8}>
        <Col xs={24} md={8}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12} style={{ padding: 10 }}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
