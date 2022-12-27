import PropTypes from 'prop-types';
// @mui
import { TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';


// ----------------------------------------------------------------------

DealerTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
};

export default function DealerTableRow({ row, index}) {
  const theme = useTheme();

  const { your_name, contact_no, email_id, city, remarks} = row;

  return (
    <TableRow hover >

      <TableCell align="left">{index + 1}</TableCell>

      <TableCell align="left">
        {your_name}
      </TableCell>

      <TableCell align="left">{contact_no}</TableCell>

      <TableCell align="left">{email_id}</TableCell>

      <TableCell align="left">{city}</TableCell>

      <TableCell align="left">{remarks}</TableCell>

    </TableRow>
  );
}
