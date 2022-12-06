import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  allstaff: [],
  deleteStatus: false,
  Addstaffs: {},
  onestaff: {},
  addForgetpassword: {},
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
  name: 'staff',
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

    // GET staff
    getstaffSuccess(state, action) {
      state.isLoading = false;
      state.allstaff = action.payload;
    },

    getonestaffSuccess(state, action) {
      state.isLoading = false;
      state.onestaff = action.payload;
    },

    // Add update staff
    poststaffdataSuccess(state, action) {
      state.isLoading = false;
      state.Addstaffs = action.payload;
    },

    // delete staff
    deletestaffSuccess(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },

    // Forgetpassword
    postForgetpasswordSuccess(state, action) {
      state.isLoading = false;
      state.addForgetpassword = action.payload;
    },

  },
});
export default slice.reducer;

// GET staff
export function getstaff() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/adminuser/all', { headers: header });
      dispatch(slice.actions.getstaffSuccess(response.data.adminusers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOnestaff(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/adminuser/one/' + id, { headers: header });
      dispatch(slice.actions.getonestaffSuccess(response.data.adminuser));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function poststaff(formData, toast, push, reset, setIsLoading) {
  return async () => {
    try {
      const response = await axios.post('/adminuser/signup', formData, { headers: header });
      console.log('response==', response);
      if (response.data?.status == true) {
        setIsLoading(false);
        toast.success(response.data?.message);
        push('/dashboard/staff');
      } else {
        setIsLoading(false);
        toast.error(response.data?.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };
}


export function putstaff(id, formData, toast, push, reset, setIsLoading) {
  return async () => {
    try {
      const response = await axios.put('/adminuser/update/' + id, formData);
      if (response.data?.status == true) {
        setIsLoading(false);
        toast.success(response.data?.message);
        push('/dashboard/staff');
      } else {
        setIsLoading(false);
        toast.error(response.data?.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };
}

// delete staff
export function deletestaff(id, toast) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete('/adminuser/delete/' + id, { headers: header });
      dispatch(slice.actions.deletestaffSuccess(response.data.status));
      toast.success(response.data?.message);
    } catch (error) {
      toast.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// uodate password
export function postForgetpassword(id, data, toast, push, setIsLoading) {
  console.log("data@", data)
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/adminuser/updatepassword/' + id, data, { headers: jsonheader });
      dispatch(slice.actions.postForgetpasswordSuccess(response.data));
      toast.success(response.data?.message)
      if (response.data.status == true) {
        setIsLoading(false);
        push('/dashboard/staff')
      }
    } catch (error) {
      toast?.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}

