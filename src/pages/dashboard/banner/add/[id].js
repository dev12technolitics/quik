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

BannerEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BannerEditPage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
  const  {oneBanner}  = useSelector((state)=>state.banner)
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
  dispatch(getOnebanner(id));
}, [dispatch, id]);

  // console.log("currentuserqweqOne",useSelector((state)=>state.banner));
//   console.log("currentuserqweqName",useSelector((state)=>state.staff.onestaff.contact_no));
//   console.log("currentuserV",onestaffs);




  return (
    <>
      <Head>
        <title> Banner: Edit banner </title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Banner"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Banner', href: PATH_DASHBOARD.banner.view },
            { name: oneBanner?.ban_title },
          ]}
        />

        <BannerAddForm isEdit oneBanner={oneBanner} id={id} />
      </Container>
    </>
  );
}
