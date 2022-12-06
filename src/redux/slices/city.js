import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
    isLoading: false,
    error: null,
    allCity: [],
    deleteStatus: false,
    Addcity: {},
    oneCity: {},
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
    name: 'city',
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

        // GET city
        getCitySuccess(state, action) {
            state.isLoading = false;
            state.allCity = action.payload;
        },

        getOneCitySuccess(state, action) {
            state.isLoading = false;
            state.oneCity = action.payload;
        },

        // Add update city
        postputCitySuccess(state, action) {
            state.isLoading = false;
            state.Addcity = action.payload;
        },

        // delete city
        deleteCitySuccess(state, action) {
            state.isLoading = false;
            state.deleteStatus = action.payload;
        },
    },
});
export default slice.reducer;

// GET city
export function getCity() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/city/all', { headers: header });
            dispatch(slice.actions.getCitySuccess(response.data.city));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getOneCity(id) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/city/one/' + id, { headers: header });
            dispatch(slice.actions.getOneCitySuccess(response.data.city));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postCity(payload, toast, push, reset, setisLoading) {
    return async () => {
        try {
            const response = await axios.post('/city/add', payload, { headers: jsonheader });
            console.log('response==', response);
            if (response.data?.status == true) {
                setisLoading(false);
                toast.success(response.data?.message);
                push('/dashboard/city');
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

export function putCity(id, payload, toast, push, reset, setisLoading) {
    return async () => {
        try {
            const response = await axios.put('/city/update/' + id, payload);
            if (response.data?.status == true) {
                setisLoading(false);
                toast.success(response.data?.message);
                push('/dashboard/city');
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


// delete city
export function deleteCity(id, toast) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete('/city/delete/' + id, { headers: header });
            dispatch(slice.actions.deleteCitySuccess(response.data.status));
            toast.success(response.data?.message);
        } catch (error) {
            toast.error(error?.message);
            dispatch(slice.actions.hasError(error));
        }
    };
}
