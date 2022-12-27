import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
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
import { getDepartmentsAll } from '../../../redux/slices/department';
import { postdesignation, putdesignation } from '../../../redux/slices/designation';
import { useDispatch, useSelector } from '../../../redux/store';
// routes
//components
import FormProvider, {
  RHFSelect,
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

export default function DesignationAddForm({ isEdit = false, id, oneDesignation }){  
  const { push } = useRouter();
  const dispatch = useDispatch();
  const  departmentsss  = useSelector((state) => state.department.departments);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    dispatch(getDepartmentsAll());
  }, [dispatch]);

  const { enqueueSnackbar } = useSnackbar();
  const selectLevel = [
    {  level: 'Junior' },
    {  level: 'Intermediate' },
    {  level: 'Senior' },
  ];
  const handleOpenPreview = () => {
    setOpen(true);
  };
  const handleClosePreview = () => {
    setOpen(false);
  };
  const NewBlogSchema = Yup.object().shape({
    designations: Yup.string().required('Designation is required'),
    levels: Yup.mixed().required('Level is required'),
    // departments: Yup.string().required('Department type is required'),
  });

  console.log("oneDesignation",oneDesignation?.departments?.department)
  const defaultValues = {
    departments: oneDesignation?.departments ? oneDesignation?.departments:'',
    levels: oneDesignation?.levels ? oneDesignation?.levels : '',
    designations: oneDesignation?.designations ? oneDesignation?.designations : '',
  };

  // console.log("Default value",defaultValues.department);
  // console.log("onedesignation :",oneDesignation);
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
    if (isEdit && oneDesignation) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, oneDesignation]);
  const values = watch();
  const onSubmit = async (data) => {
    // console.log("Data",data);
    setIsLoading(true);
    const lavelOne = selectLevel.filter((item) => item.level == data.levels)[0];
    // console.log("selectLevel",selectLevel);
    // console.log("lavelOne",lavelOne.level);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const payload ={
        levels: lavelOne.level,
        designations: data.designations,
        departments: data.department, 
      }
      isEdit ? dispatch(putdesignation(id, payload, toast, push, setIsLoading)) : dispatch(postdesignation(payload, toast, push, setIsLoading));
    } catch (error) {
      console.error(error);
    }
  };

  // console.log("Departments",departmentsss);
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFSelect name="department" label="Department">
                  <option value={null}>Department</option>
                  {departmentsss?.map((item, i) => {
                    return (
                      <option value={item._id} key={i}>
                        {item.department}
                        {/* {console.log("kjknd",item)} */}
                      </option>
                    );
                  })}
                </RHFSelect>
                <RHFSelect name="levels" label="Level">
                  <option value={null}>Level</option>
                  {selectLevel?.map((item, i) => {
                    return (
                      <option value={item.level} key={i}>
                        { item.level}
                      </option>
                    );
                  })}
                </RHFSelect>
              <RHFTextField name="designations" label="Designation" />
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
    </>
  );
}
