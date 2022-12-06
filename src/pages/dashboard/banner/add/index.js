import { paramCase } from 'change-case';
// next
import Head from 'next/head';

import { useEffect } from 'react';

import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
// import { _userList } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import { BannerAddForm } from '../../../../sections/@dashboard/banner';
import {useDispatch, useSelector} from "../../../../redux/store";
import { getOnebanner } from '../../../../redux/slices/banner';

// ----------------------------------------------------------------------

BannerPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BannerPage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
  

  return (
    <>
      <Head>
        <title>Create a new Banner </title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add Banner"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Banner', href: PATH_DASHBOARD.banner.view },
            { name:"New Banner" },
          ]}
        />
        <BannerAddForm/>
      </Container>
    </>
  );
}
