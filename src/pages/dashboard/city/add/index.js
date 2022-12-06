import Head from 'next/head';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { CityAddForm } from '../../../../sections/@dashboard/city';

CityAdd.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function CityAdd() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Head>
                <title>City : Add City</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                      heading="Create A New City"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'City Management', href: PATH_DASHBOARD.city.view },
                        { name: 'Add City' },
                    ]}
                />

                <CityAddForm />
            </Container>
        </>
    );
}
