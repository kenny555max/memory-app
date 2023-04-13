import { SIGNUP, SIGNIN, LOGOUT} from '../type';
import * as api from '../../api';

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData);
    
        dispatch({ type: SIGNUP, payload: data });

        navigate("/");
    } catch (error) {
        console.log(error.message);
    }
}

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signin(formData);

        dispatch({ type: SIGNIN, payload: data });

        navigate("/");
    } catch (error) {
        console.log(error.message);
    }
}

export const logout = (navigate) => (dispatch) => {
    dispatch({ type: LOGOUT });

    navigate('/auth');
}