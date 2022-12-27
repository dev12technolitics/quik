import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Iconify from '../../../components/iconify';

import MenuPopover from '../../../components/menu-popover';

CustomerTableRow.propTypes = {
    row: PropTypes.object,
    index: PropTypes.number,
    onEditRow: PropTypes.func,
};

export default function CustomerTableRow({ row, index, onEditRow }) {
    const theme = useTheme();

    const { name, eamil_id, contact_no, city } = row;

    const [openPopover, setOpenPopover] = useState(null);

    const handleOpenPopover = (event) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    return (
        <TableRow hover >

            <TableCell align="left">{index + 1}</TableCell>

            <TableCell align="left">{name}</TableCell>

            <TableCell align="left">{eamil_id}</TableCell>

            <TableCell align="left">{contact_no}</TableCell>
            
            <TableCell align="left">{city}</TableCell>

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
