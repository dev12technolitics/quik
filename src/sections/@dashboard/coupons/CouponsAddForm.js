import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import FormProvider, {
  RHFTextField
} from '../../../components/hook-form';
import { postCoupons, putCoupons } from "../../../redux/slices/coupons";
import { useDispatch } from "../../../redux/store";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

CouponsAddForm.propTypes = {
  isEdit: PropTypes.bool,
  oneposts: PropTypes.object,
};

export default function CouponsAddForm({ isEdit = false, oneCoupon, id }) {
  const { push } = useRouter();

  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState(false);
  const [filterStartDate, setFilterStartDate] = useState(new Date());

  const NewProductSchema = Yup.object().shape({
    coupon_name: Yup.string().required('Coupon Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      coupon_name: oneCoupon?.coupon_name ? oneCoupon?.coupon_name : '',
      coupon_code: oneCoupon?.coupon_code ? oneCoupon?.coupon_code : '',
      coupon_discount: oneCoupon?.coupon_discount ? oneCoupon?.coupon_discount : '',
      coupon_validtill: oneCoupon?.coupon_validtill ? oneCoupon?.coupon_validtill : '',
    }),
    [oneCoupon]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    control,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && oneCoupon) {
      reset(defaultValues);
      setFilterStartDate(oneCoupon?.coupon_validtill);
    } else {
      reset(defaultValues);
    }
  }, [isEdit, oneCoupon]);

  const onSubmit = async (data) => {
    setisLoading(true);
    console.log("data",data)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const payload = {
        coupon_name: data.coupon_name,
        coupon_code: data.coupon_code,
        coupon_discount: data.coupon_discount,
        coupon_validtill: data.coupon_validtill,
      };
      isEdit ? dispatch(putCoupons(id, payload, toast, push, reset, setisLoading)) : dispatch(postCoupons(payload, toast, push, reset, setisLoading));
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      <ToastContainer />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>

          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="coupon_name" label="Coupon Name" />

              <RHFTextField name="coupon_code" label="Coupon Code" />

              {/* <RHFTextField name="coupon_discount" label="Coupon Discount" /> */}

              <Controller
                name="coupon_validtill"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Coupon Validtill"
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                    )}
                  />
                )}
              />

            </Stack>
          </Card>

          <Stack spacing={3}>
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }} justifyContent="end">
              <LoadingButton type="submit" variant="contained" size="" loading={isLoading}>
                {isEdit ? 'Update Now' : 'Post Now'}
              </LoadingButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
