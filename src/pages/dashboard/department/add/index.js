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
import { DepartmentAddForm } from '../../../../sections/@dashboard/department';
import {useDispatch, useSelector} from "../../../../redux/store";
import { getOneDepartments } from '../../../../redux/slices/department';

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
