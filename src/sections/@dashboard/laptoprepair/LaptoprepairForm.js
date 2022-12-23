import PropTypes from 'prop-types';
import Laptoprepairmodel from './Laptoprepairmodel';
import { Box, Button, DialogActions } from '@mui/material';

LaptoprepairForm.propTypes = {
    onCancel: PropTypes.func
};

export default function LaptoprepairForm({ onCancel, remarks, locality, address }) {

    return (
        <>
            <Laptoprepairmodel
                remarks={remarks}
                locality={locality}
                address={address}
            />

            <DialogActions>
                <Box sx={{ flexGrow: 1 }} />
                <Button variant="outlined" color="inherit" onClick={onCancel}>
                    Cancel
                </Button>
            </DialogActions>
        </>
    );
}