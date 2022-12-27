import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = { 
    isLoading: false,
    error: null,
    allBrand: [],
    deleteStatus: false,
    Addbrand: {},
    oneBrand: {},
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
    name: 'brand',
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

        // GET brand
        getBrandSuccess(state, action) {
            state.isLoading = false;
            state.allBrand = action.payload;
        },

        getOneBrandSuccess(state, action) {
            state.isLoading = false;
            state.oneBrand = action.payload;
        },

        // Add update brand
        postputbrandSuccess(state, action) {
            state.isLoading = false;
            state.Addbrand = action.payload;
        },

        // delete brand
        deleteBrandSuccess(state, action) {
            state.isLoading = false;
            state.deleteStatus = action.payload;
        },
    },
});
export default slice.reducer;

// GET brand
export function getBrand() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/brand/all', { headers: header });
            dispatch(slice.actions.getBrandSuccess(response.data.brands));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getOneBrand(id) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/brand/one/' + id, { headers: header });
            dispatch(slice.actions.getOneBrandSuccess(response.data.brand));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postbrand(data, toast, push, reset, setisLoading) {
    return async () => {
        try {
            const response = await axios.post('/brand/add', data, { headers: header });
            console.log('response==', response);
            if (response.data?.status == true) {
                setisLoading(false);
                toast.success(response.data?.message);
                push('/dashboard/mobilebrand');
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

export function putbrand(id, data, toast, push, reset, setisLoading) {
    return async () => {
        try {
            const response = await axios.put('/brand/update/' + id, data);
            if (response.data?.status == true) {
                setisLoading(false);
                toast.success(response.data?.message);
                push('/dashboard/mobilebrand');
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


// delete brand
export function deleteBrand(id, toast) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete('/brand/delete/' + id, { headers: header });
            dispatch(slice.actions.deleteBrandSuccess(response.data.status));
            toast.success(response.data?.message);
        } catch (error) {
            toast.error(error?.message);
            dispatch(slice.actions.hasError(error));
        }
    };
}
