import { Container } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import DashboardLayout from '../../../../layouts/dashboard';
import { getOneLaptop } from '../../../../redux/slices/laptopbrand';
import { useDispatch, useSelector } from "../../../../redux/store";
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { LaptopBrandAddForm } from '../../../../sections/@dashboard/laptopbrand';

LaptopEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function LaptopEditPage() {
    const { themeStretch } = useSettingsContext();

    const dispatch = useDispatch();

    const { onelaptopbrand } = useSelector((state) => state.laptopbrand)

    const { query } = useRouter();
    const { id } = query;

    useEffect(() => {
        dispatch(getOneLaptop(id));
    }, [dispatch, id]);

    return (
        <>
            <Head>
                <title>Laptop Brand: Edit Laptop Brand</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Edit Laptop Brand"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Laptop Brand', href: PATH_DASHBOARD.laptopbrand.view },
                        { name: onelaptopbrand?.brand_name },
                    ]}
                />

                <LaptopBrandAddForm isEdit onelaptopbrand={onelaptopbrand} id={id} />
            </Container>
        </>
    );
}
