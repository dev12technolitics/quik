import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { BlogsDetail } from '../../../../sections/@dashboard/blogs';
import {useDispatch, useSelector} from "../../../../redux/store";
import { getOneBlogmanagement } from '../../../../redux/slices/blogmanagement';


Detail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function Detail() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
  const { oneBlogmanagement } = useSelector((state) => state.blogmanagement);
  const { query } = useRouter();
  const { id } = query;
  useEffect(() => {
    dispatch(getOneBlogmanagement(id));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>Blog: Detail Blog</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Detail Banner"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blogmanagement.view },
            { name: oneBlogmanagement?.blog_title },
          ]}
        />
        
        <BlogsDetail blogsData={oneBlogmanagement} id={id}  />
      </Container>
    </>
  );
}
