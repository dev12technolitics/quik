import { useEffect, useState } from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
     
// @mui
import {
    Button, Card, Container, Table, TableBody, TableContainer
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { useSettingsContext } from '../../../components/settings';
import {
    emptyRows, getComparator, TableEmptyRows,
    TableHeadCustom, TableNoData, TablePaginationCustom,
    TableSkeleton, useTable
} from '../../../components/table';
import { deleteBrand, getBrand } from '../../../redux/slices/brand';
import { useDispatch, useSelector } from '../../../redux/store';
import { BrandTableRow } from '../../../sections/@dashboard/brand';

const TABLE_HEAD = [
    { id: 'index', label: 'Sno', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'logo', label: 'Logo', align: 'left' },
    { id: '', label: 'Status', align: 'left' },
    { id: '' },
];

Brand.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function Brand() {
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
    
    const { isLoading, allBrand } = useSelector((state) => state?.brand);

    useEffect(() => {
        dispatch(getBrand());
    }, [dispatch]);

    useEffect(() => {
        if (allBrand?.length) {
          setTableData(allBrand);
        }
      }, [allBrand]);

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

    const handleDeleteRow = (id) => {
        dispatch(deleteBrand(id, toast));
        const filterData = tableData.filter((item) => item._id !== id);
        setTableData(filterData);
    };

    const handleEditRow = (id) => {
        push(`/dashboard/mobilebrand/add/${id}`);
    };

    return (
        <>
            <Head>
                <title>Mobile Brand</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Mobile Brand"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Mobile Brand', href: PATH_DASHBOARD.mobilebrand.view },
                        { name: 'Mobile Brand List' }
                    ]}

                    action={
                        <NextLink href={PATH_DASHBOARD.mobilebrand.add} passHref>
                            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                                New Mobile Brand
                            </Button>
                        </NextLink>
                    }
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
                                                <BrandTableRow
                                                    key={row.id}
                                                    row={row}
                                                    index={index}
                                                    onDeleteRow={() => handleDeleteRow(row._id)}
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

    // if (filterName) {
    //     inputData = inputData.filter((user) =>
    //         user.name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
    //         user.city?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    //     );
    // }

    return inputData;
}
