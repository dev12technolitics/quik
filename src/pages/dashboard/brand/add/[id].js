import { paramCase } from 'change-case';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { BrandAddForm } from '../../../../sections/@dashboard/brand';
import { useDispatch, useSelector } from "../../../../redux/store";
import { getOneBrand } from '../../../../redux/slices/brand';

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
                <title>Brand: Edit Brand</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Edit Brand"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Brand Management', href: PATH_DASHBOARD.brand.view },
                        { name: oneBrand?.ban_title },
                    ]}
                />

                <BrandAddForm isEdit oneBrand={oneBrand} id={id} />
            </Container>
        </>
    );
}
