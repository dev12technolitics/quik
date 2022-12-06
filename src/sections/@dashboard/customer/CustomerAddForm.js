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
import { Card, Chip, Grid, Stack, TextField, Typography, InputAdornment, Box } from '@mui/material';
import { useSelector, useDispatch } from "../../../redux/store"
import FormProvider, {
    RHFUpload,
    RHFTextField,
} from '../../../components/hook-form';
import { postCustomer, putCustomer } from "../../../redux/slices/customer";

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

CustomerAddForm.propTypes = {
    isEdit: PropTypes.bool,
    oneposts: PropTypes.object,
};

export default function CustomerAddForm({ isEdit = false, oneCustomer, id }) {

    const { push } = useRouter();
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false);

    const NewProductSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
    });

    const defaultValues = useMemo(
        () => ({
            name: oneCustomer?.name ? oneCustomer?.name : '',
            eamil_id: oneCustomer?.logo ? oneCustomer.eamil_id : '',
            contact_no: oneCustomer?.contact_no ? oneCustomer?.contact_no : '',
            city: oneCustomer?.city ? oneCustomer.city : '',
            locality: oneCustomer?.locality ? oneCustomer?.locality : '',
            address: oneCustomer?.address ? oneCustomer.address : '',
        }),
        [oneCustomer]
    );

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

    useEffect(() => {
        if (isEdit && oneCustomer) {
            reset(defaultValues);
        } else {
            reset(defaultValues);
        }
    }, [isEdit, oneCustomer]);

    const onSubmit = async (data) => {
        setisLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            isEdit ? dispatch(putCustomer(id, data, toast, push, reset, setisLoading)) : dispatch(postCustomer(data, toast, push, reset, setisLoading));
        }
        catch (error) {
            console.error(error);
        }
    }


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
            <ToastContainer />
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <RHFTextField name="name" label="Name" />

                            <RHFTextField name="contact_no" label="Contact No" type="number" />

                            <RHFTextField name="eamil_id" label="Eamil Id" />

                            <RHFTextField name="contact_no" label="Contact No" type="number" />

                            <RHFTextField name="city" label="City" />

                            <RHFTextField name="address" label="Address" />

                            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }} justifyContent="end">
                                <LoadingButton type="submit" variant="contained" size="" loading={isLoading}>
                                    {isEdit ? 'Update Now' : 'Post Now'}
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </Card>
                </Grid>

            </Grid>
        </FormProvider>
    );
}
