import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { MobileDetail } from '../../../../sections/@dashboard/mobilerepair';
import {useDispatch, useSelector} from "../../../../redux/store";
import { getOneMobilerepair } from '../../../../redux/slices/mobilerepair';


Detail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function Detail() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
  const { oneMobilerepair } = useSelector((state) => state.mobilerepair);
  const { query } = useRouter();
  const { id } = query;
  useEffect(() => {
    dispatch(getOneMobilerepair(id));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>Mobile Repair : Detail Mobile Repair</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Mobile Repair"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Mobile Repair', href: PATH_DASHBOARD.mobilerepair.view },
            { name: oneMobilerepair?.service_id },
          ]}
        />
        
        <MobileDetail MobileData={oneMobilerepair} id={id}  />
      </Container>
    </>
  );
}
