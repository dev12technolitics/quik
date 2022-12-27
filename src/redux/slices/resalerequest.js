import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  allResaleRequest: [], 
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
  name: 'resalerequest',
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

   // get Resale Request
    getResaleRequestSuccess(state, action) {
      state.isLoading = false;
      state.allResaleRequest = action.payload;
    },

  },
});
export default slice.reducer;

// get Resale Request
export function getResaleRequest() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/resalerrequest/all', { headers: header });
      dispatch(slice.actions.getResaleRequestSuccess(response.data.resalerrequests));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

