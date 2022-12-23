import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { TestimonialsAddForm } from '../../../../sections/@dashboard/testimonials';
import { useDispatch, useSelector } from "../../../../redux/store";
import { getOneTestimonial } from '../../../../redux/slices/testimonial';

EditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function EditPage() {
    const { themeStretch } = useSettingsContext();
    const dispatch = useDispatch();
    const { oneTestimonial } = useSelector((state) => state.testimonial);
    const { query } = useRouter();
    const { id } = query;
    useEffect(() => {
      dispatch(getOneTestimonial(id));
    }, [dispatch, id]);

    return (
        <>
            <Head>
                <title> Testimonials: Edit Testimonials </title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Edit Testimonials"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Testimonials', href: PATH_DASHBOARD.testimonials.view },
                        { name: oneTestimonial?.test_name },
                    ]}
                />
                <TestimonialsAddForm isEdit testimonialsData={oneTestimonial} id={id} />
            </Container>
        </>
    );
}
