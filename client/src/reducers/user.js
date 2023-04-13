import { SIGNUP, SIGNIN, LOGOUT } from "../actions/type";


const initialState = {
  user: {}
}

export function reducer (state = initialState, action) {
  switch (action.type) {
    case SIGNUP:
        localStorage.setItem('profile', JSON.stringify(action.payload));
        return { ...state, user: action.payload }
    case SIGNIN:
        localStorage.setItem('profile', JSON.stringify(action.payload));
        return { ...state, user: action.payload }
    case LOGOUT:
        localStorage.clear('profile');
        return { ...state, user: {} }
    default:
      return state;
  }
}

export default reducer;