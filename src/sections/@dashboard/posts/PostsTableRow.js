import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Button, IconButton, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// utils 
// import Label from '../../../label/Label';

import Iconify from '../../../components/iconify';
// import { TableMoreMenu } from '../../../components/table';
//


import ConfirmDialog from '../../../../src/components/confirm-dialog/ConfirmDialog';

import moment from 'moment';
import MenuPopover from '../../../components/menu-popover';
// ----------------------------------------------------------------------

PostsTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function PostsTableRow({ row, index, selected, onEditRow, onDeleteRow }) {
  const theme = useTheme();

  const { backlink, title, created_at } = row;
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
    <TableRow hover >
      <TableCell align="left">{index + 1}</TableCell>
      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {title}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <a href={backlink} style={{ textDecoration: 'none' }}>
          {backlink}
        </a>
      </TableCell>
      
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
