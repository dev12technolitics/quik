import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// next
import Head from 'next/head';
// @mui
import { Tab, Card, Tabs, Container, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// auth
import { useAuthContext } from '../../../../auth/useAuthContext';
// _mock_
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import Iconify from '../../../../components/iconify';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';

import {
    ChangePassword,
    StaffEdit
} from '../../../../sections/@dashboard/staff/tabs';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getOnestaff } from '../../../../../src/redux/slices/staff';

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
