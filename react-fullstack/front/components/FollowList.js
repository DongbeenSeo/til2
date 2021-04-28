import React, { memo } from "react";
import { List, Button, Card, Icon } from "antd";

const FollowList = memo(
  ({ header, hasMore, data, onClickMore, onClickStop }) => {
    return (
      <>
        <List
          style={{ marginBottom: 20 }}
          grid={{ gutter: 4, xs: 2, md: 3 }}
          size='small'
          header={<div>{header}</div>}
          loadMore={
            hasMore && (
              <Button style={{ width: "100%" }} onClick={onClickMore}>
                더 보기
              </Button>
            )
          }
          dataSource={data}
          renderItem={(item) => (
            <List.Item style={{ marginTop: 20 }}>
              <Card
                actions={[
                  <Icon key='stop' type='stop' onClick={onClickStop(item.id)} />
                ]}>
                <Card.Meta description={item.nickname} />
              </Card>
            </List.Item>
          )}
        />
      </>
    );
  }
);

export default FollowList;
