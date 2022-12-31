import {
  TableCell, TableRow
} from '@mui/material';
// import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   onCloseModal, onOpenModal
// } from '../../../redux/slices/calendar';
// import { useDispatch, useSelector } from '../../../redux/store';
// import axios from '../../../utils/axios';
// import {
//   CanceledForm, OnReviewForm, PickupForm, ReadyReviewForm, RepairingForm,
//   StuckedForm
// } from './statusmodeltab';

import TestingStatus from './TestingStatus';
MobileRepairTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
};

export default function MobileRepairTableRow({ row, index, onDetailRow }) {

  const theme = useTheme();
  // const dispatch = useDispatch();
  const { service_id, name, contact_no, locality, city, city_name, status, model_no, date_time, _id } = row;

  console.log("row123", row)

  // const [statusPage, setStatusPage] = useState(null);
  // const [statusfor, setStatusfor] = useState();

  // useEffect(() => {
  //   if (status == 'Open') {
  //     setStatusPage('Open');
  //   } else if (status == 'Pickup Agent Assigned') {
  //     setStatusPage('Pickup Agent Assigned');
  //   } else if (status == 'Repairing') {
  //     setStatusPage('Repairing');
  //   } else if (status == 'Stucked') {
  //     setStatusPage('Stucked');
  //   } else if (status == 'On Review') {
  //     setStatusPage('On Review');
  //   } else if (status == 'Ready To Review') {
  //     setStatusPage('Ready To Review');
  //   } else if (status == 'Delivered') {
  //     setStatusPage('Delivered');
  //   } else if (status == 'Canceled') {
  //     setStatusPage('Canceled');
  //   } else {
  //     setStatusPage('Reopen');
  //   }
  // }, [status]);

  // const onStatus = async (data) => {
  //   setStatusPage(data);
  // };

  // const onSubmit = async (value) => {
  //   console.log("value", _id)
  //   setStatusPage(value);
  //   const payload = {
  //     status: value,
  //     user_id: _id,
  //   };
  //   const response = await axios.post('/mobilestatus/add', payload);
  //   toast.success(response.data?.message);
  // };

  // const { openModal } = useSelector((state) => state.calendar);

  // const handleCloseModal = () => {
  //   dispatch(onCloseModal());
  // };

  // const handleAddEvent = (value) => {
  //   setStatusfor(value)
  //   dispatch(onOpenModal());
  // };

 

  return (
    <>
      <TableRow hover >

        <TableCell align="left">{index + 1}</TableCell>

        <TableCell align="left">{service_id}</TableCell>

        <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={() => onDetailRow()} >
          {name}
        </TableCell>

        <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={() => onDetailRow()} >{contact_no}</TableCell>

        <TableCell align="left">{moment(date_time).format('DD MMM YYYY, h:mm:ss a')}</TableCell>

        <TableCell align="left">{city_name[0]?.city_name}</TableCell>

       
        <TableCell align="left">{locality}</TableCell>

        <TableCell align="left">
          <TestingStatus itemId={_id} city={city}/>
        </TableCell>


        {/* <TableCell align="left">
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={(e) => onStatus(e.target.value)}
            // onChange={(e) => onSubmit(e.target.value)}
            value={statusPage}
            sx={{ height: '40px', width: 120 }}
          >
            <MenuItem value={'Open'} onClick={() => onSubmit('Open')} >Open</MenuItem>
            <MenuItem value={'Pickup Agent Assigned'} onClick={() => handleAddEvent('Pickup Agent Assigned')} >Pickup Agent Assigned</MenuItem>
            <MenuItem value={'Repairing'} onClick={() => handleAddEvent('Repairing')}>Repairing</MenuItem>
            <MenuItem value={'Stucked'} onClick={() => handleAddEvent('Stucked')}>Stucked</MenuItem>
            <MenuItem value={'On Review'} onClick={() => handleAddEvent('On Review')}>On Review</MenuItem>
            <MenuItem value={'Ready To Review'} onClick={() => handleAddEvent('Ready To Review')}>Ready To Review</MenuItem>
            <MenuItem value={'Delivered'} onClick={() => onSubmit('Delivered')} >Delivered</MenuItem>
            <MenuItem value={'Canceled'} onClick={() => handleAddEvent('Canceled')}>Canceled</MenuItem>
            <MenuItem value={'Reopen'} onClick={() => onSubmit('Reopen')}>Reopen</MenuItem>
          </Select>
        </TableCell> */}

      </TableRow>

      {/* {statusfor == 'Pickup Agent Assigned' ?
        <Dialog fullWidth maxWidth="md" open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Select a pickup agent for ({city}) </DialogTitle>
          <PickupForm
            mobilerepaircity={city}
            onCancel={handleCloseModal}
            statusPage={statusPage}
            id={_id}
          />
        </Dialog>
        : null}

      {statusfor == 'Repairing' ?
        <Dialog fullWidth maxWidth="md" open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Select a service manager for ({city_name[0].city_name})</DialogTitle>
          <RepairingForm
            mobilerepaircity={city}
            onCancel={handleCloseModal}
          />
        </Dialog>
        : null}

      {statusfor == 'Stucked' ?
        <Dialog fullWidth maxWidth="md" open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Stucked</DialogTitle>
          <StuckedForm
            onCancel={handleCloseModal}
          />
        </Dialog>
        : null}


      {statusfor == 'On Review' ?
        <Dialog fullWidth maxWidth="md" open={openModal} onClose={handleCloseModal}>
          <DialogTitle>On Review</DialogTitle>
          <OnReviewForm
            onCancel={handleCloseModal}
          />
        </Dialog>
        : null}

      {statusfor == 'Ready To Review' ?
        <Dialog fullWidth maxWidth="md" open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Ready To Review</DialogTitle>
          <ReadyReviewForm
            onCancel={handleCloseModal}
          />
        </Dialog>
        : null}


      {statusfor == 'Canceled' ?
        <Dialog fullWidth maxWidth="md" open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Canceled</DialogTitle>
          <CanceledForm
            onCancel={handleCloseModal}
          />
        </Dialog>
        : null} */}
    </>
  );
}

