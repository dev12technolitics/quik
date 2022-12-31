import PropTypes from 'prop-types';
// @mui
import { TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';

CustomerTableRow.propTypes = {
    row: PropTypes.object,
    index: PropTypes.number,
    onEditRow: PropTypes.func,
};

export default function CustomerTableRow({ row, index }) {
    const theme = useTheme();

    const { name, email_id, contact_no, city , locality, address} = row;


    return (
        <TableRow hover >

            <TableCell align="left">{index + 1}</TableCell>

            <TableCell align="left">{name}</TableCell>

            <TableCell align="left">{email_id}</TableCell>

            <TableCell align="left">{contact_no}</TableCell>
            
            <TableCell align="left">{city}</TableCell>

            <TableCell align="left">{locality}</TableCell>
            <TableCell align="left">{address}</TableCell>

        </TableRow>
    );
}
