import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// utils
// import Label from '../../../label/Label';

import Iconify from '../../../components/iconify';
// import { TableMoreMenu } from '../../../components/table';
//

import MenuPopover from '../../../components/menu-popover';
// ----------------------------------------------------------------------

DesignationTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function DesignationTableRow({ row, index, selected, onEditRow, onDeleteRow, onSelectRow }) {
  const theme = useTheme();

  const { levels, department, designations } = row;
  const [openPopover, setOpenPopover] = useState(null);
  const [openMenu, setOpenMenuActions] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  console.log("Departmentss:",department);

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
console.log("ROw",row);
// console.log("departments.department",departments.department);


// const [openMenu, setOpenMenuActions] = useState(null);
  return (
    <TableRow hover >
      {/* <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell> */}
      <TableCell align="left">{index + 1}</TableCell>
      <TableCell align="left">{designations}</TableCell>
      <TableCell  align="left" >{department}</TableCell>
      <TableCell align="left">{levels}</TableCell>  
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
          {/* <MenuItem
            onClick={() => {
              handleOpenConfirm();
              handleClosePopover();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" />
            Delete
          </MenuItem> */}

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
