import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  allLaptoprepair: [],
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
  name: 'laptoprepair',
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

    // GET laptop repair
    getlaptoprepairSuccess(state, action) {
      state.isLoading = false;
      state.allLaptoprepair = action.payload;
    },

  },
});
export default slice.reducer;

// GET laptop repair
export function getlaptoprepair() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/laptoprepair/all', { headers: header });
      dispatch(slice.actions.getlaptoprepairSuccess(response.data.laptoprepair));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

