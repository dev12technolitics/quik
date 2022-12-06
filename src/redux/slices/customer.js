import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  allCustomer: [],
  Addcustomer: {},
  oneCustomer: {},
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

    getoneCustomerSuccess(state, action) {
      state.isLoading = false;
      state.oneCustomer = action.payload;
    },

    // Add update customer
    postputcustomerSuccess(state, action) {
      state.isLoading = false;
      state.Addcustomer = action.payload;
    },

  },
});
export default slice.reducer;

// GET customer
export function getCustomer() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('//all', { headers: header });
      dispatch(slice.actions.getCustomerSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOneCustomer(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('//one/' + id, { headers: header });
      dispatch(slice.actions.getoneCustomerSuccess(response.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postCustomer(data, toast, push, reset, setisLoading) {
  return async () => {
    try {
      const response = await axios.post('//signup', data, { headers: header });
      console.log('response==', response);
      if (response.data?.status == true) {
        setisLoading(false);
        toast.success(response.data?.message);
        push('/dashboard/staff');
      } else {
        setisLoading(false);
        toast.error(response.data?.message);
      }
    } catch (error) {
      setisLoading(false);
      toast.error(error?.message);
    }
  };
}


export function putCustomer(id, data, toast, push, reset, setisLoading) {
  return async () => {
    try {
      const response = await axios.put('//update/' + id, data);
      if (response.data?.status == true) {
        setisLoading(false);
        toast.success(response.data?.message);
        push('/dashboard/staff');
      } else {
        setisLoading(false);
        toast.error(response.data?.message);
      }
    } catch (error) {
      setisLoading(false);
      toast.error(error?.message);
    }
  };
}
