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
import { DesignationAddForm } from '../../../../sections/@dashboard/designation';
import {useDispatch, useSelector} from "../../../../redux/store";
import { getOneDesignation } from '../../../../redux/slices/designation';

// ----------------------------------------------------------------------

DesignationEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function DesignationEditPage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
  const { query } = useRouter();
  const { id } = query;  
  const  { onedesignation }  = useSelector((state)=>state.designation);
useEffect(() => {
  dispatch(getOneDesignation(id));
}, [dispatch, id]);

// console.log("One designation",useSelector((state)=>state.designation))
// console.log("Onedesignation:",onedesignation)

  return (
    <>
      <Head>
        <title> Designation: Edit designation </title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Designation"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Designation',
              href: PATH_DASHBOARD.designation.view,
            },
            { name: onedesignation?.designations },
          ]}
        />

        <DesignationAddForm isEdit oneDesignation={onedesignation} id={id} />
      </Container>
    </>
  );
}
