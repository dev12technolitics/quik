import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, Button, TableCell, Typography, MenuItem, IconButton } from '@mui/material';


ResaleRequestTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
};

export default function ResaleRequestTableRow({ row, index}) {
  const theme = useTheme();

  const { name, contact_no, email_id, city, brand, model, ram, rom} = row;

  return (
    <TableRow hover >

      <TableCell align="left">{index + 1}</TableCell>

      <TableCell align="left">
        {name}
      </TableCell>

      <TableCell align="left">{contact_no}</TableCell>

      <TableCell align="left">{email_id}</TableCell>

      <TableCell align="left">{brand}</TableCell>

      <TableCell align="left">{model}</TableCell>

      <TableCell align="left">{ram}/{rom}</TableCell>

      <TableCell align="left">{city}</TableCell>

    </TableRow>
  );
}
