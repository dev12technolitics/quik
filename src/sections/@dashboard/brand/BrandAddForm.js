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
import { postbrand, putbrand } from "../../../redux/slices/brand";

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

BrandAddForm.propTypes = {
    isEdit: PropTypes.bool,
    oneposts: PropTypes.object,
};

export default function BrandAddForm({ isEdit = false, oneBrand, id }) {

    const { push } = useRouter();
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false);
    const [filterStartDate, setFilterStartDate] = useState(new Date());
    const [typesObject, setTypesObject] = useState(null);

    const [filter, setFilter] = useState('');

    const NewProductSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
    });

    const defaultValues = useMemo(
        () => ({
            name: oneBrand?.name ? oneBrand?.name : '',
            logo: oneBrand?.logo ? oneBrand.logo : '',
        }),
        [oneBrand]
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
        if (isEdit && oneBrand) {
            reset(defaultValues);
        } else {
            reset(defaultValues);
        }
    }, [isEdit, oneBrand]);

    const onSubmit = async (data) => {
        setisLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            let formData = new FormData();
            formData.set('name', data.name);
            formData.append('logo', data.logo);
            isEdit ? dispatch(putbrand(id, formData, toast, push, reset, setisLoading)) : dispatch(postbrand(formData, toast, push, reset, setisLoading));
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
                    'logo',
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
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <RHFTextField name="name" label="Name" />

                            <Stack spacing={1}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                    Images
                                </Typography>
                                <RHFUpload
                                    name="logo"
                                    onDrop={handleDrop}
                                />
                            </Stack>

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
