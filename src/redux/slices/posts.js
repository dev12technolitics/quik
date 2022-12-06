import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  posts: [],
  addposts: {},
  oneposts: {},
  deleteStatus: false
};

const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

const header = {
  'Content-Type': 'multipart/form-data',
};

const slice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET BANNER
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },

    //GET BANNER
    getOnepostsSuccess(state, action) {
      state.isLoading = false;
      state.oneposts = action.payload;
    },

    //ADD BANNER
    postaddpostsSuccess(state, action) {
      state.isLoading = false;
      state.addposts = action.payload;
    },
    //DELETE BANNER
    deletePostsSuccess(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },
   
  },
});

export default slice.reducer;


export function getPostsAll() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/notification/all');
      dispatch(slice.actions.getPostsSuccess(response.data.notifications));
      console.log("Response",response);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOnePosts(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/notification/one/' + id);
      dispatch(slice.actions.getOnepostsSuccess(response.data.notification));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postPosts(formData, toast, push, reset) { 
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/notification/add', formData, { headers: header });
      dispatch(slice.actions.postaddpostsSuccess(response.data.notification));
      toast.success(response.data?.message)
      if(response.data.status == true){
        reset()
        push('/dashboard/notification')
      }
    } catch (error) {
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function putPosts(id, formData, toast, push, reset) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/notification/update/' + id, formData, { headers: header });
      dispatch(slice.actions.postaddpostsSuccess(response.data.notification));
      toast.success(response.data?.message)
      if(response.data.status == true){
        reset()
        push('/dashboard/notification')
      }
    } catch (error) {
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}



export function deletePosts(id, toast) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete('/notification/delete/' + id, { headers: header });
      dispatch(slice.actions.deletePostsSuccess(response.data.status));
      toast.success(response.data?.message)
    } catch (error) {
      toast?.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}
