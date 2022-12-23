import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  allPcRepair: [],
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
  name: 'pcrepair',
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

    // GET pc repair
    getPcrepairSuccess(state, action) {
      state.isLoading = false;
      state.allPcRepair = action.payload;
    },

  },
});
export default slice.reducer;

// GET pc repair
export function getPcrepair() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/pcrepair/all', { headers: header });
      dispatch(slice.actions.getPcrepairSuccess(response.data.pcrepair));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

