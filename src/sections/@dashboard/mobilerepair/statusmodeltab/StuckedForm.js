import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, DialogActions, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import FormProvider, {
    RHFTextField
} from '../../../../components/hook-form';
import { useDispatch } from "../../../../redux/store";
import axios from '../../../../utils/axios';

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

StuckedForm.propTypes = {
    isEdit: PropTypes.bool,
    oneposts: PropTypes.object,
};

export default function StuckedForm({ id, onCancel }) {
    const { push } = useRouter();

    const dispatch = useDispatch();

    const [isLoading, setisLoading] = useState(false);

    const NewProductSchema = Yup.object().shape({
        stucked_comment: Yup.string().required('Comment is required'),
    });

    const defaultValues = {
        stucked_comment: '',
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
            stucked_comment: data.stucked_comment,
            user_id :id,
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
                        <RHFTextField name="stucked_comment" multiline rows={3} label="Comment" />

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
