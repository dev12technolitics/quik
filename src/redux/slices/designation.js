import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  designations: [],
  adddesignation: {},
  onedesignation: {},
};

const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

const header = {
  'Content-Type': 'multipart/form-data',

};

const jsonheader = {
  'Content-Type': 'application/json',

};


const slice = createSlice({
  name: 'designation',
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

    // GET designation
    getDesignationsSuccess(state, action) {
      state.isLoading = false;
      state.designations = action.payload;
    },

    //GET district
    getoneDesignationSuccess(state, action) {
      state.isLoading = false;
      state.onedesignation = action.payload;
    },

    //ADD district
    postdesignationSuccess(state, action) {
      state.isLoading = false;
      state.adddesignation = action.payload;
    },
   
  },
});

export default slice.reducer;


export function getDesignationAll() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/designation/all');
      dispatch(slice.actions.getDesignationsSuccess(response.data.designation));
      console.log("GET all Response",response)
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};

export function getOneDesignation(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/designation/one/' + id);
      dispatch(slice.actions.getoneDesignationSuccess(response.data.designation));
      // console.log("Get one Response",response);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    };
  };
};

export function postdesignation(formData, toast, push, reset) { 
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/designation/add', formData);
      console.log("Response all added:",response);
      dispatch(slice.actions.postdesignationSuccess(response.department));
      toast.success(response.data?.message)
      if(response.data.status == true){
        reset()
        push('/dashboard/designation')
      }
    } catch (error) {
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function putdesignation(id, formData, toast, push, reset) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/designation/update/' + id, formData);
      dispatch(slice.actions.postdesignationSuccess(response.data.department));
      toast.success(response.data?.message)
      if(response.data.status == true){
        reset()
        push('/dashboard/designation')
      }
    } catch (error) {
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}

