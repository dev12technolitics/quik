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
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
// sections
import { getOnePosts } from '../../../../redux/slices/posts';
import { useDispatch, useSelector } from "../../../../redux/store";
import { PostsAddForm } from '../../../../sections/@dashboard/posts';

// ----------------------------------------------------------------------

PostsEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PostsEditPage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
  const { oneposts } = useSelector((state) => state.post)
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    dispatch(getOnePosts(id));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title> Notification: Edit Notification </title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Notification"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Notification',
              href: PATH_DASHBOARD.notification.view,
            },
            { name: oneposts?.title },
          ]}
        />

        <PostsAddForm isEdit oneposts={oneposts} id={id} />
      </Container>
    </>
  );
}
