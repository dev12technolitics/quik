import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  allCustomer: []
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
  name: 'customer',
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

    // GET customer
    getCustomerSuccess(state, action) {
      state.isLoading = false;
      state.allCustomer = action.payload;
    },

   

  },
});
export default slice.reducer;

// GET customer
export function getCustomer() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/customer/all', { headers: jsonheader });
      dispatch(slice.actions.getCustomerSuccess(response.data.customer));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}