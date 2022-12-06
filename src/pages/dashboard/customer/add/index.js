import Head from 'next/head';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { CustomerAddForm } from '../../../../sections/@dashboard/customer';

CustomerAdd.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function CustomerAdd() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Head>
                <title>Customer : Add Customer</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                      heading="Create A Customer Management"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Customer Management', href: PATH_DASHBOARD.customer.view },
                        { name: 'Add Customer' },
                    ]}
                />

                <CustomerAddForm />
            </Container>
        </>
    );
}
