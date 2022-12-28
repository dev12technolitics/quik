import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  allMobileRepair: [],
  oneMobilerepair: {},
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
  name: 'mobilerepair',
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

    // GET mobile repair
    getMobilerepairSuccess(state, action) {
      state.isLoading = false;
      state.allMobileRepair = action.payload;
    },

    getOneMobilerepairSuccess(state, action) {
      state.isLoading = false;
      state.oneMobilerepair = action.payload;
    },

  },
});
export default slice.reducer;

// GET mobile repair
export function getMobilerepair() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/mobilerepair/all', { headers: header });
      dispatch(slice.actions.getMobilerepairSuccess(response.data.mobilerepair));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOneMobilerepair(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/mobilerepair/one/' + id, { headers: header });
      dispatch(slice.actions.getOneMobilerepairSuccess(response.data.mobilestatus));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function putpickup(id, payload, toast, push, reset, setisLoading) {
  return async () => {
    try {
      const response = await axios.put('/mobilerepair/updatestatus/' + id, payload, { headers: jsonheader });

      setisLoading(false);
      toast.success(response.data?.message);
      reset()
      push('/dashboard/mobilerepair/');

    } catch (error) {
      setisLoading(false);
      toast.error(error?.message);
    }
  };
}