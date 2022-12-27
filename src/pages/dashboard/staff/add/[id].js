import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Box, Container, Tab, Tabs } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// auth
// _mock_
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import Iconify from '../../../../components/iconify';
import { useSettingsContext } from '../../../../components/settings';

import { getOnestaff } from '../../../../../src/redux/slices/staff';
import { useDispatch, useSelector } from '../../../../redux/store';
import {
    ChangePassword,
    StaffEdit
} from '../../../../sections/@dashboard/staff/tabs';

EditStaff.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;


export default function EditStaff() {
   const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
  const { onestaff } = useSelector((state) => state.staff);
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    dispatch(getOnestaff(id));
  }, [dispatch, id]);


    const [currentTab, setCurrentTab] = useState('Staff Edit');

    const TABS = [
        {
            label: 'Staff Edit',
            value: 'Staff Edit',
            icon: <Iconify icon={'bxs:comment-edit'} width={20} height={20} />,
            component: <StaffEdit />,
        },

        {
            label: 'Change Password',
            value: 'Change Password',
            icon: <Iconify icon={'ri:lock-password-line'} width={20} height={20} />,
            component: <ChangePassword />,
        },

    ];

    return (
        <>
            <Head>
                <title>Staff : Edit Staff </title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Edit Staff"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Staff Management', href: PATH_DASHBOARD.staff.view },
                        { name: onestaff?.name },
                    ]}
                />
                <Box
                    sx={{
                        mb: 3,
                        height: 20,
                        position: 'relative',
                    }}
                >
                    <Tabs
                        value={currentTab}
                        onChange={(event, newValue) => setCurrentTab(newValue)}
                        sx={{
                            width: 1,
                            bottom: 0,
                            zIndex: 9,
                            position: 'absolute',
                            bgcolor: 'background.paper',
                            '& .MuiTabs-flexContainer': {
                                pr: { md: 3 },
                                justifyContent: {
                                    sm: 'center',
                                    md: 'flex-start',
                                },
                            },
                        }}
                    >
                        {TABS.map((tab) => (
                            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
                        ))}
                    </Tabs>
                </Box>

                {TABS.map((tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>)}
            </Container>
        </>
    );
}
