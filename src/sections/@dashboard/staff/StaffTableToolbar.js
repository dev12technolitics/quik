import PropTypes from 'prop-types';
// @mui
import { InputAdornment, Stack, TextField } from '@mui/material';
// components
// import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';

// import { CSVLink } from 'react-csv';
// ----------------------------------------------------------------------

StaffTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function StaffTableToolbar({
  filterName,
  onFilterName,
  // getDownload,
  // headers
}) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
     

      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder="Search by Name, City and Contact No "
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {/* <CSVLink
        data={getDownload ? getDownload : null}
        headers={headers ? headers : null}
        filename="staff.csv"
        target="_blank"
        style={{ textDecoration: 'none' }}
      >
        <LoadingButton type="submit" variant="contained" size="" sx={{ py: 2, px: 2 }}>
          Excel
        </LoadingButton>
      </CSVLink> */}
    </Stack>
  );
}
