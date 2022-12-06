import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
    isLoading: false,
    error: null,
    allCoupons: [],
    oneCoupon: {},
    deleteStatus: false,
    AddCoupons: {},
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
    name: 'coupons',
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

        // GET coupons
        getCouponsSuccess(state, action) {
            state.isLoading = false;
            state.allCoupons = action.payload;
        },

        getOneCouponSuccess(state, action) {
            state.isLoading = false;
            state.oneCoupon = action.payload;
        },

        // Add update Coupons
        postputCouponsSuccess(state, action) {
            state.isLoading = false;
            state.AddCoupons = action.payload;
        },

        // delete coupons
        deleteCouponsSuccess(state, action) {
            state.isLoading = false;
            state.deleteStatus = action.payload;
        },
    },
});
export default slice.reducer;

// GET city
export function getCoupons() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('//all', { headers: header });
            dispatch(slice.actions.getCouponsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getOneCoupon(id) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('//one/' + id, { headers: header });
            dispatch(slice.actions.getOneCouponSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postCoupons(payload, toast, push, reset, setisLoading) {
    return async () => {
        try {
            const response = await axios.post('//add', payload, { headers: jsonheader });
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

export function putCoupons(id, payload, toast, push, reset, setisLoading) {
    return async () => {
        try {
            const response = await axios.put('//update/' + id, payload);
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
export function deleteCoupons(id, toast) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete('//delete/' + id, { headers: header });
            dispatch(slice.actions.deleteCouponsSuccess(response.data.status));
            toast.success(response.data?.message);
        } catch (error) {
            toast.error(error?.message);
            dispatch(slice.actions.hasError(error));
        }
    };
}
