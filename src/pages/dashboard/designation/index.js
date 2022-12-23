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
  TableSelectedAction,
  TablePaginationCustom,
} from '../../../components/table';
// sections

import { StaffTableToolbar, DesignationTableRow } from '../../../sections/@dashboard/designation';
import { getDesignationAll } from '../../../../src/redux/slices/designation';
import { useSelector, useDispatch } from '../../../redux/store';

import {toast} from "react-toastify";

// console.log("getstaff",getstaff);
// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'banned'];

const ROLE_OPTIONS = [
  'all',
  'ux designer',
  'full stack designer',
  'backend developer',
  'project manager',
  'leader',
  'ui designer',
  'ui/ux designer',
  'front end developer',
  'full stack developer',
];

const TABLE_HEAD = [
    { id: 'index', label: 'SNO', align: 'left' },
    { id: 'designations', label: 'DESIGNATIONS', align: 'left' },
    { id: 'department', label: 'DEPARTMENTS', align: 'left' },
    { id: 'levels', label: 'LEVELS', align: 'left'},
    { id: '' },
  ];




// ----------------------------------------------------------------------

DesignationList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function DesignationList() {
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

//   const [tableData, setTableData] = useState([]);

  const [openConfirm, setOpenConfirm] = useState(false);

//   const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [filterStatus, setFilterStatus] = useState('all');

//   const [getDownload, setGetDownload] = useState([]);

//   const dispatch = useDispatch();

//   const { push } = useRouter();
//   const { isLoading, staffs } = useSelector((state) => state.staff);



//   useEffect(() => {
//     dispatch(getstaff());
//   }, [dispatch]);

//   useEffect(() => {
//     if (staffs?.length) {
//       setTableData(staffs);
//     }
//   }, [staffs]);
//   useEffect(() => {
//     setGetDownload(staffs);
//   }, [staffs]);


//   console.log("staffs", useSelector((state) => state.staff));




const { themeStretch } = useSettingsContext();

const { push } = useRouter();

const dispatch = useDispatch();

const { isLoading, designations, deleteStatus } = useSelector((state) => state.designation);

// console.log("designationss one:",designations)

const [tableData, setTableData] = useState([]);

const [filterName] = useState('');

useEffect(() => {
  dispatch(getDesignationAll());
}, [dispatch]);

useEffect(() => {
  if (designations?.length) {
    setTableData(designations);
  }
}, [designations]);


// const handleDeleteRow = (id) => {
//   dispatch(deleteBanners(id, toast));
//   const filterData = tableData.filter((item) => item._id !== id);
//   setTableData(filterData);
// }; 

const handleEditRow = (id) => {
  push(`/dashboard/designation/add/${id}`);
};





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

  // const handleFilterName = (event) => {
  //   setPage(0);
  //   setFilterName(event.target.value);
  // };



  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selected) => {
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

  
  // const handleOpenConfirm = () => {
  //   setOpenConfirm(true);
  // };

//   const handleEditRow = (id) => {
//     // push(PATH_DASHBOARD.user.edit(paramCase(id)));
//     // console.log("Edit ID:", id);
//     push(`/dashboard/addstaff/${id}`);
//   };

  // const handleResetFilter = () => {
  //   setFilterName('');
  //   setFilterRole('all');
  //   setFilterStatus('all');
  // };


//   const onChnagePassword = (id) => {
//     push(`/dashboard/addstaff/passwordchange/${id}`);
//   };

  return (
    <>
      <Head>
        <title>Designation</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
    
        <CustomBreadcrumbs
          heading="Designation List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Designation', href: PATH_DASHBOARD.designation.view },
            { name: 'Designation List' },
          ]}
        action={
          <NextLink href={PATH_DASHBOARD.designation.add} passHref>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Add 
            </Button>
          </NextLink>
        }
        />
        <Card>
         

          <Divider />
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
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (                   
                    <DesignationTableRow
                    key={index}
                    row={row}
                    index={index}
                    onDeleteRow={() => handleDeleteRow(row._id)}
                    onEditRow={() => handleEditRow(row._id)}
                  />
                  ))}
                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          {/* </TableContainer> */}

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
            Delete
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
