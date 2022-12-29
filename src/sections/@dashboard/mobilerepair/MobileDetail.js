import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import Image from '../../../components/image';
import { getBrand } from '../../../redux/slices/brand';
import { useDispatch, useSelector } from '../../../redux/store';
import axios from '../../../utils/axios';
import MobileDetailTimeline from './MobileDetailTimeline';

MobileDetail.propTypes = {
    isEdit: PropTypes.bool,
    currentUser: PropTypes.object,
};

export default function MobileDetail({ MobileData , id}) { 
    const { push } = useRouter();
    const dispatch = useDispatch();

    const [cityFor, setCityFor] = useState('');
    const [designationfor, setDesignationFor] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [applicationproceeding, setApplicationproceeding] = useState([]);

    const { allBrand } = useSelector((state) => state?.brand);

    console.log("allBrand", allBrand)
    console.log("MobileData", MobileData)

    const newbrand = allBrand.filter((item) => item.name == MobileData?.brand_name)

    const data = newbrand[0];
    console.log("data ", data?.logo)

    useEffect(() => {
        dispatch(getBrand());
    }, [dispatch]);

    const NewSchema = Yup.object().shape({
    });

    const defaultValues = {
        city: MobileData?.city ? MobileData?.city : '',
        locality: MobileData?.locality ? MobileData?.locality : '',
        contact_no: MobileData?.contact_no ? MobileData?.contact_no : '',
        brand_name: MobileData?.brand_name ? MobileData?.brand_name : '',
        model_no: MobileData?.model_no ? MobileData?.model_no : '',
        problem_facing: MobileData?.problem_facing ? MobileData?.problem_facing : '',
        name: MobileData?.name ? MobileData?.name : '',
        email_id: MobileData?.email_id ? MobileData?.email_id : '',
        pincode: MobileData?.pincode ? MobileData?.pincode : '',
        full_address: MobileData?.full_address ? MobileData?.full_address : '',
        date_time: MobileData?.date_time ? MobileData?.date_time : '',
        coupon_code: MobileData?.coupon_code ? MobileData?.coupon_code : '',
        service_id: MobileData?.service_id ? MobileData?.service_id : '',
    }



    const methods = useForm({
        resolver: yupResolver(NewSchema),
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
        if (MobileData) {
            reset(defaultValues);
            setDesignationFor(MobileData?.designation);
            setCityFor(MobileData?.city);
        }
    }, [MobileData]);


    useEffect(() => {
        const onGramApi = async (id) => {
          const response = await axios.get('/mobilestatus/all/' + id);
          console.log("response?.data?.mobilestatus", response?.data?.mobilestatus);
          setApplicationproceeding(response?.data?.mobilestatus);
        };
        onGramApi(id);
      }, [id]);
      
    
    return (
        <FormProvider methods={methods}>

            <Grid container >
                <Grid item xs={12} md={12}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} md={4}>
                            <Card sx={{ p: 3, mb: 2 }}>
                                <Box sx={{ mb: 1,display:'flex', justifyContent:'center' }}>
                                    <Image
                                        alt="Attach Image"
                                        src={data?.logo}
                                        style={{
                                            borderRadius: "50%", objectFit: "fill",
                                            height: "200px",
                                            width:"200px"
                                        }}
                                        objectFit="cover"
                                    />

                                </Box>
                            </Card>

                            {/* <MobileTimeline title="Order Timeline" /> */}
                            <MobileDetailTimeline
                             title="Order Timeline"
                             list= {applicationproceeding}
                            />
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Card sx={{ p: 3, mb: 2 }}>
                                <Stack spacing={3}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <RHFTextField name="name" label="Name" />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <RHFTextField name="contact_no" label="Contact No." />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <RHFTextField name="email_id" label="email_id" />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <RHFTextField name="city" label="city" />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <RHFTextField name="locality" label="locality" />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <RHFTextField name="brand_name" label="brand_name" />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <RHFTextField name="model_no" label="model_no" />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <RHFTextField name="problem_facing" label="problem_facing" />
                                        </Grid>



                                        <Grid item xs={12} md={6}>
                                            <RHFTextField name="pincode" label="pincode" />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <RHFTextField name="full_address" label="full_address" />
                                        </Grid>


                                        <Grid item xs={12} md={6}>
                                            <RHFTextField name="date_time" label="date_time" />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <RHFTextField name="service_id" label="service_id" />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <RHFTextField name="coupon_code" label="coupon_code" />
                                        </Grid>

                                    </Grid>
                                </Stack>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
