import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSettingsContext } from '../../../../components/settings';
import DashboardLayout from '../../../../layouts/dashboard';
 
import { getOnestaff } from '../../../../../src/redux/slices/staff';
import { useDispatch, useSelector } from '../../../../redux/store';
import StaffEditForm from './StaffEditForm';

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
