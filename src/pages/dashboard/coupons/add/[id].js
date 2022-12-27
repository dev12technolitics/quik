import { Container } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import DashboardLayout from '../../../../layouts/dashboard';
import { getOneCoupon } from '../../../../redux/slices/coupons';
import { useDispatch, useSelector } from "../../../../redux/store";
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { CouponsAddForm } from '../../../../sections/@dashboard/coupons';

CouponsEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function CouponsEditPage() {
    const { themeStretch } = useSettingsContext();

    const dispatch = useDispatch();

    const { oneCoupon } = useSelector((state) => state.coupons)

    const { query } = useRouter();
    const { id } = query;

    useEffect(() => {
        dispatch(getOneCoupon(id));
    }, [dispatch, id]);

    return (
        <>
            <Head>
                <title>Coupons: Edit Coupons</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Edit Coupons"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Coupons', href: PATH_DASHBOARD.coupons.view },
                        { name: oneCoupon?.coupon_name },
                    ]}
                />

                <CouponsAddForm isEdit oneCoupon={oneCoupon} id={id} />
            </Container>
        </>
    );
}
