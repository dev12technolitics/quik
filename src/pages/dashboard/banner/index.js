import { useEffect, useState } from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

// @mui
import {
  Button, Card, Container, Table, TableBody
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import ConfirmDialog from '../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { useSettingsContext } from '../../../components/settings';
import {
  emptyRows, getComparator, TableEmptyRows,
  TableHeadCustom, TableNoData, TablePaginationCustom, useTable
} from '../../../components/table';
// sections

import { deleteBanners, getBanners } from '../../../../src/redux/slices/banner';
import { useDispatch, useSelector } from '../../../redux/store';
import { BannerTableRow } from '../../../sections/@dashboard/banner';

// import { toast } from "react-toastify";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TABLE_HEAD = [
  { id: 'index', label: 'SNO', align: 'left' },
  { id: 'ban_image', label: 'IMAGE', align: 'left' },
  { id: 'ban_title', label: 'TITLE', align: 'left', width: 180 },
  { id: 'ban_type', label: 'TYPE', align: 'left' },
  { id: 'pro_link', label: 'BACK LINK', align: 'left', width: 180 },
  { id: 'created_at', label: 'POST DATE', align: 'left', width: 180 },
  { id: '' },
];

// ----------------------------------------------------------------------

Banner.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Banner() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  //   const { themeStretch } = useSettingsContext();
  

  const [openConfirm, setOpenConfirm] = useState(false);

  //   const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [filterStatus, setFilterStatus] = useState('all');


  const { themeStretch } = useSettingsContext();

  const { push } = useRouter();

  const dispatch = useDispatch();

  const { isLoading, banners, deleteStatus } = useSelector((state) => state.banner);

  const [tableData, setTableData] = useState([]);

  const [filterName] = useState('');

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  useEffect(() => {
    if (banners?.length) {
      setTableData(banners);
    }
  }, [banners,handleDeleteRow]);

  const handleEditRow = (id) => {
    push(`/dashboard/banner/add/${id}`);
  };

  const handleDeleteRow = (id) => {
    dispatch(deleteBanners(id, toast));
    const filterData = tableData.filter((item) => item._id !== id);
    setTableData(filterData);
};

  const dataFiltered = applyFilter({
    tableData,
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

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };


  //............all data delete....................


  const handleDeleteRows = (selected) => {
    console.log("selected", selected);
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selected.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selected.length === dataFiltered.length) {
        setPage(0);
      } else if (selected.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selected.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };


  return (
    <>
      <Head>
        <title>Banner</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>

        <CustomBreadcrumbs
          heading="Banner List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Banner', href: PATH_DASHBOARD.banner.view },
            { name: 'Banner List' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.banner.add} passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                New Banner 
              </Button>
            </NextLink>
          }
        />

        <Card>
      
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
                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <BannerTableRow
                    key={index}
                    row={row}
                    index={index}
                    selected={selected.includes(row._id)}
                    onSelectRow={() => onSelectRow(row._id)}
                    onDeleteRow={() => handleDeleteRow(row._id)}
                    onEditRow={() => handleEditRow(row._id)}
                  />
                ))}
                <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </Scrollbar>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete hello
          </Button>
        }
      />
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
      user.email_id?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
      user.formal_email_id?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
      user.designation_name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
      user.contact_no.indexOf(filterName) !== -1
    );
  }


  if (filterStatus !== 'all') {
    inputData = inputData.filter((user) => user.status === filterStatus);
  }

  if (filterRole !== 'all') {
    inputData = inputData.filter((user) => user.role === filterRole);
  }

  return inputData;
}
