import Head from 'next/head';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { BrandAddForm } from '../../../../sections/@dashboard/brand';

BrandAdd.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function BrandAdd() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Head>
                <title>Mobile Brand : Add Mobile Brand</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                      heading="Create A New Brand"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Mobile Brand', href: PATH_DASHBOARD.mobilebrand.view },
                        { name: 'Add Mobile Brand' },
                    ]}
                />

                <BrandAddForm />
            </Container>
        </>
    );
}
