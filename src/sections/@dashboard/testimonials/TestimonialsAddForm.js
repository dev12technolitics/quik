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
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSelector, useDispatch } from "../../../redux/store"
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
    RHFSwitch,
    RHFSelect,
    RHFEditor,
    RHFUpload,
    RHFTextField,
    RHFUploadAvatar,
} from '../../../components/hook-form';
import { putTestimonials, postTestimonials } from "../../../redux/slices/testimonial";

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

TestimonialsAddForm.propTypes = {
    isEdit: PropTypes.bool,
    oneposts: PropTypes.object,
};

export default function TestimonialsAddForm({ isEdit = false, id, testimonialsData }) {
    const { push } = useRouter();

    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false);
    const [filterStartDate, setFilterStartDate] = useState(new Date());
    const [typesObject, setTypesObject] = useState(null);

    const [filter, setFilter] = useState('');

    const NewProductSchema = Yup.object().shape({
        // test_name: Yup.string().required('Name is required'),
        // test_designation: Yup.string().required('Designation is required'),
        // test_comment: Yup.string().required('Comment is required'),
    });

    const defaultValues = {
        test_name: testimonialsData?.test_name || '',
        test_comment: testimonialsData?.test_comment || '',
        test_picture: testimonialsData?.test_picture || '',
        test_designation: testimonialsData?.test_designation || '',
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
        if (isEdit && testimonialsData) {
            reset(defaultValues);
        } else {
            reset(defaultValues);
        }
    }, [isEdit, testimonialsData]);

    const onSubmit = async (data) => {
        setisLoading(true);
        console.log("data", data)
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            let formData = new FormData();
            formData.append('test_picture', data.test_picture);
            formData.set('test_name', data.test_name);
            formData.set('test_comment', data.test_comment);
            formData.set('test_designation', data.test_designation);
            isEdit ? dispatch(putTestimonials(id, formData, toast, reset, push, setisLoading)) : dispatch(postTestimonials(formData, toast, reset, push, setisLoading));
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setValue(
                    'test_picture',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
            <ToastContainer />
            <Grid container spacing={3}>

                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <Box sx={{ mb: 1 }}>
                                <RHFUploadAvatar
                                    name="test_picture"
                                    accept="image/*"
                                    onDrop={handleDrop}
                                    helperText={
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                mt: 2,
                                                mx: 'auto',
                                                display: 'block',
                                                textAlign: 'center',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            <Box sx={{ mb: 0 }}>Testimonials Image</Box>
                                            Allowed *.jpeg, *.jpg, *.png, *.gif
                                        </Typography>
                                    }
                                />
                            </Box>
                        </Stack>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={12}>
                                <RHFTextField name="test_name" label="Name" />
                            </Grid>
                            <Grid item xs={12} md={6} lg={12}>
                                <RHFTextField name="test_designation" label="Designation" />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <RHFTextField name="test_comment" label="Comment" fullWidth multiline rows={3} />
                            </Grid>
                        </Grid>
                        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                            <LoadingButton type="submit" variant="contained" loading={isLoading}>
                                {isEdit ? 'Update Now' : 'Post Now'}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
