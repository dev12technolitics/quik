import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Button, DialogActions, Box } from '@mui/material';
import { useSelector, useDispatch } from '../../../../redux/store';
import FormProvider, {
    RHFTextField, RHFSelect
} from '../../../../components/hook-form';
import { putpickup} from "../../../../redux/slices/mobilerepair";
import { getstaff } from '../../../../../src/redux/slices/staff';

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

PickupForm.propTypes = {
    isEdit: PropTypes.bool,
    oneposts: PropTypes.object,
};

export default function PickupForm({ mobilerepaircity, id, onCancel }) {

    console.log("mobilerepaircity", mobilerepaircity)

    const { push } = useRouter();

    const dispatch = useDispatch();

    const [isLoading, setisLoading] = useState(false);

    const { allstaff } = useSelector((state) => state?.staff);

    console.log("allstaff", allstaff)

    const mobilestaff = allstaff.filter((item) => item.designation === 'PICKAPP AGENT')

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
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const payload = {
                pickup: data.pickup
            };
            dispatch(putpickup(id, payload, toast, push, reset, setisLoading));
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
            <ToastContainer />
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} >
                    <Box sx={{ ml: 3, mr: 3 }}>

                        <RHFSelect name="pickup" label="Pickup Agent Assigned "
                        >
                            <option value={null}>Select Pickup Agent Assigned </option>
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

                            {/* <DialogActions>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Button variant="outlined" color="inherit" onClick={onCancel}>
                                        Cancel
                                    </Button>
                                </DialogActions> */}

                        </Stack>

                    </Box>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
