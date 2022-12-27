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
  RHFEditor, RHFTextField, RHFUpload
} from '../../../components/hook-form';
import { postPosts, putPosts } from "../../../redux/slices/posts";
import { useDispatch } from "../../../redux/store";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

PostsAddForm.propTypes = {
  isEdit: PropTypes.bool,
  oneposts: PropTypes.object,
};

export default function PostsAddForm({ isEdit = false, oneposts, id }) {
  const { push } = useRouter();

  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [filterStartDate, setFilterStartDate] = useState(new Date());
  const [typesObject, setTypesObject] = useState(null);

  const [filter, setFilter] = useState('');

  const NewProductSchema = Yup.object().shape({
    // title: Yup.string().required('Title is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: oneposts?.title ? oneposts?.title : '',
      tags_and_keywords: oneposts?.tags_and_keywords ? oneposts.tags_and_keywords : '',
      backlink: oneposts?.backlink ? oneposts.backlink : '',
      button_title: oneposts?.button_title ? oneposts.button_title : '',
      image: oneposts?.image ? oneposts.image : '',
      description: oneposts?.description ? oneposts.description : '',
    }),
    [oneposts]
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
    if (isEdit && oneposts) {
      reset(defaultValues);
    } else {
      reset(defaultValues);
    }
  }, [isEdit, oneposts]);

  const onSubmit = async (data) => {
    setisLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      let formData = new FormData();
      formData.set('title', data.title);
      formData.append('image', data.image);
      formData.set('description', data.description);
      formData.set('button_title', data.button_title);
      formData.set('backlink', data.backlink);
      formData.set('tags_and_keywords', data.tags_and_keywords);
      isEdit ? dispatch(putPosts(id, formData, toast, push, reset)) : dispatch(postPosts(formData, toast, push, reset));
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
          'image',
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
              <RHFTextField name="title" label="Title" />

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Description
                </Typography>
                <RHFEditor simple name="description" />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Images
                </Typography>
                <RHFUpload
                  name="image"
                  onDrop={handleDrop}
                />
              </Stack>

            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mt={2}>
                <RHFTextField name="button_title" label="Button Title" />
                <RHFTextField name="backlink" label="Back Link" />
                <RHFTextField name="tags_and_keywords" label="Tags And Keywords" />
              </Stack>
            </Card>
     
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
