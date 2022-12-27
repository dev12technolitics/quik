import { Container } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import DashboardLayout from '../../../../layouts/dashboard';
import { getOneBrand } from '../../../../redux/slices/brand';
import { useDispatch, useSelector } from "../../../../redux/store";
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { BrandAddForm } from '../../../../sections/@dashboard/brand';

EditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function EditPage() {
    const { themeStretch } = useSettingsContext();

    const dispatch = useDispatch();

    const { oneBrand } = useSelector((state) => state.brand)

    const { query } = useRouter();
    const { id } = query;

    useEffect(() => {
        dispatch(getOneBrand(id));
    }, [dispatch, id]);

    return (
        <>
            <Head>
                <title>Mobile Brand: Edit Mobile Brand</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Edit Mobile Brand"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Mobile Brand', href: PATH_DASHBOARD.mobilebrand.view },
                        { name: oneBrand?.ban_title },
                    ]}
                />

                <BrandAddForm isEdit oneBrand={oneBrand} id={id} />
            </Container>
        </>
    );
}
