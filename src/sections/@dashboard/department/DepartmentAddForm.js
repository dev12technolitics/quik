import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { postDepartment, putDepartment } from '../../../redux/slices/department';
import { useDispatch, useSelector } from '../../../redux/store';
// routes
//components
import FormProvider, {
  RHFTextField
} from '../../../components/hook-form';
//
// import BannerNewPostPreview from './BannerNewPostPreview';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function DepartmentAddForm({ isEdit = false, id, onedepartments }) {

  // const [productFor, setProductFor] = useState('');

  const { push } = useRouter();
  const dispatch = useDispatch();

  const { adddepartments } = useSelector((state) => state.department);
  const [isLoading, setIsLoading] = useState(false); 
  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };
  const handleClosePreview = () => {
    setOpen(false);
  };
  const NewBlogSchema = Yup.object().shape({
    department: Yup.string().required('Department is required'),
    // ban_image: Yup.mixed().required('Image is required'),
    // ban_type: Yup.string().required('Banner type is required'),
    // pro_link: Yup.string().url('Banner link must be a valid URL'),
  });
  const defaultValues = {
    department: onedepartments?.department ? onedepartments?.department : '',
    // ban_type: onedepartments?.ban_type ? onedepartments?.ban_type : '',
    // ban_image: onedepartments?.ban_image ? onedepartments?.ban_image : '',
    // pro_link: onedepartments?.pro_link ? onedepartments?.pro_link : '',
  };
 const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });
  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;
  useEffect(() => {
    if (isEdit && onedepartments) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, onedepartments]);
  const values = watch();
  // const onSubmit = async (data) => {
  //   setIsLoading(true);
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     let formData = new FormData();
  //     formData.append('ban_image', data.ban_image);
  //     formData.set('ban_title', data.ban_title);
  //     formData.set('ban_type', data.ban_type);
  //     formData.set('pro_link', data.pro_link);
  //     isEdit ? dispatch(putBanners(id, formData, toast, push, setIsLoading)) : dispatch(postBanners(formData, toast, push, setIsLoading));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        isEdit ? dispatch(putDepartment(id, data, toast, push, reset)) : dispatch(postDepartment(data, toast, push, reset));
    } catch (error) {
        console.error(error);
    }
};



  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'ban_image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                {/* <RHFTextField name="ban_title" label="Banner title" />

                <RHFSelect name="ban_type" label="Banner Type">
                  <option value={null}>Select Banner Type</option>
                  <option value="Popup Banner">Popup Banner</option>
                </RHFSelect> */}

                <RHFTextField name="department" label="Department" />
{/* 
                <div>
                  <LabelStyle>Banner Image</LabelStyle>
                  <RHFUpload name="ban_image" accept="image/*"  onDrop={handleDrop} />
                </div> */}
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }} justifyContent="end">
              <LoadingButton type="submit" variant="contained" size="" loading={isLoading}>
                {isEdit ? 'Update Now' : 'Post Now'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>

      {/* <BannerNewPostPreview
        values={values}
        isOpen={open}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      /> */}
    </>
  );
}
