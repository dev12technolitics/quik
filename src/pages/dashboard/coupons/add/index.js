import Head from 'next/head';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { CouponsAddForm } from '../../../../sections/@dashboard/coupons';

CouponAdd.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function CouponAdd() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Head>
                <title>Coupons : Add Coupons</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                      heading="Create A New Coupons"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Coupons', href: PATH_DASHBOARD.coupons.view },
                        { name: 'Add Coupons' },
                    ]}
                />

                <CouponsAddForm />
            </Container>
        </>
    );
}
