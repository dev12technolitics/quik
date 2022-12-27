import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import FormProvider, {
  RHFTextField
} from '../../../components/hook-form';
import { postCity, putCity } from "../../../redux/slices/city";
import { useDispatch } from "../../../redux/store";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

CityAddForm.propTypes = {
  isEdit: PropTypes.bool,
  oneposts: PropTypes.object,
};

export default function CityAddForm({ isEdit = false, oneCity, id }) {
  const { push } = useRouter();

  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState(false);

  const NewProductSchema = Yup.object().shape({
    city_name: Yup.string().required('City Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      city_name: oneCity?.city_name ? oneCity?.city_name : '',
    }),
    [oneCity]
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
    if (isEdit && oneCity) {
      reset(defaultValues);
    } else {
      reset(defaultValues);
    }
  }, [isEdit, oneCity]);

  const onSubmit = async (data) => {
    setisLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const payload = {
        city_name: data.city_name
      };
      isEdit ? dispatch(putCity(id, payload, toast, push, reset, setisLoading)) : dispatch(postCity(payload, toast, push, reset, setisLoading));
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
              <RHFTextField name="city_name" label="Name of city" />
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
