import PropTypes from 'prop-types';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, TableCell, Typography, MenuItem, IconButton, Button } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
import Label from '../../../components/label';
// import Label from '../../../label/Label';

import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
// import { TableMoreMenu } from '../../../components/table';
//


import ConfirmDialog from '../../../../src/components/confirm-dialog/ConfirmDialog';

import MenuPopover from '../../../components/menu-popover';
import moment from 'moment';
// ----------------------------------------------------------------------

PostsTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function PostsTableRow({ row, index, onEditRow, onDeleteRow }) {
  const theme = useTheme();

  const { coupon_name, coupon_code, coupon_discount, created_at } = row;
  const [openPopover, setOpenPopover] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
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

  return (
    <TableRow hover>
      <TableCell align="left">{index + 1}</TableCell>

      <TableCell align="left">
          {coupon_name}
      </TableCell>

      <TableCell align="left">
          {coupon_code}
      </TableCell>

      {/* <TableCell align="left">
          {coupon_discount}
      </TableCell> */}
      
      
      <TableCell align="left" width={150}>
        {moment(created_at).format('DD MMM YYYY')}
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
            <Button variant="contained" color="error" onClick={() => {
              onDeleteRow();
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
