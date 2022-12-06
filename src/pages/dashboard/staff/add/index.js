import Head from 'next/head';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { StaffAddForm } from '../../../../sections/@dashboard/staff';

StaffAdd.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function StaffAdd() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Head>
                <title>Staff: Add Staff</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                      heading="Create A New Staff"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Staff Management', href: PATH_DASHBOARD.staff.view },
                        { name: 'Add staff' },
                    ]}
                />

                <StaffAddForm />
            </Container>
        </>
    );
}
