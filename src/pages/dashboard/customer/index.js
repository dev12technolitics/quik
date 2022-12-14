import { useEffect, useState } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
 
// @mui
import { Card, Container, Table, TableBody, TableContainer } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { getCity } from '../../../../src/redux/slices/city';
import { getCustomer } from '../../../../src/redux/slices/customer';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Scrollbar from '../../../components/scrollbar';
import { useSettingsContext } from '../../../components/settings';
import {
    emptyRows, getComparator, TableEmptyRows,
    TableHeadCustom, TableNoData, TablePaginationCustom,
    TableSkeleton, useTable
} from '../../../components/table';
import { useDispatch, useSelector } from '../../../redux/store';
import { CustomerTableRow, CustomerTableToolbar } from '../../../sections/@dashboard/customer';

const TABLE_HEAD = [
    { id: 'index', label: 'Sno', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'email_id', label: 'Email Id', align: 'left' },
    { id: 'contact_no', label: 'Contact No.', align: 'left' },
    { id: 'city', label: 'City', align: 'left' },
    { id: 'locality', label: 'Locality', align: 'left' },
    { id: 'address', label: 'Address', align: 'left' },
    { id: '' },
];
const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Eamil Id', key: 'email_id' },
    { label: 'Contact Number', key: 'contact_no' },
    { label: 'City', key: 'city' },
    { label: 'Status', key: 'status' },
];
Customer.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function Customer() {
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
    
    const { isLoading, allCustomer } = useSelector((state) => state?.customer);
    const { allCity } = useSelector((state) => state?.city);

    useEffect(() => {
        dispatch(getCustomer());
        dispatch(getCity());
    }, [dispatch]);

    useEffect(() => {
        if (allCustomer?.length) {
          setTableData(allCustomer);
        }
      }, [allCustomer]);

      useEffect(() => {
        setGetDownload(allCustomer);
    }, [allCustomer]);

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(order, orderBy),
        filterName,
        filterCity
    });

    const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const denseHeight = dense ? 52 : 72;


    const isNotFound =
        (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length) ||
        (!dataFiltered.length && !!filterCity);

   
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
                <title>Customer Management</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Customer Management"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Customer Management', href: PATH_DASHBOARD.customer.view },
                        { name: 'Customer List' }
                    ]}
                />

                <Card>
                <CustomerTableToolbar
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
                                                <CustomerTableRow
                                                    key={row.id}
                                                    row={row}
                                                    index={index}
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
        console.log("filterName", filterName)
        inputData = inputData.filter((user) =>
          user.name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
          user.email_id?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
          user.contact_no?.indexOf(filterName) !== -1
        );
      }
    
    if (filterCity !== 'all') {
        inputData = inputData?.filter((item) => item?.city === filterCity);
    }

    return inputData;
}
