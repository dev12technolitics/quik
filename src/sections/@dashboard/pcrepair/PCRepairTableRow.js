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
// ----------------------------------------------------------------------

PCRepairTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
};

export default function PCRepairTableRow({ row, index, onOpenDialog}) {
  const theme = useTheme();

  const { name, contact_no, email_id, city, coupon_code} = row;

  return (
    <TableRow hover >

      <TableCell align="left">{index + 1}</TableCell>

      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={() => onOpenDialog()}>
        {name}
      </TableCell>

      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={() => onOpenDialog()}>{contact_no}</TableCell>

      <TableCell align="left">{email_id}</TableCell>

      <TableCell align="left">{coupon_code}</TableCell>

      <TableCell align="left">{city}</TableCell>

    </TableRow>
  );
}
