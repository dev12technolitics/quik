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
import { DesignationAddForm } from '../../../../sections/@dashboard/designation';
// import { getOneDesignation } from '../../../../redux/slices/designation';

// ----------------------------------------------------------------------

DesignationPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function DesignationPage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
  

  return (
    <>
      <Head>
        <title>Create a new Designation </title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add Designation"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Designation',
              href: PATH_DASHBOARD.designation.view,
            },
            { name:"New Designation" },
          ]}
        />
        <DesignationAddForm/>
      </Container>
    </>
  );
}
