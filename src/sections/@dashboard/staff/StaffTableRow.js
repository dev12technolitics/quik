import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Iconify from '../../../components/iconify';
import Image from '../../../components/image';

import { toast } from 'react-toastify';
import MenuPopover from '../../../components/menu-popover';
import axios from '../../../utils/axios';

StaffTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
};

export default function StaffTableRow({ row, index, onEditRow, }) {
  const theme = useTheme();

  const { status, name, profile, contact_no, designation, city, _id } = row;
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
      setStatusPage('InActive');
    }
  }, [status]);

  const onSubmit = async (data) => {
    console.log("data",data)
    setStatusPage(data);
    const payload = {
      status: data,
    };
    const response = await axios.put('/adminuser/update/' + _id, payload);
    toast.success(response.data?.message);
  };

  return (
    <TableRow hover >

      <TableCell align="left">{index + 1}</TableCell>

      <TableCell align="left">
        {name}
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'left' }}>
        <Image
          disabledEffect
          alt={name}
          src={profile}
          sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
        />
      </TableCell>

      <TableCell align="left">{contact_no}</TableCell>

      <TableCell align="left">{designation}</TableCell>

      <TableCell align="left">{city}</TableCell>

      <TableCell align="left">
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          onChange={(e) => onSubmit(e.target.value)}
          value={statusPage}
          sx={{ height: '40px', width: 120 }}
        >
          <MenuItem value={'Active'}>Active</MenuItem>
          <MenuItem value={'InActive'}>InActive</MenuItem>
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
              onEditRow();
              handleClosePopover();
            }}
          >
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
        </MenuPopover>

      </TableCell>
    </TableRow>
  );
}
