import PropTypes from 'prop-types';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, Button, TableCell, Typography, MenuItem, IconButton } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
import Label from '../../../components/label';
// import Label from '../../../label/Label';

import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
// import { TableMoreMenu } from '../../../components/table';

import ConfirmDialog from '../../../../src/components/confirm-dialog/ConfirmDialog';

import MenuPopover from '../../../components/menu-popover';
import moment from 'moment';
// ----------------------------------------------------------------------

BannerTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function BannerTableRow({ row, index, selected, onEditRow, onDeleteRow }) {
  const theme = useTheme();

  const { ban_type, ban_title, pro_link, ban_image, created_at } = row;
  const [openPopover, setOpenPopover] = useState(null);
  const [openMenu, setOpenMenuActions] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

 


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

  return (
    <TableRow hover>
    
      <TableCell align="left">{index + 1}</TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'left' }}>
        <Image
          disabledEffect
          alt={ban_title}
          src={ban_image}
          sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
        />
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {ban_title}
        </Typography>
      </TableCell>

      <TableCell align="left">{ban_type}</TableCell>

      <TableCell align="left">
        <a href={pro_link} style={{ textDecoration: 'none' }}>
          {pro_link}
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
