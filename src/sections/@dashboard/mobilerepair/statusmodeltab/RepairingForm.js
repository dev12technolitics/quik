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

RepairingForm.propTypes = {
    isEdit: PropTypes.bool,
    oneposts: PropTypes.object,
};

export default function RepairingForm({ mobilerepaircity, id, onCancel, statusPage }) {

    console.log("mobilerepaircity", mobilerepaircity)

    const { push } = useRouter();

    const dispatch = useDispatch();

    const [isLoading, setisLoading] = useState(false);

    const { allstaff } = useSelector((state) => state?.staff);

    console.log("allstaff", allstaff)

    const mobilestaff = allstaff.filter((item) => item.designation === 'SERVICE MANAGER')

    console.log("mobilestaff", mobilestaff)

    useEffect(() => {
        dispatch(getstaff());
    }, [dispatch]);

    const NewProductSchema = Yup.object().shape({
        repairing: Yup.string().required('Service Manager Name is required'),
    });

    const defaultValues = {
        repairing: '',
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
            repairing: data.repairing,
            status: statusPage,
            user_id:id,
        };
        const response = await axios.post('/mobilestatus/add', payload);
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

                        <RHFSelect name="repairing" label="Service Manager"
                        >
                            <option value={null}>Service Manager</option>
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
