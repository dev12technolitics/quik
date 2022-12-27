import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false, 
  error: null,
  testimonials: [],
  addTestimonial: {},
  oneTestimonial: {},
  deleteStatus : false
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
  name: 'testimonial',
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

    // GET testimonial
    getTestimonialsSuccess(state, action) {
      state.isLoading = false;
      state.testimonials = action.payload;
    },

    getTestimonialSuccess(state, action) {
      state.isLoading = false;
      state.oneTestimonial = action.payload;
    },

    postTestimonialsSuccess(state, action) {
      state.isLoading = false;
      state.addTestimonial = action.payload;
    },

    deleteTestimonialSuccess(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },
  },
});

export default slice.reducer;

export function getTestimonials() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/testimonial/all', { headers: header });
      dispatch(slice.actions.getTestimonialsSuccess(response.data.testimonials));

      console.log("Response",response)
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOneTestimonial(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/testimonial/one/' + id, { headers: header });
      dispatch(slice.actions.getTestimonialSuccess(response.data.testimonial));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postTestimonials(formData, toast, reset, push, setisLoading) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/testimonial/add', formData, { headers: header });
      dispatch(slice.actions.postTestimonialsSuccess(response.data.testimonial));
      if (response.data?.status) {
        setisLoading(false);
        toast.success(response.data?.message);
        reset()
        push('/dashboard/testimonials');
      } else {
        setisLoading(false);
        toast.error(response.data?.message);
      }

    } catch (error) {
      setisLoading(false);
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}



export function putTestimonials(id, formData, toast, reset, push, setisLoading) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/testimonial/update/' + id, formData, { headers: header });
      dispatch(slice.actions.postTestimonialsSuccess(response.data.testimonial));
      if (response.data?.status) {
        setisLoading(false);
        toast.success(response.data?.message);
        reset()
        push('/dashboard/testimonials');
      } else {
        setisLoading(false);
        toast.error(response.data?.message);
      }
    } catch (error) {
      setisLoading(false);
      toast.success(error.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteTestimonials(id,toast) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete('/testimonial/delete/' + id, { headers: header });
      dispatch(slice.actions.deleteTestimonialSuccess(response.data.status));
      toast.success(response.data?.message)
    } catch (error) {
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}
