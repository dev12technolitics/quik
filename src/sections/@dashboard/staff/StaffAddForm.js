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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { getCity } from '../../../../src/redux/slices/city';
import { styled, useTheme } from '@mui/material/styles';

export const city = [{ label: 'ALL' }, { label: 'RAIPUR' },
{ label: 'DURG' }, { label: 'BHILAI  ' }, { label: 'BILASPUR' }, { label: 'KANKER' }];

export const designations = [{ label: 'ADMIN' }, { label: 'ADMIN ASSOCIATE' },
{ label: 'PICKAPP AGENT' }, { label: 'SERVICE MANAGER' }];


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName?.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
}

export default function StaffAddForm() {
    const { push } = useRouter();
    const dispatch = useDispatch();
    const theme = useTheme();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cityType, setcityType] = useState([]);
    // const { Addstaffs } = useSelector((state) => state.staff);

  const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setcityType(typeof value === 'string' ? value.split(',') : value);
    };

    const { allCity } = useSelector((state) => state?.city);

    useEffect(() => {
        dispatch(getCity());
    }, [dispatch]);

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const NewSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        // profile: Yup.mixed().test('required', 'Profile Pictures is required', (value) => value !== ''),
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
        city: [],
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
            // formData.append('profile', data.profile);
            formData.set('password', data.password);
            formData.set('name', data.name);
            formData.set('contact_no', data.contact_no);
            formData.set('city', cityType);
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

                                            <FormControl sx={{width: '100%' }}>
                                                <InputLabel id="demo-multiple-name-label">Assigned City</InputLabel>
                                                <Select
                                                    labelId="demo-multiple-name-label"
                                                    id="demo-multiple-name"
                                                    multiple
                                                    value={cityType}
                                                    onChange={handleChange}
                                                    input={<OutlinedInput label="Assigned City" />}
                                                    MenuProps={MenuProps}
                                                >
                                                    {allCity?.map((items, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={items?._id}
                                                            style={getStyles(items?._id, cityType, theme)}
                                                        >
                                                            {items?.city_name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
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
