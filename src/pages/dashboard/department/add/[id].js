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
import { getOneDepartments } from '../../../../redux/slices/department';
import { useDispatch, useSelector } from "../../../../redux/store";
import { DepartmentAddForm } from '../../../../sections/@dashboard/department';

// ----------------------------------------------------------------------

DepartmentEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function DepartmentEditPage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
  const  {onedepartments}  = useSelector((state)=>state.department)
  const { query } = useRouter();
  const { id } = query;


  // const {
  //   query: { id },
  // } = useRouter();

  // const currentUser = _userList.find((user) => paramCase(user.name) === name);


//   const onestaffs = useSelector(state => {
//     // console.log("useSelector rerendering");
//     return state.staff.onestaff
// }, shallowEqual)


useEffect(() => {
  dispatch(getOneDepartments(id));
}, [dispatch, id]);

  // console.log("currentuserqweqOne",useSelector((state)=>state.banner));
//   console.log("currentuserqweqName",useSelector((state)=>state.staff.onestaff.contact_no));
  console.log("currentuserV",onedepartments);




  return (
    <>
      <Head>
        <title> Department: Edit department </title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit department"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Department',
              href: PATH_DASHBOARD.department.view,
            },
            { name: onedepartments?.department },
          ]}
        />

        <DepartmentAddForm isEdit onedepartments={onedepartments} id={id} />
      </Container>
    </>
  );
}
