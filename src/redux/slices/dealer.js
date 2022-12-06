import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  allDealer: [],
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
  name: 'dealer',
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

    // GET Dealer 
    getDealerSuccess(state, action) {
      state.isLoading = false;
      state.allDealer = action.payload;
    },

  },
});
export default slice.reducer;

// GET Dealer 
export function getDealer() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('//all', { headers: header });
      dispatch(slice.actions.getDealerSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

