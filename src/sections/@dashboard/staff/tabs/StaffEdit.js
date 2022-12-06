import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from '../../../../_mock/arrays';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';

import StaffEditForm from './StaffEditForm';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getOnestaff } from '../../../../../src/redux/slices/staff';

StaffEdit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function StaffEdit() {
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
            <StaffEditForm isEdit staffData={onestaff} id={id} />
        </>
    );
}
