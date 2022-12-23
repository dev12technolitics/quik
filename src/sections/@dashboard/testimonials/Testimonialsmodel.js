import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, FormControlLabel } from '@mui/material';
import FormProvider, { RHFTextField } from '../../../components/hook-form';

Testimonialsmodel.propTypes = {
    isEdit: PropTypes.bool,
    currentUser: PropTypes.object,
};

export default function Testimonialsmodel({ isEdit = false, currentUser, id, comment }) {

    const NewUserSchema = Yup.object().shape({
    });

    const defaultValues = useMemo(
        () => ({
            comment: comment || ''
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
        if (isEdit && currentUser) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
    }, [isEdit, currentUser]);

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
                    <Box sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}  >
                            <RHFTextField name="comment" label="Comment" fullWidth multiline rows={3} inputProps={{ readOnly: true }}/>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </FormProvider>
    );
}