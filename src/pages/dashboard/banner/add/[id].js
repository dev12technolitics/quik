import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { BannerAddForm } from '../../../../sections/@dashboard/banner';
import {useDispatch, useSelector} from "../../../../redux/store";
import { getOnebanner } from '../../../../redux/slices/banner';


BannerEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;


export default function BannerEditPage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
  const  {oneBanner}  = useSelector((state)=>state.banner)
  const { query } = useRouter();
  const { id } = query;


useEffect(() => {
  dispatch(getOnebanner(id));
}, [dispatch, id]);

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
