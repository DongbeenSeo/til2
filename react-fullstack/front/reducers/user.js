export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const SIGN_UP = 'SIGN_UP';

export const loginAction = {
  type: LOG_IN,
};

export const logoutAction = {
  type: LOG_OUT,
};

export const signupAction = data => {
  return {
    type: SIGN_UP,
    data: data,
  };
};

const initState = {
  isLogin: false,
  user: {
    nickname: 'dongbeen',
    post: 0,
    following: 0,
    follower: 0,
    images: [
      'http://rilly.co.kr/web/product/big/201906/e1ff138fe71a08399d094840fd39a686.jpg',
    ],
  },
};

const dummy = {
  nickname: 'dongbeen',
  post: 0,
  following: 0,
  follower: 0,
  images: [
    'http://rilly.co.kr/web/product/big/201906/e1ff138fe71a08399d094840fd39a686.jpg',
  ],
  signUpData: {},
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLogin: true,
        user: dummy,
      };
    case LOG_OUT:
      return {
        ...state,
        isLogin: false,
        user: null,
      };
    case SIGN_UP:
      return {
        ...state,
        signUpData: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
