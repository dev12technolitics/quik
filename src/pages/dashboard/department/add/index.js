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
import { DepartmentAddForm } from '../../../../sections/@dashboard/department';

// ----------------------------------------------------------------------

DepartmentPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function DepartmentPage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
  

  return (
    <>
      <Head>
        <title>Create a new Department </title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add Department"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'department',
              href: PATH_DASHBOARD.department.add,
            },
            { name:"New Department" },
          ]}
        />
        <DepartmentAddForm/>
      </Container>
    </>
  );
}
