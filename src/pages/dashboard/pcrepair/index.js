import { useEffect, useState } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';

// @mui 
import {
    Card, Container, Dialog, DialogTitle, Table, TableBody, TableContainer
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import 'react-toastify/dist/ReactToastify.css';
import { getCity } from '../../../../src/redux/slices/city';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Scrollbar from '../../../components/scrollbar';
import { useSettingsContext } from '../../../components/settings';
import {
    emptyRows, getComparator, TableEmptyRows,
    TableHeadCustom, TableNoData, TablePaginationCustom,
    TableSkeleton, useTable
} from '../../../components/table';
import {
    onCloseModal, onOpenModal
} from '../../../redux/slices/calendar';
import { getPcrepair } from '../../../redux/slices/pcrepair';
import { useDispatch, useSelector } from '../../../redux/store';
import { PCRepairForm, PCRepairTableRow, PCRepairTableToolbar } from '../../../sections/@dashboard/pcrepair';

const TABLE_HEAD = [
    { id: 'index', label: 'SNO', align: 'left' },
    { id: 'name', label: 'NAME', align: 'left' },
    { id: 'contact_no', label: 'CONTACT NO', align: 'left' },
    { id: 'email_id', label: 'EMAIL ID', align: 'left' },
    { id: 'coupon_code', label: 'COUPON CODE', align: 'left' },
    { id: 'city', label: 'CITY', align: 'left' },
    { id: '' },
];

const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Contact Number', key: 'contact_no' },
    { label: 'Email Id', key: 'email_id' },
    { label: 'City', key: 'city' },
    { label: 'Coupon Code', key: 'coupon_code' },
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

    const [filterName, setFilterName] = useState('');

    const [filterCity, setFilterCity] = useState('all')

    const [getDownload, setGetDownload] = useState([]);

    const dispatch = useDispatch();

    const { push } = useRouter();

    const { isLoading, allPcRepair } = useSelector((state) => state.pcrepair);
    const { allCity } = useSelector((state) => state?.city);

    useEffect(() => {
        dispatch(getPcrepair());
        dispatch(getCity());
    }, [dispatch]);

    useEffect(() => {
        if (allPcRepair?.length) {
            setTableData(allPcRepair);
        }
    }, [allPcRepair]);

    useEffect(() => {
        setGetDownload(allPcRepair);
    }, [allPcRepair]);

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(order, orderBy),
        filterName,
        filterCity,
    });

    const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const denseHeight = dense ? 52 : 72;

    const isNotFound =
        (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length) ||
        (!dataFiltered.length && !!filterCity);


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

    const handleFilterName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const handleFilterCity = (event) => {
        setFilterCity(event.target.value);
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
                
                <PCRepairTableToolbar
                        filterName={filterName}
                        onFilterName={handleFilterName}
                        filterCity={filterCity}
                        optionsCity={allCity}
                        onFilterCity={handleFilterCity}
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

function applyFilter({ inputData, comparator, filterName, filterCity }) {
    const stabilizedThis = inputData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });


    inputData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
        inputData = inputData.filter((user) =>
            user.name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
            user.email_id?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
            user.contact_no.indexOf(filterName) !== -1
        );
    }

    if (filterCity !== 'all') {
        console.log("filterCity",inputData)
        console.log("filterCity",filterCity)
        inputData = inputData?.filter((item) => item?.city.toLowerCase() === filterCity);
    }


    return inputData;
}
