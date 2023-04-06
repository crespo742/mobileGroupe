import { SIGNUP_SUCCESS, SIGNUP_ERROR } from '../constants/actionTypes';

const initialState = {
  email: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        email: action.email,
        error: null
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        email: null,
        error: action.error
      };
    default:
      return state;
  }
};

export default authReducer;
