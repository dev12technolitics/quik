import PropTypes from 'prop-types';

import { Box, CardHeader } from '@mui/material';

MobileDetailTimeline.propTypes = { 
  title: PropTypes.string,
  
};

export default function MobileDetailTimeline({ title, ...other }) {

  return (
    <Box {...other}>
      <CardHeader
        title={title}
      />
    </Box>
  );
}
