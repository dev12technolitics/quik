import { paramCase } from 'change-case';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { CityAddForm } from '../../../../sections/@dashboard/city';
import { useDispatch, useSelector } from "../../../../redux/store";
import { getOneCity } from '../../../../redux/slices/city';

EditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function EditPage() {
    const { themeStretch } = useSettingsContext();

    const dispatch = useDispatch();
    const { oneCity } = useSelector((state) => state.city)
    const { query } = useRouter();
    const { id } = query;

    useEffect(() => {
        dispatch(getOneCity(id));
    }, [dispatch, id]);

    return (
        <>
            <Head>
                <title>City: Edit City </title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Edit City"
                    links={[
                        {
                            name: 'Dashboard',
                            href: PATH_DASHBOARD.root,
                        },
                        {
                            name: 'City Management',
                            href: PATH_DASHBOARD.city.add,
                        },
                        { name: oneCity?.city_name },
                    ]}
                />

                <CityAddForm isEdit oneCity={oneCity} id={id} />
            </Container>
        </>
    );
}
