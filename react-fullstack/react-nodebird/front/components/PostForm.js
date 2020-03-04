import React from 'react';
import { Form, Input, Button } from 'antd';

const dummy = {
  isLogin: true,
  images: [],
  posts: [
    {
      createdAt: '2020-03-05',
      User: {
        id: 1,
        nickname: 'dongbeen',
      },
      content: 'first content',
      img:
        'http://rilly.co.kr/web/product/big/201906/e1ff138fe71a08399d094840fd39a686.jpg',
    },
  ],
};

const PostForm = () => {
  return (
    <div>
      <Form encType="multipart/form-data" style={{ margin: '10px 0 20px' }}>
        <Input.TextArea maxLength={140} placeholder="please input content" />
        <div>
          <Input type="file" multiple hidden />
          <Button>이미지 업로드</Button>
          <Button type="primary" style={{ float: 'right' }} htmlType="submit">
            생성
          </Button>
        </div>
        <div>
          {dummy.images.map((value, index) => {
            return (
              <div key={index} style={{ display: 'inline-block' }}>
                <img src={value.path} alt={value} />
                <Button>제거</Button>
              </div>
            );
          })}
        </div>
      </Form>
    </div>
  );
};

export default PostForm;
