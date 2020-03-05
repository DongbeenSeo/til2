export const ADD_POST = "ADD_POST";
export const ADD_DUMMY = "ADD_DUMMY";

export const addPost = {
  type: ADD_POST
};

export const addDummy = {
  type: ADD_DUMMY,
  data: {
    content: "hello",
    userId: 1,
    user: {
      nickname: "dongbeen"
    },
    images: []
  }
};

const initState = {
  posts: [
    {
      createdAt: "2020-03-05",
      user: {
        id: 1,
        nickname: "dongbeen"
      },
      content: "first content",
      img:
        "http://rilly.co.kr/web/product/big/201906/e1ff138fe71a08399d094840fd39a686.jpg"
    }
  ]
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state
      };
    case ADD_DUMMY:
      return {
        ...state,
        posts: [action.data, ...state.posts]
      };
    default:
      return {
        ...state
      };
  }
};

export default reducer;
