import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  blogmanagements: [],
  addBlogmanagement: {},
  oneBlogmanagement: {},
  deleteStatus: false,
};

const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

const header = {
  'Content-Type': 'multipart/form-data',
  'x-access-token': accessToken,
};

const jsonheader = {
  'Content-Type': 'application/json',
  'x-access-token': accessToken,
};

const slice = createSlice({
  name: 'blogmanagement',
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
    getBlogmanagementsSuccess(state, action) {
      state.isLoading = false;
      state.blogmanagements = action.payload;
    },

    getBlogmanagementSuccess(state, action) {
      state.isLoading = false;
      state.oneBlogmanagement = action.payload;
    },

    postBlogmanagementsSuccess(state, action) {
      state.isLoading = false;
      state.addBlogmanagement = action.payload;
    },
    postBlogmanagementsImageSuccess(state, action) {
      state.isLoading = false;
      state.addBlogImagemanagement = action.payload;
    },
    deleteBlogmanagementSuccess(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },
  },
});

export default slice.reducer;

export function getBlogmanagements() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/blog/all', { headers: header });
      console.log("All BLogs",response);
      dispatch(slice.actions.getBlogmanagementsSuccess(response.data.blog));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postBlogDescImage(id, formData, toast) {
  console.log('imgUrl', formData);
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/blog/upload', formData, { headers: header });
      dispatch(slice.actions.postBlogmanagementsImageSuccess(response.data.image));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOneBlogmanagement(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/blog/one/' + id, { headers: header });
      dispatch(slice.actions.getBlogmanagementSuccess(response.data.blog));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postBlogmanagements(formData, toast, reset, push, setisLoading) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/blog/add', formData, { headers: header });
      if (response.data?.status == true) {
        setisLoading(false);
        toast.success(response.data?.message);
        reset()
        push('/dashboard/blogmanagement/');
      } else {
        setisLoading(false);
        toast.success(response.data?.message);
      }
    } catch (error) {
      setisLoading(false);
      toast.error(error?.message);
    }
  };
}

export function putBlogmanagements(id, formData, toast, reset, push, setisLoading) {
  return async () => {
    try {
      const response = await axios.put('/blog/update/' + id, formData, { headers: header });
      if (response.data?.status == true) {
        setisLoading(false);
        toast.success(response.data?.message);
        reset()
        push('/dashboard/blogmanagement/');
      } else {
        setisLoading(false);
        toast.success(response.data?.message);
      }
    } catch (error) {
      setisLoading(false);
      toast.error(error?.message);
    }
  };
}

export function deleteBlogmanagements(id, toast) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete('/blog/delete/' + id, { headers: header });
      dispatch(slice.actions.deleteBlogmanagementSuccess(response.data.status));
      toast.success(response.data?.message);
    } catch (error) {
      toast?.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}


