

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, Button, TableCell, Typography, MenuItem, IconButton } from '@mui/material';

import Select from '@mui/material/Select';
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';

import ConfirmDialog from '../../../../src/components/confirm-dialog/ConfirmDialog';
import axios from '../../../utils/axios';
import MenuPopover from '../../../components/menu-popover';
import moment from 'moment';
import { toast } from 'react-toastify';

CityTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function CityTableRow({ row, index, onEditRow, onDeleteRow,onDetail }) {
  const theme = useTheme();

  const { _id, blog_image, blog_title, status, blog_postedby, blog_posteddate } = row;

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
    const response = await axios.put('/blog/update/' + _id, payload);
    toast.success(response.data?.message);
  };

  return (
    <TableRow hover >

      <TableCell align="left">{index + 1}</TableCell>

      <TableCell onClick={() => onDetail()}  style={{ cursor: 'pointer' }}>
        {blog_image !== '' ? (
          <Image
          disabledEffect
           alt={blog_title} src={blog_image} 
           sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
           />
        ) : null}
      </TableCell>

      <TableCell align="left" onClick={() => onDetail()}  style={{ cursor: 'pointer' }}>{blog_title}</TableCell>

      <TableCell align="left">
        {blog_postedby}
      </TableCell>

 <TableCell align="left">{moment(blog_posteddate).format('DD MMM YYYY')}</TableCell>

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
