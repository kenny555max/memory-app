import { CREATE_POST, EDIT_POST, FETCH_POSTS, DELETE_POST, FETCH_POST, GET_POST } from "../actions/type";


const initialState = {
  posts: [],
  post: {},
  totalNumberOfPages: '',
  currentPage: ''
}

export function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_POST:
      return { ...state, posts: action.payload.data, totalNumberOfPages: action.payload.totalNumberOfPages, currentPage: action.payload.currentPage };
    case FETCH_POSTS:
      return { ...state, posts: action.payload };
    case GET_POST:
      return { ...state, post: action.payload }
    case CREATE_POST:
      return { ...state, post: action.payload }
    case EDIT_POST:
      return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) }
    case DELETE_POST:
      return { ...state, posts: state.posts.filter(post => post._id !== action.payload._id ) }
    default:
      return state;
  }
}

export default reducer;