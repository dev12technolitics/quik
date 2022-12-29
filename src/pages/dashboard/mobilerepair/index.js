import { useEffect, useState } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';

// @mui
import {
    Card, Container, Table, TableBody, TableContainer
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
import { getMobilerepair } from '../../../redux/slices/mobilerepair';
import { useDispatch, useSelector } from '../../../redux/store';
import { MobileRepairTableRow, MobilerepairTableToolbar } from '../../../sections/@dashboard/mobilerepair';

const TABLE_HEAD = [
    { id: 'index', label: 'SNO', align: 'left' },
    { id: 'service_id', label: 'SERVICE ID', align: 'left' },
    { id: 'name', label: 'NAME', align: 'left' },
    { id: 'contact_no', label: 'CONTACT NO', align: 'left' },
    { id: 'date_time', label: 'DATA/TIME', align: 'left' },
    { id: 'city', label: 'CITY', align: 'left' },
    { id: 'locality', label: 'LOCALITY', align: 'left' },
    { id: 'status', label: 'STATUS', align: 'left' },
    { id: '' },
];

const headers = [
    { label: 'Service Id', key: 'service_id' },
    { label: 'Name', key: 'name' },
    { label: 'Brand Name', key: 'brand_name' },
    { label: 'Model No', key: 'model_no' },
    { label: 'Contact Number', key: 'contact_no' },
    { label: 'City', key: 'city' },
    { label: 'Locality', key: 'locality' },
    { label: 'Pincode', key: 'pincode' },
    { label: 'Problem Facing', key: 'problem_facing' },
    { label: 'Full Address', key: 'full_address' },
    { label: 'Coupon_code', key: 'coupon_code' },
    { label: 'Date & Time', key: 'date_time' },
    { label: 'Status', key: 'status' },
];

Mobilerepair.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function Mobilerepair() {
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

    const { isLoading, allMobileRepair } = useSelector((state) => state.mobilerepair);
    const { allCity } = useSelector((state) => state?.city);

    useEffect(() => {
        dispatch(getMobilerepair());
        dispatch(getCity());
    }, [dispatch]);

    useEffect(() => {
        if (allMobileRepair?.length) {
            setTableData(allMobileRepair);
        }
    }, [allMobileRepair]);


    useEffect(() => {
        setGetDownload(allMobileRepair);
    }, [allMobileRepair]);

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

    const handledetailRow = (id) => {
        push(`/dashboard/mobilerepair/detail/${id}`);
    };

    const handleFilterCity = (event) => {
        setFilterCity(event.target.value);
    };
    const handleFilterName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };
    return (
        <>
            <Head>
                <title>Mobile Repair</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Mobile Repair"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Mobile Repair', href: PATH_DASHBOARD.mobilerepair.view },
                        { name: 'Mobile Repair List' }
                    ]}

                />

                <Card>
                    <MobilerepairTableToolbar
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
                                                <MobileRepairTableRow
                                                    key={row.id}
                                                    row={row}
                                                    index={index}
                                                    onDetailRow={() => handledetailRow(row._id)}
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

function applyFilter({ inputData, comparator, filterName, filterCity }) {
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
            user.service_id?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
            user.locality?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
            user.contact_no.indexOf(filterName) !== -1
        );
    }

    if (filterCity !== 'all') {
        inputData = inputData?.filter((item) => item?.city_name[0]?.city_name.toLowerCase() === filterCity);
    }

    return inputData;
}
