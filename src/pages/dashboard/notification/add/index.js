  // next
import Head from 'next/head';


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
import { useDispatch } from "../../../../redux/store";
import { PostsAddForm } from '../../../../sections/@dashboard/posts';
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


