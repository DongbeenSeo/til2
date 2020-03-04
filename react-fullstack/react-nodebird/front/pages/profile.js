import React from 'react';
import { Button, List, Card, Icon } from 'antd';
import NickNameEditForm from '../components/NickNameEditForm';

const profile = () => {
  return (
    <>
      <NickNameEditForm />
      <List
        style={{ marginBottom: 20 }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
        dataSource={['dongbeen', 'dongbeen2', 'dongbeen3']}
        renderItem={item => (
          <List.Item style={{ marginTop: 20 }}>
            <Card actions={[<Icon type="stop" />]}>
              <Card.Meta description={item} />
            </Card>
          </List.Item>
        )}
      />
      <List
        style={{ marginBottom: 20 }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
        dataSource={['dongbeen', 'dongbeen2', 'dongbeen3']}
        renderItem={item => (
          <List.Item style={{ marginTop: 20 }}>
            <Card actions={[<Icon type="stop" />]}>
              <Card.Meta description={item} />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default profile;
