import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { getCity } from '../../../../../src/redux/slices/city';
import { putstaff } from '../../../../../src/redux/slices/staff';
import FormProvider, { RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
import { useDispatch, useSelector } from '../../../../redux/store';



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

export default function StaffAddForm({ id, staffData }) {
    const { push } = useRouter();
    const dispatch = useDispatch();
    const theme = useTheme();
    const [designationfor, setDesignationFor] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [cityType, setcityType] = useState([]);

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
    });

    const defaultValues = {
        profile: staffData?.profile || '',
        name: staffData?.name || '',
        contact_no: staffData?.contact_no ? staffData?.contact_no : '',
        designation: staffData?.designation ? staffData?.designation : '',
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


    useEffect(() => {
        if (staffData) {
            reset(defaultValues);
            // console.log("staffData",staffData.city_name.city_name)
            setDesignationFor(staffData?.designation);
            // setcityType(staffData?.city_name.city_name);
        }
    }, [staffData]);

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
            // formData.set('city', cityType);
            formData.set('city', JSON.stringify(cityType));
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
                            </Card>
                            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }} justifyContent="end">
                                    <LoadingButton type="submit" variant="contained" size="" loading={isLoading}>
                                        Update Now
                                    </LoadingButton>
                                </Stack>
                        </Grid>
                    </Grid>


                </Grid>

            </Grid>

        </FormProvider>
    );
}
