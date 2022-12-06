import PropTypes from 'prop-types';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, TableCell, Typography, MenuItem,IconButton } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
import Label from '../../../components/label';
// import Label from '../../../label/Label';

import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
// import { TableMoreMenu } from '../../../components/table';
//

import MenuPopover from '../../../components/menu-popover';
import moment from 'moment';
// ----------------------------------------------------------------------

DepartmentTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function DepartmentTableRow({ row, index, onSelectRow,selected, onEditRow, onDeleteRow }) {
  const theme = useTheme();

  const {department } = row;
  const [openPopover, setOpenPopover] = useState(null);
  
  const [openConfirm, setOpenConfirm] = useState(false);


  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  // const handleOpenPopover = (event) => {
  //   setOpenPopover(event.currentTarget);
  // };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };


  return (
    <TableRow hover selected={selected}>
    {/* <TableCell padding="checkbox">
      <Checkbox checked={selected} onClick={onSelectRow} />
    </TableCell> */}
    <TableCell align="left">{index + 1}</TableCell>

      <TableCell align="left">{department}</TableCell>
  
      <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>

      <TableCell align="left">
         <MenuPopover
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        /> 



<MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top" sx={{ width: 140 }}>
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

        {/* <MenuItem
          onClick={() => {
            onChnagePassword();
            handleClosePopover();
          }}
        >
          Password Change
        </MenuItem> */}
      </MenuPopover>



      </TableCell>
    </TableRow>
  );
}
