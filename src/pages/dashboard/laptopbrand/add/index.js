import Head from 'next/head';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { LaptopBrandAddForm } from '../../../../sections/@dashboard/laptopbrand';

LaptopBrandAdd.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function LaptopBrandAdd() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Head>
                <title>Laptop Brand : Add Laptop Brand</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                      heading="Create A Laptop Brand"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Laptop Brand', href: PATH_DASHBOARD.laptopbrand.view },
                        { name: 'Add Laptop Brand' },
                    ]}
                />

                <LaptopBrandAddForm />
            </Container>
        </>
    );
}
