import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from '../../../../_mock/arrays';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';

import ChangePasswordForm from './ChangePasswordForm';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getOnestaff } from '../../../../../src/redux/slices/staff';

ChangePassword.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function ChangePassword() {
    const { themeStretch } = useSettingsContext();

    const dispatch = useDispatch();
    const { onestaff } = useSelector((state) => state.staff);
    const { query } = useRouter();
    const { id } = query;

    useEffect(() => {
        dispatch(getOnestaff(id));
    }, [dispatch, id]);

    return (
        <>
            <ChangePasswordForm isEdit staffData={onestaff} id={id} />
        </>
    );
}
