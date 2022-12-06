import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, InputAdornment, IconButton } from '@mui/material';
import Iconify from '../../../../src/components/iconify';
import FormProvider, { RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar, RHFUpload, RHFUploadBox } from '../../../components/hook-form';
import { poststaff } from '../../../../src/redux/slices/staff';
import { useDispatch, useSelector } from '../../../redux/store';
import { toast } from 'react-toastify';

export const city = [{ label: 'ALL' }, { label: 'RAIPUR' },
{ label: 'DURG' }, { label: 'BHILAI  ' }, { label: 'BILASPUR' }, { label: 'KANKER' }];

export const designations = [{ label: 'ADMIN' }, { label: 'ADMIN ASSOCIATE' },
{ label: 'PICKAPP AGENT' }, { label: 'SERVICE MANAGER' }];

export default function StaffAddForm() {
    const { push } = useRouter();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // const { Addstaffs } = useSelector((state) => state.staff);

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const NewSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        profile: Yup.mixed().test('required', 'Profile Pictures is required', (value) => value !== ''),
        contact_no: Yup.string()
            .min(10, 'Password must be at least 10 characters')
            .max(10, 'Password must be at least 10 characters')
            .matches(phoneRegExp, 'Phone number is not valid'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        c_pass: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const defaultValues = {
        profile: '',
        name: '',
        contact_no: '',
        city: '',
        designation: '',
        password: '',
    };

    const methods = useForm({
        resolver: yupResolver(NewSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = async (data) => {
        setIsLoading(true);
        console.log('data', data);
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            let formData = new FormData();
            formData.append('profile', data.profile);
            formData.set('password', data.password);
            formData.set('name', data.name);
            formData.set('contact_no', data.contact_no);
            formData.set('city', data.city);
            formData.set('designation', data.designation);
            dispatch(poststaff(formData, toast, push, reset, setIsLoading));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setValue(
                    'profile',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

            <Grid container >

                <Grid item xs={12} md={12}>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ p: 3, mb: 2 }}>
                                <Box sx={{ mb: 1 }}>
                                    <RHFUploadAvatar
                                        name="profile"
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
                                                <Box sx={{ mb: 0 }}>Profile Picture</Box>
                                            </Typography>
                                        }
                                    />
                                </Box>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Card sx={{ p: 3, mb: 2 }}>
                                <Stack spacing={3}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <RHFTextField name="name" label="Name" />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <RHFTextField name="contact_no" label="Contact No." type="number" />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <RHFSelect name="city" label="Assigned City">
                                                <option value={null}>Select Assigned City</option>
                                                {city.map((option, index) => (
                                                    <option key={index}
                                                        value={option?.label}
                                                    >
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </RHFSelect>
                                        </Grid>


                                        <Grid item xs={12} md={6}>
                                            <RHFSelect name="designation" label="Designation">
                                                <option value={null}>Select Designation</option>
                                                {designations.map((option, index) => (
                                                    <option key={index}
                                                        value={option?.label}
                                                    >
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </RHFSelect>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <RHFTextField
                                                name="password"
                                                label="Password"
                                                type={showPassword ? 'text' : 'password'}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <RHFTextField
                                                name="c_pass"
                                                label="Confirm New Password"
                                                type={showPassword ? 'text' : 'password'}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Card>
                            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }} justifyContent="end">
                                <LoadingButton type="submit" variant="contained" size="" loading={isLoading}>
                                    Add Now
                                </LoadingButton>
                            </Stack>
                        </Grid>
                    </Grid>


                </Grid>

            </Grid>

        </FormProvider>
    );
}
