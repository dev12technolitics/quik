import Head from 'next/head';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { BlogsAddForm } from '../../../../sections/@dashboard/blogs';
import { useDispatch, useSelector } from "../../../../redux/store";

Add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function Add() {
    const { themeStretch } = useSettingsContext();

    const dispatch = useDispatch();
    return (
        <>
            <Head>
                <title>Add Blog</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Add Blog"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Blog', href: PATH_DASHBOARD.blogmanagement.view },
                        { name: "New Blog" },
                    ]}
                />
                <BlogsAddForm />
            </Container>
        </>
    );
}


