import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Box, Card, Chip, Grid, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import FormProvider, {
    RHFEditor, RHFSelect, RHFTextField,
    RHFUploadAvatar
} from '../../../components/hook-form';
import { postBlogmanagements, putBlogmanagements } from "../../../redux/slices/blogmanagement";
import { useDispatch } from "../../../redux/store";
 
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

BlogsAddForm.propTypes = {
    isEdit: PropTypes.bool,
    blogsData: PropTypes.object,
};

export default function BlogsAddForm({ isEdit = false, id, blogsData }) {
    const { push } = useRouter();

    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false);
    const [blogFor, setBlogFor] = useState('');
    const [tags, setTags] = useState([]);
    const [filter, setFilter] = useState('');
    const [filterStartDate, setFilterStartDate] = useState(new Date());

    const NewProductSchema = Yup.object().shape({
        // test_name: Yup.string().required('Name is required'),
        // test_designation: Yup.string().required('Designation is required'),
        // test_comment: Yup.string().required('Comment is required'),
    });

    const defaultValues = {
        blog_title: blogsData?.blog_title ? blogsData?.blog_title : '',
        blog_tag: blogsData?.blog_tag ? blogsData?.blog_tag : [],
        blog_posteddate: blogsData?.blog_posteddate ? blogsData?.blog_posteddate : '',
        blog_postedby: blogsData?.blog_postedby ? blogsData?.blog_postedby : '',
        blog_image: blogsData?.blog_image ? blogsData?.blog_image : '',
        blog_video: blogsData?.blog_video ? blogsData?.blog_video : '',
        descriptions: blogsData?.descriptions ? blogsData?.descriptions : '',
    };

    const methods = useForm({
        resolver: yupResolver(NewProductSchema),
        defaultValues,
    });


    const {
        reset,
        watch,
        control,
        setValue,
        getValues,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    useEffect(() => {
        if (isEdit && blogsData) {
            console.log("blogsData",blogsData.blog_tag)
            reset(defaultValues);
            setBlogFor(blogsData?.blog_type);
            setTags(blogsData?.blog_tag);
            setFilterStartDate(blogsData?.blog_posteddate);
        } else {
            reset(defaultValues);
        }
    }, [isEdit, blogsData]);

    const onSubmit = async (data) => {
        setisLoading(true);
        console.log("data", data.blog_tag)
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            let formData = new FormData();
            formData.append('blog_image', data.blog_image);
            formData.set('blog_title', data.blog_title);
            formData.set('blog_type', blogFor);
            formData.set('blog_postedby', data.blog_postedby);
            formData.set('blog_tag', data.blog_tag);
            formData.set('blog_posteddate', data.blog_posteddate);
            formData.set('descriptions', data.descriptions);
            formData.set('blog_video', data.blog_video);
            isEdit ? dispatch(putBlogmanagements(id, formData, toast, reset, push, setisLoading)) : dispatch(postBlogmanagements(formData, toast, reset, push, setisLoading));
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
                    'blog_image',
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

                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <RHFSelect
                                name="blog_type"
                                label="Banner Type"
                                value={blogFor}
                                onChange={(e) => setBlogFor(e.target.value)}
                            >
                                <option value={null}>Banner Type</option>
                                <option value="blog_image">Image</option>
                                <option value="blog_video">Youtube</option>
                            </RHFSelect>
                        </Stack>
                    </Card>

                    {blogFor == 'blog_image' ? (
                        <Card sx={{ p: 3, mt: 3 }}>
                            <Stack spacing={3}>
                                <RHFUploadAvatar
                                    name="blog_image"
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
                                            <Box sx={{ mb: 0 }}>Attach Image</Box>
                                        </Typography>
                                    }
                                />
                            </Stack>
                        </Card>
                    ) : null}

                    {blogFor == 'blog_video' ? (
                        <Card sx={{ p: 3, mt: 3 }}>
                            <Stack spacing={3}>
                                <RHFTextField name="blog_video" label="Youtube" />
                            </Stack>
                        </Card>
                    ) : null}

                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={12}>
                                <RHFTextField name="blog_title" label="Blog title" />
                            </Grid>


                            <Grid item xs={12} md={6} lg={12}>
                                <Controller
                                    name="blog_posteddate"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <DatePicker
                                            label="Date Of Birth"
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
                            </Grid>

                            <Grid item xs={12} md={6} lg={12}>
                                <Stack spacing={1}>
                                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                        Description
                                    </Typography>
                                    <RHFEditor simple name="descriptions" />
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6} lg={12}>
                                <Controller
                                    name="blog_tag"
                                    control={control}
                                    render={({ field }) => (
                                        <Autocomplete
                                            multiple
                                            freeSolo
                                            onChange={(event, newValue) => field.onChange(newValue)}
                                            defaultValue={tags}
                                            options={TAGS_OPTION.map((option) => option)}
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                                                ))
                                            }
                                            renderInput={(params) => <TextField label="Tags" {...params} />}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <RHFTextField name="blog_postedby" label="Posted By" />
                            </Grid>
                        </Grid>

                        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                            <LoadingButton type="submit" variant="contained" loading={isLoading}>
                                {isEdit ? 'Update Now' : 'Post Now'}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
