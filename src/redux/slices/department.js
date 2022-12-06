import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
    isLoading: false,
    error: null,
    departments: [],
    adddepartment: {},
    onedepartment: {},
};

const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

const header = {
    'Content-Type': 'multipart/form-data',
  
};

const jsonheader = {
    'Content-Type': 'application/json',
  
};


const slice = createSlice({
    name: 'department',
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

        // GET grams
        getDepartmentSuccess(state, action) {
            state.isLoading = false;
            state.departments = action.payload;
        },

        //GET grams
        getOneDepartmentsSuccess(state, action) {
            state.isLoading = false;
            state.onedepartment = action.payload;
        },

        //ADD grams
        postdepartmentSuccess(state, action) {
            state.isLoading = false;
            state.adddepartment = action.payload;
        },

    },
});

export default slice.reducer;


export function getDepartmentsAll() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/department/all');
            dispatch(slice.actions.getDepartmentSuccess(response.data.department));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getOneDepartments(id) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/department/one/' + id);
            dispatch(slice.actions.getOneDepartmentsSuccess(response.data.department));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postDepartment(formData, toast, push, reset) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('/department/add', formData);
            dispatch(slice.actions.postdepartmentSuccess(response.data));
            toast.success(response.data?.message)
            if (response.data.status == true) {
                reset()
                push('/dashboard/department')
            }
        } catch (error) {
            toast.error(error?.message)
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function putDepartment(id, formData, toast, push, reset) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put('/department/update/' + id, formData);
            dispatch(slice.actions.postdepartmentSuccess(response.data.department));
            toast.success(response.data?.message)
            if (response.data.status == true) {
                reset()
                push('/dashboard/department')
            }
        } catch (error) {
            toast.error(error?.message)
            dispatch(slice.actions.hasError(error));
        }
    };
}

