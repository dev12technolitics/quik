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
                <title>Brand : Add Brand</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                      heading="Create A New Brand"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Brand Management', href: PATH_DASHBOARD.brand.view },
                        { name: 'Add Brand' },
                    ]}
                />

                <BrandAddForm />
            </Container>
        </>
    );
}
