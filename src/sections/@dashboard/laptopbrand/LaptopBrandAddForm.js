import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import FormProvider, {
    RHFTextField, RHFUpload
} from '../../../components/hook-form';
import { postlaptopbrand, putlaptopbrand } from "../../../redux/slices/laptopbrand";
import { useDispatch } from "../../../redux/store";

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

BrandAddForm.propTypes = {
    isEdit: PropTypes.bool,
    oneposts: PropTypes.object,
};

export default function BrandAddForm({ isEdit = false, onelaptopbrand, id }) {

    const { push } = useRouter();
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false);

    const [filterStartDate, setFilterStartDate] = useState(new Date());

    const [typesObject, setTypesObject] = useState(null);

    const [filter, setFilter] = useState('');

    const NewProductSchema = Yup.object().shape({
        brand_name: Yup.string().required('Brand Name is required'),
        logo: Yup.mixed().test('required', 'Logo is required', (value) => value !== ''),
    });

    const defaultValues = useMemo(
        () => ({
            brand_name: onelaptopbrand?.brand_name ? onelaptopbrand?.brand_name : '',
            logo: onelaptopbrand?.logo ? onelaptopbrand.logo : '',
        }),
        [onelaptopbrand]
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
        if (isEdit && onelaptopbrand) {
            reset(defaultValues);
        } else {
            reset(defaultValues);
        }
    }, [isEdit, onelaptopbrand]);

    const onSubmit = async (data) => {
        setisLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            let formData = new FormData();
            formData.set('brand_name', data.brand_name);
            formData.append('logo', data.logo);
            isEdit ? dispatch(putlaptopbrand(id, formData, toast, push, reset, setisLoading)) : dispatch(postlaptopbrand(formData, toast, push, reset, setisLoading));
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
                            <RHFTextField name="brand_name" label="Brand Name" />

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
