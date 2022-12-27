import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormProvider, { RHFTextField } from '../../../components/hook-form';

PCRepairmodel.propTypes = { 
    isEdit: PropTypes.bool,
    currentUser: PropTypes.object,
};

export default function PCRepairmodel({ currentUser, id, address, remarks, locality }) {

    const NewUserSchema = Yup.object().shape({
    });

    const defaultValues = useMemo(
        () => ({
            address: address || '',
            remarks: remarks || '',
            locality: locality || ''
        }),
        [currentUser]
    );
    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
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
        if (currentUser) {
            reset(defaultValues);
        }
    }, [currentUser]);

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Box sx={{ pl: 3, pr: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12} >
                                <RHFTextField name="locality" label="Locality" inputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} >
                                <RHFTextField name="remarks" label="Remarks" fullWidth multiline rows={3} inputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} >
                                <RHFTextField name="address" label="Complete Address" fullWidth multiline rows={3} inputProps={{ readOnly: true }} />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </FormProvider>
    );
}