import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, DialogActions, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { getstaff } from '../../../../../src/redux/slices/staff';
import FormProvider, { RHFSelect } from '../../../../components/hook-form';
// import { putpickup } from '../../../../redux/slices/mobilerepair';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from '../../../../redux/store';
import axios from '../../../../utils/axios';

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

PickupForm.propTypes = {
    isEdit: PropTypes.bool,
    oneposts: PropTypes.object,
};

export default function PickupForm({ mobilerepaircity, id, onCancel, statusPage }) {

    console.log("mobilerepaircity", mobilerepaircity)

    const { push } = useRouter();
 
    const dispatch = useDispatch();

    const [isLoading, setisLoading] = useState(false);

    const { allstaff } = useSelector((state) => state?.staff);

    let finalaraay = allstaff?.filter((single) => single?.city_name?.filter((i) => { i?._id == mobilerepaircity }) && single.designation === 'PICKAPP AGENT')
    console.log("123456", finalaraay)

    // && item.city == mobilerepaircity 
    const mobilestaff = allstaff.filter((item) => item.designation === 'PICKAPP AGENT' && item.city_name.map((items) => (
        items.city_name == mobilerepaircity
    ))
    )



    console.log("mobilestaff", mobilestaff)

    useEffect(() => {
        dispatch(getstaff());
    }, [dispatch]);

    const NewProductSchema = Yup.object().shape({
        pickup: Yup.string().required('Pickup Agent Assigned Name is required'),
    });

    const defaultValues = {
        pickup: '',
    };

    const methods = useForm({
        resolver: yupResolver(NewProductSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        setValue,
        getValues,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();


    const onSubmit = async (data) => {
        setisLoading(true);
        const payload = {
            pickup: data.pickup,
            status: statusPage,
            mobileId: id,
        };
        console.log("payload", payload)
        const response = await axios.post('/mobilestatus/add', payload);
        console.log("response123", response)
        setisLoading(false);
        toast.success(response.data?.message);
        reset()
        onCancel()
        push('/dashboard/mobilerepair/');
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
            <ToastContainer />
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} >
                    <Box sx={{ ml: 3, mr: 3 }}>

                        <RHFSelect name="pickup" label="Pickup Agent Assigned "
                        >
                            <option value={null}>Pickup Agent Assigned </option>
                            {mobilestaff.map((option, index) => (
                                <option key={index}
                                    value={option?.name}
                                >
                                    {option.name}
                                </option>
                            ))}

                        </RHFSelect>

                        <Stack direction="row" sx={{ mt: 3 }} justifyContent="end">
                            <DialogActions>
                                <LoadingButton type="submit" variant="contained" size="" loading={isLoading}>
                                    Add Now
                                </LoadingButton>
                            </DialogActions>

                        </Stack>

                    </Box>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
