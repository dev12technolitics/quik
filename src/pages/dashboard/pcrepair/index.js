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
    DialogTitle, Dialog,
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
import { useSelector, useDispatch } from '../../../redux/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PCRepairTableRow, PCRepairForm } from '../../../sections/@dashboard/pcrepair';
import { getPcrepair } from '../../../redux/slices/pcrepair';
import {
    onOpenModal,
    onCloseModal,
} from '../../../redux/slices/calendar';

const TABLE_HEAD = [
    { id: 'index', label: 'SNO', align: 'left' },
    { id: 'name', label: 'NAME', align: 'left' },
    { id: 'contact_no', label: 'CONTACT NO', align: 'left' },
    { id: 'email_id', label: 'EMAIL ID', align: 'left' },
    { id: 'coupon_code', label: 'COUPON CODE', align: 'left' },
    { id: 'city', label: 'CITY', align: 'left' },
    { id: '' },
];

Pcrepair.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function Pcrepair() {
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

    const dispatch = useDispatch();

    const { push } = useRouter();

    const { isLoading, allPcRepair } = useSelector((state) => state.pcrepair);

    useEffect(() => {
        dispatch(getPcrepair());
    }, [dispatch]);

    useEffect(() => {
        if (allPcRepair?.length) {
            setTableData(allPcRepair);
        }
    }, [allPcRepair]);

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

    const [onChangeData, setOnChangeData] = useState({});

    const { openModal } = useSelector((state) => state.calendar);

    const handleCloseModal = () => {
        dispatch(onCloseModal());
    };

    const handleAddEvent = (value) => {
        setOnChangeData({
            locality: value?.locality || "",
            full_address: value?.full_address || "",
            remarks: value?.remarks || "",
        })
        dispatch(onOpenModal());
    };

    return (
        <>
            <Head>
                <title>PC Repair</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="PC Repair"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'PC Repair', href: PATH_DASHBOARD.pcrepair.view },
                        { name: 'PC Repair List' }
                    ]}

                />

                <Card>
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
                                                <PCRepairTableRow
                                                    key={row.id}
                                                    row={row}
                                                    index={index}
                                                    onOpenDialog={() => handleAddEvent(row)}
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

            <Dialog fullWidth maxWidth="xs" open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Details</DialogTitle>
                <PCRepairForm
                    onCancel={handleCloseModal}
                    remarks={onChangeData?.remarks}
                    locality={onChangeData?.locality}
                    address={onChangeData?.full_address}
                />
            </Dialog>
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

    // if (filterName) {
    //     inputData = inputData.filter((user) =>
    //         user.name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
    //         user.city?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    //     );
    // }

    return inputData;
}
