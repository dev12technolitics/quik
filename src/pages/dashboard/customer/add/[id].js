import { paramCase } from 'change-case';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { CustomerAddForm } from '../../../../sections/@dashboard/customer';
import { useDispatch, useSelector } from "../../../../redux/store";
import { getOneCustomer } from '../../../../redux/slices/customer';

EditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function EditPage() {
    const { themeStretch } = useSettingsContext();

    const dispatch = useDispatch();

    const { oneCustomer } = useSelector((state) => state.customer)

    const { query } = useRouter();
    const { id } = query;

    useEffect(() => {
        dispatch(getOneCustomer(id));
    }, [dispatch, id]);

    return (
        <>
            <Head>
                <title>Customer Management : Edit Customer Management</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Edit Customer Management"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Customer Management', href: PATH_DASHBOARD.customer.view },
                        { name: oneCustomer?.name },
                    ]}
                />

                <CustomerAddForm isEdit oneCustomer={oneCustomer} id={id} />
            </Container>
        </>
    ); 
}