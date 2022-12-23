import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, Box } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSelector, useDispatch } from "../../../redux/store"
import { useSnackbar } from '../../../components/snackbar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormProvider, {
    RHFSwitch,
    RHFSelect,
    RHFEditor,
    RHFUpload,
    RHFTextField,
    RHFUploadAvatar,
} from '../../../components/hook-form';
import { putBlogmanagements, postBlogmanagements } from "../../../redux/slices/blogmanagement";
import { Controller } from 'react-hook-form';
import Image from '../../../components/image';

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
    const { blog_image } = blogsData;

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
        if (blogsData) {
            console.log("blogsData", blogsData)
            reset(defaultValues);
            setBlogFor(blogsData?.blog_type);
            setTags(blogsData?.blog_tag);
            setFilterStartDate(blogsData?.blog_posteddate);
        } else {
            reset(defaultValues);
        }
    }, [blogsData]);


    return (
        <FormProvider methods={methods} >
            <ToastContainer />
            <Grid container spacing={3}>

                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <RHFSelect
                                disabled
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
                        <Card sx={{ py: 3, px: 2 , mt:3}}>
                            <Image
                                alt="Attach Image"
                                src={blog_image}
                                style={{
                                    borderRadius: "16px", objectFit: "fill",
                                    height: "200px"
                                }}
                            />
                        </Card>
                    ) : null}

                    {blogFor == 'blog_video' ? (
                        <Card sx={{ p: 3, mt: 3 }}>
                            <Stack spacing={3}>
                                <RHFTextField name="blog_video" label="Youtube" inputProps={{ readOnly: true }} />
                            </Stack>
                        </Card>
                    ) : null}

                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={12}>
                                <RHFTextField name="blog_title" label="Blog title" inputProps={{ readOnly: true }} />
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
                                    <RHFEditor simple name="descriptions" inputProps={{ readOnly: true }} />
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6} lg={12}>
                                <Controller
                                    name="blog_tag" disabled
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
                                <RHFTextField name="blog_postedby" label="Posted By" inputProps={{ readOnly: true }} />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
