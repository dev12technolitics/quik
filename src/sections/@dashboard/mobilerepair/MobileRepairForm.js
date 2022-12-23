import PropTypes from 'prop-types';
import MobileRepairmodel from './MobileRepairmodel';
import { Box, Button, DialogActions } from '@mui/material';

MobileRepairForm.propTypes = {
    onCancel: PropTypes.func
};

export default function MobileRepairForm({ onCancel, problem, pincode, locality,  address }) {

    return (
        <>
            <MobileRepairmodel
            problem={problem}
                pincode={pincode}
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