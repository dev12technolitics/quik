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
import { useDispatch } from "../../../../redux/store"
import FormProvider, {
    RHFTextField,
} from '../../../../components/hook-form';
import { putCity, postCity } from "../../../../redux/slices/city";

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

RepairingForm.propTypes = {
    isEdit: PropTypes.bool,
    oneposts: PropTypes.object,
};

export default function RepairingForm({ oneCity, id, onCancel }) {
    const { push } = useRouter();

    const dispatch = useDispatch();

    const [isLoading, setisLoading] = useState(false);

    const NewProductSchema = Yup.object().shape({
        city_name: Yup.string().required('City Name is required'),
    });

    const defaultValues = {
        city_name: '',
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

    useEffect(() => {
        if (oneCity) {
            reset(defaultValues);
        } else {
            reset(defaultValues);
        }
    }, [oneCity]);

    const onSubmit = async (data) => {
        setisLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const payload = {
                city_name: data.city_name
            };
            dispatch(putCity(id, payload, toast, push, reset, setisLoading));
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
                        <RHFTextField name="city_name" label="RepairingForm of city" />

                        <Stack direction="row"  sx={{ mt: 3 }} justifyContent="end">
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
    