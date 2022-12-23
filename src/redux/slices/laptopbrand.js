import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
    isLoading: false,
    error: null,
    alllaptopbrand: [],
    deleteStatus: false,
    Addbrand: {},
    onelaptopbrand: {},
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
    name: 'laptopbrand',
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

      // GET Laptop brand 
        getLaptopbrandSuccess(state, action) {
            state.isLoading = false;
            state.alllaptopbrand  = action.payload;
        },

        getOneLaptopSuccess(state, action) {
            state.isLoading = false;
            state.onelaptopbrand = action.payload;
        },

        // Add update brand
        postputbrandSuccess(state, action) {
            state.isLoading = false;
            state.Addbrand = action.payload;
        },

        // delete Laptopbrand
        deleteLaptopbrandSuccess(state, action) {
            state.isLoading = false;
            state.deleteStatus = action.payload;
        },
    },
});
export default slice.reducer;

// GET Laptop brand 
export function getLaptopbrand() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/laptop/all', { headers: header });
            dispatch(slice.actions.getLaptopbrandSuccess(response.data.laptop));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getOneLaptop(id) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/laptop/one/' + id, { headers: header });
            dispatch(slice.actions.getOneLaptopSuccess(response.data.laptopbrand));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postlaptopbrand(formData, toast, push, reset, setisLoading) {
    return async () => {
        try {
            const response = await axios.post('/laptop/add', formData, { headers: header });
            console.log('response==', response);
            if (response.data?.status == true) {
                setisLoading(false);
                toast.success(response.data?.message);
                push('/dashboard/laptopbrand');
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

export function putlaptopbrand(id, formData, toast, push, reset, setisLoading) {
    return async () => {
        try {
            const response = await axios.put('/laptop/update/' + id, formData);
            if (response.data?.status == true) {
                setisLoading(false);
                toast.success(response.data?.message);
                push('/dashboard/laptopbrand');
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


// delete Laptopbrand
export function deleteLaptopbrand(id, toast) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete('/laptop/delete/' + id, { headers: header });
            dispatch(slice.actions.deleteLaptopbrandSuccess(response.data.status));
            toast.success(response.data?.message);
        } catch (error) {
            toast.error(error?.message);
            dispatch(slice.actions.hasError(error));
        }
    };
}
