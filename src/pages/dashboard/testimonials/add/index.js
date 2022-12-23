import Head from 'next/head';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { TestimonialsAddForm } from '../../../../sections/@dashboard/testimonials';
import {useDispatch, useSelector} from "../../../../redux/store";

Add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function Add() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
    return (
    <>
      <Head>
        <title>Add Testimonials</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add Testimonials"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Testimonials', href: PATH_DASHBOARD.testimonials.view },
            { name:"New Testimonials" },
          ]}
        />
        <TestimonialsAddForm  />
      </Container>
    </>
  );
}


