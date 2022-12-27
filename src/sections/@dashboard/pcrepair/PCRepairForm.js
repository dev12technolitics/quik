import { Box, Button, DialogActions } from '@mui/material';
import PropTypes from 'prop-types';
import PCRepairmodel from './PCRepairmodel';
 
PCRepairForm.propTypes = {
    onCancel: PropTypes.func
};

export default function PCRepairForm({ onCancel, remarks, locality,address }) {

    return (
        <>
            <PCRepairmodel
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