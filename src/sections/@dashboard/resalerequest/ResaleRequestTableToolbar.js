import PropTypes from 'prop-types';
// @mui
import { InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
// components
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';

import { useState } from 'react';

import { CSVLink } from 'react-csv';
// ----------------------------------------------------------------------

ResaleRequestTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function ResaleRequestTableToolbar({
  filterName,
  onFilterName,
  getDownload,
  headers,
  filterCity,
  optionsCity,
  onFilterCity,
}) {

  const [role, setRole] = useState('City');
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
        placeholder="Search by name, contact number, brand and email id"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />



      {role === 'City' && (
        <TextField
          fullWidth
          select
          label={'city'}
          value={filterCity}
          onChange={onFilterCity}
          SelectProps={{
            MenuProps: {
              sx: { '& .MuiPaper-root': { maxHeight: 260 } },
            },
          }}
          sx={{
            maxWidth: { sm: 240 },
            textTransform: 'capitalize',
          }}
        >
          <MenuItem
            value="all"
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            all
          </MenuItem>

          {optionsCity.map((option, index) => (
            <MenuItem
              key={index}
              value={option._id}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 0.75,
                typography: 'body2',
                textTransform: 'capitalize',
              }}
            >
              {option.city_name}
            </MenuItem>
          ))}
        </TextField>
      )}


      <CSVLink
        data={getDownload ? getDownload : null}
        headers={headers ? headers : null}
        filename="resalerequest.csv"
        target="_blank"
        style={{ textDecoration: 'none' }}
      >
        <LoadingButton type="submit" variant="contained" size="" sx={{ py: 2, px: 2 }}>
          Excel
        </LoadingButton>
      </CSVLink>
    </Stack>
  );
}
