import PropTypes from 'prop-types';
import Testimonialsmodel from './Testimonialsmodel';
import { Box, Button, DialogActions } from '@mui/material';

TestimonialsForm.propTypes = {
    onCancel: PropTypes.func
};

export default function TestimonialsForm({ onCancel, comment }) {

    return (
        <>
            <Testimonialsmodel
                comment={comment}
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