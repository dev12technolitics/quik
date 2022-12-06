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
import { PostsAddForm } from '../../../../sections/@dashboard/posts';
import {useDispatch, useSelector} from "../../../../redux/store";
// import { getOnebanner } from '../../../../redux/slices/banner';

// ----------------------------------------------------------------------

PostsAddIndex.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PostsAddIndex() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
  

  return (
    <>
      <Head>
        <title>Add Notification</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add Notification"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Notification',
              href: PATH_DASHBOARD.notification.view,
            },
            { name:"New Notification" },
          ]}
        />
        <PostsAddForm/>
      </Container>
    </>
  );
}


