import PropTypes from 'prop-types';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, TableCell, Typography, MenuItem, IconButton, Button } from '@mui/material';
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
import ConfirmDialog from '../../../../src/components/confirm-dialog/ConfirmDialog';
import MenuPopover from '../../../components/menu-popover';
import moment from 'moment';
// ----------------------------------------------------------------------

TestimonialsTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function TestimonialsTableRow({ row, index, onEditRow, onDeleteRow, onOpenDialog }) {
  const theme = useTheme();

  const { test_comment, test_name, test_picture, test_designation } = row;

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

      <TableCell sx={{ display: 'flex', alignItems: 'left' }}>
        <Image
          disabledEffect
          alt={test_name}
          src={test_picture}
          sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
        />
      </TableCell>

      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={() => onOpenDialog()}>
        {test_name}
      </TableCell>

      <TableCell align="left">
        {test_designation}
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
