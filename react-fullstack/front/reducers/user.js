export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export const loginAction = {
  type: LOG_IN
};

const dummy = {
  nickname: "dongbeen",
  post: 0,
  following: 0,
  follower: 0,
  isLogin: true,
  images: [
    "http://rilly.co.kr/web/product/big/201906/e1ff138fe71a08399d094840fd39a686.jpg"
  ]
};

export const logoutAction = {
  type: LOG_OUT
};

const initState = {
  isLogin: false,
  user: {
    nickname: "dongbeen",
    post: 0,
    following: 0,
    follower: 0,
    isLogin: false,
    images: [
      "http://rilly.co.kr/web/product/big/201906/e1ff138fe71a08399d094840fd39a686.jpg"
    ]
  }
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLogin: true,
        user: dummy
      };
    case LOG_OUT:
      return {
        ...state,
        isLogin: false,
        user: null
      };
    default:
      return {
        ...state
      };
  }
};

export default reducer;
