import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

// @mui
import {
    Tab,
    Tabs,
    Card,
    Table,
    Button,
    Tooltip,
    Divider,
    TableBody,
    Container,
    IconButton,
    TableContainer,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
import { _userList } from '../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import ConfirmDialog from '../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import {
    useTable,
    getComparator,
    emptyRows,
    TableNoData,
    TableEmptyRows,
    TableHeadCustom,
    TablePaginationCustom,
    TableSkeleton
} from '../../../components/table';
import { StaffTableToolbar, StaffTableRow } from '../../../sections/@dashboard/staff';
import { getstaff, deletestaff } from '../../../../src/redux/slices/staff';
import { useSelector, useDispatch } from '../../../redux/store';

const TABLE_HEAD = [
    { id: 'index', label: 'Sno', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'profile', label: 'Profile', align: 'left' },
    { id: 'contact_no', label: 'Contact No', align: 'left' },
    { id: 'designation', label: 'Designation', align: 'left' },
    { id: 'city', label: 'City', align: 'left' },
    { id: '', label: 'Status', align: 'left' },
    { id: '' },
];

const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Profile', key: 'profile' },
    { label: 'Contact No', key: 'contact_no' },
    { label: 'Designation', key: 'designation' },
    { label: 'City', key: 'city' },
];

Staff.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function Staff() {
    const {
        dense,
        page,
        order,
        orderBy,
        rowsPerPage,
        setPage,
        selected,
        setSelected,
        onSelectRow,
        onSelectAllRows,
        onSort,
        onChangeDense,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable();

    const { themeStretch } = useSettingsContext();

    const [tableData, setTableData] = useState([]);

    const [openConfirm, setOpenConfirm] = useState(false);

    const [filterName, setFilterName] = useState('');

    const [filterRole, setFilterRole] = useState('all');

    const [filterStatus, setFilterStatus] = useState('all');

    const [getDownload, setGetDownload] = useState([]);

    const dispatch = useDispatch();

    const { push } = useRouter();

    const { isLoading, allstaff } = useSelector((state) => state?.staff);

    useEffect(() => {
        dispatch(getstaff());
    }, [dispatch]);

    useEffect(() => {
        if (allstaff?.length) {
          setTableData(allstaff);
        }
      }, [allstaff]);
   
    useEffect(() => {
        setGetDownload(allstaff);
    }, [allstaff]);

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(order, orderBy),
        filterName,
        filterRole,
        filterStatus,
    });

    const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const denseHeight = dense ? 52 : 72;

    const isFiltered = filterName !== '' || filterRole !== 'all' || filterStatus !== 'all';

    const isNotFound =
        (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length) ||
        (!dataFiltered.length && !!filterRole) ||
        (!dataFiltered.length && !!filterStatus);


    const handleFilterName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

  
    const handleEditRow = (id) => {
        push(`/dashboard/staff/add/${id}`);
    };

    return (
        <>
            <Head>
                <title>Staff Management</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Staff Management"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Staff Management', href: PATH_DASHBOARD.staff.view },
                        { name: 'staff List' }
                    ]}
                    action={
                        <NextLink href={PATH_DASHBOARD.staff.add} passHref>
                            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                                New Staff
                            </Button>
                        </NextLink>
                    }
                />

                <Card>
                    <StaffTableToolbar
                        filterName={filterName}
                        onFilterName={handleFilterName}
                        headers={headers}
                        getDownload={getDownload}
                    />

                    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                        <Scrollbar>
                            <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={tableData.length}
                                    numSelected={selected.length}
                                    onSort={onSort}
                                    onSelectAllRows={(checked) =>
                                        onSelectAllRows(
                                            checked,
                                            tableData.map((row) => row.id)
                                        )
                                    }
                                />
                                <TableBody>
                                    {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) =>
                                            row ? (
                                                <StaffTableRow
                                                    key={row.id}
                                                    row={row}
                                                    index={index}
                                                    onEditRow={() => handleEditRow(row._id)}
                                                />
                                            ) : (
                                                !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                                            )
                                        )}
                                    <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                                    <TableNoData isNotFound={isNotFound} />
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </TableContainer>

                    <TablePaginationCustom
                        count={dataFiltered.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={onChangePage}
                        onRowsPerPageChange={onChangeRowsPerPage}
                        dense={dense}
                        onChangeDense={onChangeDense}
                    />
                </Card>
            </Container>
        </>
    );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterStatus, filterRole }) {
    const stabilizedThis = inputData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    console.log("inputData:", inputData);

    inputData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
        inputData = inputData.filter((user) =>
            user.name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
            user.city?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        );
    }

    return inputData;
}
