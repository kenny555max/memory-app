import * as api from '../api';
import { FETCH_POSTS, CREATE_POST, EDIT_POST, DELETE_POST, FETCH_POST, GET_POST } from './type';

export const fetchPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        
        dispatch({ type: FETCH_POSTS, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchPost = (page) => async (dispatch) => {
    try {
        const { data } = await api.fetchPost(page);
        dispatch({ type: FETCH_POST, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        const { data } = await api.getPost(id);
        console.log(data);
        dispatch({ type: GET_POST, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchPostsBySearch = (searchParams) => async (dispatch) => {
    console.log(searchParams)
    try {
        const { data } = await api.fetchPostsBySearch(searchParams);
        console.log(data);
        dispatch({ type: FETCH_POSTS, payload: data });

        // return data;
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (values) => async (dispatch) => {
    try {
        const { data } = await api.createPost(values);
        
        dispatch({ type: CREATE_POST, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const editPosts = (id, values) => async (dispatch) => {
    try {
        const { data } = await api.editPosts(id, values);

        dispatch({ type: EDIT_POST, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        
        dispatch({ type: DELETE_POST, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        
        dispatch({ type: EDIT_POST, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}