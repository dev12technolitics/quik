import PropTypes from 'prop-types';
// @mui
import { TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
 

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
