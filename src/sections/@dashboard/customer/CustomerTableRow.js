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
import { toast } from 'react-toastify';

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
