import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';

// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, FormControlLabel } from '@mui/material';

import FormProvider, { RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';

import { useDispatch, useSelector } from '../../../../redux/store';

import { toast } from 'react-toastify';
import { putstaff } from '../../../../../src/redux/slices/staff';
// ----------------------------------------------------------------------
export const city = [{ label: 'ALL' }, { label: 'RAIPUR' },
{ label: 'DURG' }, { label: 'BHILAI  ' }, { label: 'BILASPUR' }, { label: 'KANKER' }];

export const designations = [{ label: 'ADMIN' }, { label: 'ADMIN ASSOCIATE' },
{ label: 'PICKAPP AGENT' }, { label: 'SERVICE MANAGER' }];

StaffEditForm.propTypes = {
    isEdit: PropTypes.bool,
    currentUser: PropTypes.object,
};

export default function StaffEditForm({ id, staffData }) {
    const { push } = useRouter();
    const dispatch = useDispatch();

    const [cityFor, setCityFor] = useState('');
    const [designationfor, setDesignationFor] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const NewSchema = Yup.object().shape({
        // name: Yup.string().required('Name is required')
    });

    const defaultValues = {
        profile: staffData?.profile || '',
        name: staffData?.name || '',
        contact_no: staffData?.contact_no ? staffData?.contact_no : '',
    }

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

    useEffect(() => {
        if (staffData) {
            reset(defaultValues);
            setDesignationFor(staffData?.designation);
            setCityFor(staffData?.city);
        }
    }, [staffData]);


    const onSubmit = async (data) => {
        setIsLoading(true);
        console.log('data', data);
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            let formData = new FormData();
            formData.append('profile', data.profile);
            formData.set('name', data.name);
            formData.set('contact_no', data.contact_no);
            formData.set('city', cityFor);
            formData.set('designation', designationfor);
            dispatch(putstaff(id, formData, toast, push, reset, setIsLoading));
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
                                            <RHFTextField name="contact_no" label="Contact No." />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <RHFSelect name="city" label="Assigned City"
                                                value={cityFor}
                                                onChange={(e) => setCityFor(e.target.value)}
                                            >
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
                                            <RHFSelect name="designation" label="Designation"
                                                value={designationfor}
                                                onChange={(e) => setDesignationFor(e.target.value)}>
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
                                    </Grid>
                                </Stack>
                                <Stack direction="row" spacing={1.5} sx={{ mt: 3 }} justifyContent="end">
                                    <LoadingButton type="submit" variant="contained" size="" loading={isLoading}>
                                        Update Now
                                    </LoadingButton>
                                </Stack>
                            </Card>
                        </Grid>
                    </Grid>



                </Grid>
            </Grid>

        </FormProvider>
    );
}
