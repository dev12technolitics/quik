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
import { MobileRepairTableRow } from '../../../sections/@dashboard/mobilerepair';

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

    const [openConfirm, setOpenConfirm] = useState(false);

    const [filterName, setFilterName] = useState('');

    const [filterRole, setFilterRole] = useState('all');

    const [filterStatus, setFilterStatus] = useState('all');

    const dispatch = useDispatch();

    const { push } = useRouter();

    const { isLoading, allMobileRepair } = useSelector((state) => state.mobilerepair);

    useEffect(() => {
        dispatch(getMobilerepair());
    }, [dispatch]);

    useEffect(() => {
        if (allMobileRepair?.length) {
            setTableData(allMobileRepair);
        }
    }, [allMobileRepair]);

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


    const handledetailRow = (id) => {
        push(`/dashboard/mobilerepair/detail/${id}`);
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
