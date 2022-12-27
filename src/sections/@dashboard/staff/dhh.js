MULTIPAL DROPDWON WITH SELECT ALL BUTTON


import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField, Typography, DialogTitle } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { styled, useTheme } from '@mui/material/styles';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import {
    FormProvider,
    RHFEditor,
    RHFSelect,
    RHFTextField,
    RHFUploadMultiFile,
    RHFUploadSingleFile
} from '../../../components/hook-form';
import { getcategory, getgroupsdata } from '../../../redux/slices/groups';
import { postPosts, putPosts } from '../../../redux/slices/posts';
import { useDispatch, useSelector } from '../../../redux/store';
import { DialogAnimate } from '../../../components/animate';
import { openModal, closeModal } from '../../../redux/slices/calendar';
import GroupSelectAll from './GroupSelectAll';

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

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

export default function ProjectAddForm({ isEdit, id, postData }) {

    const [projectType, setProjectType] = useState();
    const [bannerFor, setBannerFor] = useState('');
    const [UserFor, setUserFor] = useState('All');
    const [categoryFor, setCategoryFor] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const userId = window.localStorage.getItem('userId');
    const [startday, setStartdate] = useState(new Date());
    const [endday, setEnddate] = useState(new Date());

    const { push } = useRouter();

    const theme = useTheme();

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setProjectType(typeof value === 'string' ? value.split(',') : value);
    };

    const { groupsalldata, categorydata } = useSelector((state) => state.groups);

    useEffect(() => {
        dispatch(getgroupsdata());
        dispatch(getcategory());
    }, [dispatch]);

    const NewBlogSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        category_id: Yup.string().required('Category is required'),
        user_type: Yup.string().required('User Type is required'),
        attachment_link: Yup.string().url('Attachment Link must be a valid URL'),
        vedio_url: Yup.string().url('Vedio Link must be a valid URL'),
        banner_video: Yup.string().url('Banner Link must be a valid URL'),
    });

    const defaultValues = {
        title: postData?.title?.length ? postData?.title : '',
        description: postData?.description ? postData?.description : '',
        images: postData?.images?.length ? postData?.images : [],
        attachment_link: postData?.attachment_link ? postData?.attachment_link : '',
        attachment_button: postData?.attachment_button ? postData?.attachment_button : '',
        start_datetime: postData?.start_datetime ? postData?.start_datetime : '',
        end_datetime: postData?.end_datetime ? postData?.end_datetime : '',
        banner_image: postData?.banner_image ? postData?.banner_image : '',
        banner_video: postData?.banner_video ? postData?.banner_video : '',
        vedio_url: postData?.vedio_url ? postData?.vedio_url : '',
        posted_by: postData?.posted_by ? postData?.posted_by : '',
        members: postData?.members ? postData?.members : [],
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
        register,
        formState: { isSubmitting, isValid },
    } = methods;

    useEffect(() => {
        if (isEdit && postData) {
            reset(defaultValues);
            setValue('user_type', postData?.user_type);
            setUserFor(postData?.user_type);
            setValue('banner_type', postData?.banner_type);
            setBannerFor(postData?.banner_type);
            setValue('category_id', postData?.category_id);
            setCategoryFor(postData?.category_id);
            setStartdate(postData?.start_datetime);
            setEnddate(postData?.end_datetime);
            setProjectType(postData?.members);
        } else {
            reset(defaultValues);
            setUserFor(postData?.user_type);
            setBannerFor(postData?.banner_type);
            setCategoryFor(postData?.category_id);
            setStartdate(postData?.start_datetime);
            setEnddate(postData?.end_datetime);
            setProjectType(['6394311db1c70d79641dac09']);
        }
    }, [isEdit, postData]);

    const values = watch();

    console.log("projectType", projectType);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            let formData = new FormData();
            formData.set('title', data.title);
            formData.set('user_type', UserFor);
            formData.set('members', JSON.stringify(projectType));
            formData.set('category_id', categoryFor);
            formData.set('start_date', startday);
            formData.set('end_date', endday);
            formData.set('banner_type', bannerFor);
            if (data.banner_image.path) {
                formData.append('banner_image', data.banner_image);
            } else {
                formData.set('banner_image', data.banner_image);
            }
            data.images?.map((item) => {
                formData.append('images', item);
            });
            formData.set('banner_video', data.banner_video);
            formData.set('description', data.description);
            formData.set('posted_by', userId);
            formData.set('vedio_url', data.vedio_url);
            formData.set('attachment_link', data.attachment_link);
            formData.set('attachment_button', data.attachment_button);
            isEdit
                ? dispatch(putPosts(id, formData, toast, push, reset, setIsLoading))
                : dispatch(postPosts(formData, toast, push, reset, setIsLoading));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDroptwo = useCallback(
        (acceptedFiles) => {
            const images = values.images || [];

            setValue('images', [
                ...images,
                ...acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                ),
            ]);
        },
        [setValue, values.images]
    );

    const handleRemoveAll = () => {
        setValue('images', []);
    };

    const handleRemove = (file) => {
        const filteredItems = values.images?.filter((_file) => _file !== file);
        setValue('images', filteredItems);
    };

    useEffect(() => {
        setEnddate(new Date());
        setStartdate(new Date());
        onSetUserFor('All');
    }, []);

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'banner_image',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    const onSetUserFor = (value) => {
        setUserFor(value);
        setValue('user_type', value);
    };

    const onsetCategory = (value) => {
        setCategoryFor(value);
        setValue('category_id', value);
    };

    const onsetBanner = (value) => {
        setBannerFor(value);
        setValue('banner_type', value);
    };


    const { isOpenModal } = useSelector((state) => state.calendar);

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const handleAddEvent = () => {
        dispatch(openModal());
    };

    return (
    <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <ToastContainer />

                <Grid container>
                    <Grid item xs={12} md={12}>
                        <Grid container>
                            <Grid item xs={12} md={8}>
                                <Card sx={{ p: 3 }}>
                                    <Stack spacing={3}>
                                        <RHFTextField name="title" label="Title" />

                                        <div>
                                            <LabelStyle>User Type</LabelStyle>
                                            <RHFSelect name="user_type" value={UserFor} onChange={(e) => onSetUserFor(e.target.value)}>
                                                <option value="All">All</option>
                                                <option value="Nar Members">Nar Members</option>
                                                <option value="Guest Users">Guest Users</option>
                                            </RHFSelect>
                                        </div>

                                        {UserFor == 'Nar Members' ? (
                                            <FormControl sx={{ m: 1, width: '100%' }}>
                                                <InputLabel id="demo-multiple-name-label">Salect Groups</InputLabel>
                                                <Select
                                                    labelId="demo-multiple-name-label"
                                                    id="demo-multiple-name"
                                                    multiple
                                                    value={projectType}
                                                    onChange={handleChange}
                                                    input={<OutlinedInput label="Salect Groups" />}
                                                    MenuProps={MenuProps}
                                                >
                                                    {groupsalldata?.map((items, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={items?.groupId}
                                                            style={getStyles(items?.groupId, projectType, theme)}
                                                        >
                                                            {items?.group_name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        ) : null}

                                        <div>
                                            <LabelStyle>Category</LabelStyle>
                                            <RHFSelect name="category_id" value={categoryFor} onChange={(e) => onsetCategory(e.target.value)}>
                                                <option value="">Select</option>
                                                {categorydata.map((item, index) => (
                                                    <option key={index} value={item._id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </RHFSelect>
                                        </div>

                                        {categoryFor == '636f6b66f365335b50a5dd7d' ? (
                                            <>
                                                <DateTimePicker
                                                    label="Start Date/Time"
                                                    name="start_datetime"
                                                    value={startday}
                                                    onChange={(newValue) => {
                                                        setStartdate(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />

                                                <DateTimePicker
                                                    label="End Date/Time"
                                                    name="end_datetime"
                                                    value={endday}
                                                    onChange={(newValue) => {
                                                        setEnddate(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </>
                                        ) : null}

                                        {categoryFor == '636f6b6ff365335b50a5dd7f' ? (
                                            <>
                                                <DateTimePicker
                                                    label="Start Date/Time"
                                                    name="end_datetime"
                                                    value={startday}
                                                    onChange={(newValue) => {
                                                        setStartdate(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />

                                                <DateTimePicker
                                                    label="End Date/Time"
                                                    name="end_datetime"
                                                    value={endday}
                                                    onChange={(newValue) => {
                                                        setEnddate(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </>
                                        ) : null}

                                        <div>
                                            <LabelStyle>Banner Type</LabelStyle>
                                            <RHFSelect name="banner_type" value={bannerFor} onChange={(e) => onsetBanner(e.target.value)}>
                                                <option value="">Select</option>
                                                <option value="Images">Images</option>
                                                <option value="video">Video</option>
                                            </RHFSelect>
                                        </div>

                                        {bannerFor == 'video' ? <RHFTextField name="banner_video" label="Video" /> : null}

                                        {bannerFor == 'Images' ? (
                                            <div>
                                                <LabelStyle>Banner Image</LabelStyle>
                                                <RHFUploadSingleFile
                                                    name="banner_image"
                                                    accept="image/*"
                                                    maxSize={3145728}
                                                    onDrop={handleDrop}
                                                />
                                            </div>
                                        ) : null}

                                        <div>
                                            <LabelStyle>Description</LabelStyle>
                                            <RHFEditor simple name="description" />
                                        </div>

                                        <div>
                                            <LabelStyle>images</LabelStyle>
                                            <RHFUploadMultiFile
                                                showPreview
                                                accept=" .pdf, .png, .jpg, .jpeg , .svg"
                                                name="images"
                                                onDrop={handleDroptwo}
                                                onRemove={handleRemove}
                                                onRemoveAll={handleRemoveAll}
                                                onUpload={() => console.log('ON UPLOAD')}
                                            />
                                        </div>

                                        <RHFTextField name="vedio_url" label="Attach A Video" />

                                        <RHFTextField name="attachment_link" label="Attachment Link" />

                                        <RHFTextField name="attachment_button" label="Attachment Button Name" />
                                    </Stack>
                                </Card>

                                <Stack import { yupResolver} from '@hookform/resolvers/yup';
                                import {LoadingButton} from '@mui/lab';
                                import {Card, Grid, Stack, TextField, Typography, DialogTitle} from '@mui/material';
                                import FormControl from '@mui/material/FormControl';
                                import InputLabel from '@mui/material/InputLabel';
                                import MenuItem from '@mui/material/MenuItem';
                                import OutlinedInput from '@mui/material/OutlinedInput';
                                import Select from '@mui/material/Select';
                                import {styled, useTheme} from '@mui/material/styles';
                                import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
                                import {useRouter} from 'next/router';
                                import {useCallback, useEffect, useState} from 'react';
                                import {useForm} from 'react-hook-form';
                                import {toast, ToastContainer} from 'react-toastify';
                                import 'react-toastify/dist/ReactToastify.css';
                                import * as Yup from 'yup';
                                import {
                                    FormProvider,
                                    RHFEditor,
                                    RHFSelect,
                                    RHFTextField,
                                    RHFUploadMultiFile,
                                    RHFUploadSingleFile
                                } from '../../../components/hook-form';
                                import {getcategory, getgroupsdata} from '../../../redux/slices/groups';
                                import {postPosts, putPosts} from '../../../redux/slices/posts';
                                import {useDispatch, useSelector} from '../../../redux/store';
                                import {DialogAnimate} from '../../../components/animate';
                                import {openModal, closeModal} from '../../../redux/slices/calendar';
                                import GroupSelectAll from './GroupSelectAll';

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

                                const LabelStyle = styled(Typography)(({theme}) => ({
                                    ...theme.typography.subtitle2,
                                    color: theme.palette.text.secondary,
                                marginBottom: theme.spacing(1),
}));

                                export default function ProjectAddForm({isEdit, id, postData}) {

  const [projectType, setProjectType] = useState();
                                const [bannerFor, setBannerFor] = useState('');
                                const [UserFor, setUserFor] = useState('All');
                                const [categoryFor, setCategoryFor] = useState('');
                                const [isLoading, setIsLoading] = useState(false);
                                const userId = window.localStorage.getItem('userId');
                                const [startday, setStartdate] = useState(new Date());
                                const [endday, setEnddate] = useState(new Date());

                                const {push} = useRouter();

                                const theme = useTheme();

                                const dispatch = useDispatch();

  const handleChange = (event) => {
    const {
                                    target: {value},
    } = event;
                                setProjectType(typeof value === 'string' ? value.split(',') : value);
  };

                                const {groupsalldata, categorydata} = useSelector((state) => state.groups);

  useEffect(() => {
                                    dispatch(getgroupsdata());
                                dispatch(getcategory());
  }, [dispatch]);

                                const NewBlogSchema = Yup.object().shape({
                                    title: Yup.string().required('Title is required'),
                                category_id: Yup.string().required('Category is required'),
                                user_type: Yup.string().required('User Type is required'),
                                attachment_link: Yup.string().url('Attachment Link must be a valid URL'),
                                vedio_url: Yup.string().url('Vedio Link must be a valid URL'),
                                banner_video: Yup.string().url('Banner Link must be a valid URL'),
  });

                                const defaultValues = {
                                    title: postData?.title?.length ? postData?.title : '',
                                description: postData?.description ? postData?.description : '',
                                images: postData?.images?.length ? postData?.images : [],
                                attachment_link: postData?.attachment_link ? postData?.attachment_link : '',
                                attachment_button: postData?.attachment_button ? postData?.attachment_button : '',
                                start_datetime: postData?.start_datetime ? postData?.start_datetime : '',
                                end_datetime: postData?.end_datetime ? postData?.end_datetime : '',
                                banner_image: postData?.banner_image ? postData?.banner_image : '',
                                banner_video: postData?.banner_video ? postData?.banner_video : '',
                                vedio_url: postData?.vedio_url ? postData?.vedio_url : '',
                                posted_by: postData?.posted_by ? postData?.posted_by : '',
                                members: postData?.members ? postData?.members : [],
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
                                    register,
                                    formState: {isSubmitting, isValid},
  } = methods;

  useEffect(() => {
    if (isEdit && postData) {
                                    reset(defaultValues);
                                setValue('user_type', postData?.user_type);
                                setUserFor(postData?.user_type);
                                setValue('banner_type', postData?.banner_type);
                                setBannerFor(postData?.banner_type);
                                setValue('category_id', postData?.category_id);
                                setCategoryFor(postData?.category_id);
                                setStartdate(postData?.start_datetime);
                                setEnddate(postData?.end_datetime);
                                setProjectType(postData?.members);
    } else {
                                    reset(defaultValues);
                                setUserFor(postData?.user_type);
                                setBannerFor(postData?.banner_type);
                                setCategoryFor(postData?.category_id);
                                setStartdate(postData?.start_datetime);
                                setEnddate(postData?.end_datetime);
                                setProjectType(['6394311db1c70d79641dac09']);
    }
  }, [isEdit, postData]);

                                const values = watch();

                                console.log("projectType", projectType);

  const onSubmit = async (data) => {
                                    setIsLoading(true);
                                try {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                let formData = new FormData();
                                formData.set('title', data.title);
                                formData.set('user_type', UserFor);
                                formData.set('members', JSON.stringify(projectType));
                                formData.set('category_id', categoryFor);
                                formData.set('start_date', startday);
                                formData.set('end_date', endday);
                                formData.set('banner_type', bannerFor);
                                if (data.banner_image.path) {
                                    formData.append('banner_image', data.banner_image);
      } else {
                                    formData.set('banner_image', data.banner_image);
      }
      data.images?.map((item) => {
                                    formData.append('images', item);
      });
                                formData.set('banner_video', data.banner_video);
                                formData.set('description', data.description);
                                formData.set('posted_by', userId);
                                formData.set('vedio_url', data.vedio_url);
                                formData.set('attachment_link', data.attachment_link);
                                formData.set('attachment_button', data.attachment_button);
                                isEdit
                                ? dispatch(putPosts(id, formData, toast, push, reset, setIsLoading))
                                : dispatch(postPosts(formData, toast, push, reset, setIsLoading));
    } catch (error) {
                                    console.error(error);
    }
  };

                                const handleDroptwo = useCallback(
    (acceptedFiles) => {
      const images = values.images || [];

                                setValue('images', [
                                ...images,
        ...acceptedFiles.map((file) =>
                                Object.assign(file, {
                                    preview: URL.createObjectURL(file),
          })
                                ),
                                ]);
    },
                                [setValue, values.images]
                                );

  const handleRemoveAll = () => {
                                    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
                                setValue('images', filteredItems);
  };

  useEffect(() => {
                                    setEnddate(new Date());
                                setStartdate(new Date());
                                onSetUserFor('All');
  }, []);

                                const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

                                if (file) {
                                    setValue(
                                        'banner_image',
                                        Object.assign(file, {
                                            preview: URL.createObjectURL(file),
                                        })
                                    );
      }
    },
                                [setValue]
                                );

  const onSetUserFor = (value) => {
                                    setUserFor(value);
                                setValue('user_type', value);
  };

  const onsetCategory = (value) => {
                                    setCategoryFor(value);
                                setValue('category_id', value);
  };

  const onsetBanner = (value) => {
                                    setBannerFor(value);
                                setValue('banner_type', value);
  };


                                const {isOpenModal} = useSelector((state) => state.calendar);

  const handleCloseModal = () => {
                                    dispatch(closeModal());
  };

  const handleAddEvent = () => {
                                    dispatch(openModal());
  };

                                return (
    <>
                                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                                        <ToastContainer />

                                        <Grid container>
                                            <Grid item xs={12} md={12}>
                                                <Grid container>
                                                    <Grid item xs={12} md={8}>
                                                        <Card sx={{ p: 3 }}>
                                                            <Stack spacing={3}>
                                                                <RHFTextField name="title" label="Title" />

                                                                <div>
                                                                    <LabelStyle>User Type</LabelStyle>
                                                                    <RHFSelect name="user_type" value={UserFor} onChange={(e) => onSetUserFor(e.target.value)}>
                                                                        <option value="All">All</option>
                                                                        <option value="Nar Members">Nar Members</option>
                                                                        <option value="Guest Users">Guest Users</option>
                                                                    </RHFSelect>
                                                                </div>

                                                                {UserFor == 'Nar Members' ? (
                                                                    <FormControl sx={{ m: 1, width: '100%' }}>
                                                                        <InputLabel id="demo-multiple-name-label">Salect Groups</InputLabel>
                                                                        <Select
                                                                            labelId="demo-multiple-name-label"
                                                                            id="demo-multiple-name"
                                                                            multiple
                                                                            value={projectType}
                                                                            onChange={handleChange}
                                                                            input={<OutlinedInput label="Salect Groups" />}
                                                                            MenuProps={MenuProps}
                                                                            onClick={() => handleAddEvent()}
                                                                        >
                                                                            {groupsalldata?.map((items, index) => (
                                                                                <MenuItem
                                                                                    key={index}
                                                                                    value={items?.groupId}
                                                                                    style={getStyles(items?.groupId, projectType, theme)}
                                                                                >
                                                                                    {items?.group_name}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    </FormControl>
                                                                ) : nul