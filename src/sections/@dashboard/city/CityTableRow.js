import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { Button, IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
 
import Select from '@mui/material/Select';
import Iconify from '../../../components/iconify';

import { toast } from 'react-toastify';
import ConfirmDialog from '../../../../src/components/confirm-dialog/ConfirmDialog';
import MenuPopover from '../../../components/menu-popover';
import axios from '../../../utils/axios';

CityTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function CityTableRow({ row, index, onEditRow, onDeleteRow, }) {
  const theme = useTheme();

  const { status, city_name, _id } = row;
  const [openPopover, setOpenPopover] = useState(null);
  const [openMenu, setOpenMenuActions] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [statusPage, setStatusPage] = useState(null);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    console.log("Hello :")
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
    console.log("Helloo deleete")
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };


  
  useEffect(() => {
    if (status == 'Active') {
      setStatusPage('Active');
    } else {
      setStatusPage('Inactive');
    }
  }, [status]);

  const onSubmit = async (data) => {
    setStatusPage(data);
    const payload = {
      status: data,
    };
    const response = await axios.put('/city/update/' + _id, payload);
    toast.success(response.data?.message);
  };

  return (
    <TableRow hover >

      <TableCell align="left">{index + 1}</TableCell>

      <TableCell align="left">{city_name}</TableCell>

      <TableCell align="left">
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          onChange={(e) => onSubmit(e.target.value)}
          value={statusPage}
          sx={{ height: '40px', width: 120 }}
        >
          <MenuItem value={'Active'}>Active</MenuItem>
          <MenuItem value={'Inactive'}>Inactive</MenuItem>
        </Select>
      </TableCell>


      <TableCell align="right">
        <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>

      <TableCell align="left">
        <MenuPopover
          open={openPopover}
          onClose={handleClosePopover}
          arrow="right-top"
          sx={{ width: 140 }}>

          <MenuItem
            onClick={() => {
              handleOpenConfirm();
              handleClosePopover();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" />
            Delete
          </MenuItem>

          <MenuItem
            onClick={() => {
              onEditRow();
              handleClosePopover();
            }}
          >
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
        </MenuPopover>

        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          title="Delete"
          content="Are you sure want to delete?"
          action={
            <Button variant="contained" color="error" onClick={(e) => {
              onDeleteRow(e);
              handleCloseConfirm()
            }}>
              Delete
            </Button>
          }
        />
      </TableCell>
    </TableRow>
  );
}
