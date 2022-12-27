

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, DialogActions, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import FormProvider, {
    RHFTextField
} from '../../../../components/hook-form';
import { putCity } from "../../../../redux/slices/city";
import { useDispatch } from "../../../../redux/store";

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

OnReviewForm.propTypes = {
    isEdit: PropTypes.bool,
    oneposts: PropTypes.object,
};

export default function OnReviewForm({ oneCity, id, onCancel }) {
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
                        <RHFTextField name="review_comment" multiline rows={3} label="Comment" />

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
