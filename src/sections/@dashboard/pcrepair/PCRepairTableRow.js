import PropTypes from 'prop-types';
// @mui 
import { TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';


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
