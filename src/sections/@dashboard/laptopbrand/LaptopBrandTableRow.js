import { Button, IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDialog from '../../../../src/components/confirm-dialog/ConfirmDialog';
import Iconify from '../../../components/iconify';
import Image from '../../../components/image';
import MenuPopover from '../../../components/menu-popover';
import axios from '../../../utils/axios';

BrandTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function BrandTableRow({ row, index, onEditRow, onDeleteRow}) {
  const theme = useTheme();

  const { brand_name, logo , _id, status} = row;
  const [openPopover, setOpenPopover] = useState(null);
  const [openMenu, setOpenMenuActions] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [statusPage, setStatusPage] = useState(null);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
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
    const response = await axios.put('/laptop/update/' + _id, payload);
    toast.success(response.data?.message);
  };

  return (
    <TableRow hover>
   
      <TableCell align="left">{index + 1}</TableCell>

      <TableCell align="left">{brand_name}</TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'left' }}>
        <Image
          disabledEffect
          alt={brand_name}
          src={logo}
          sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
        />
      </TableCell>

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
            <Button variant="contained" color="error" onClick= {(e)=>{onDeleteRow(e);
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
