import PropTypes from 'prop-types';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell } from '@mui/material';


MobileRepairTableRow.propTypes = {
  row: PropTypes.object, 
  index: PropTypes.number,
};

export default function MobileRepairTableRow({ row, index, onOpenDialog}) {
  const theme = useTheme();

  const { name, contact_no, email_id, city, brand_name, model_no, date_time} = row;

  return (
    <TableRow hover >

      <TableCell align="left">{index + 1}</TableCell>

      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={() => onOpenDialog()}>
        {name}
      </TableCell>

      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={() => onOpenDialog()}>{contact_no}</TableCell>

      <TableCell align="left">{email_id}</TableCell>

      <TableCell align="left">{brand_name}</TableCell>
      
      <TableCell align="left">{model_no}</TableCell>

      <TableCell align="left">{moment(date_time).format('DD MMM YYYY, h:mm:ss a')}</TableCell>

      <TableCell align="left">{city}</TableCell>

    </TableRow>
  );
}
