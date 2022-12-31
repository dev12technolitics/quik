
import { Dialog, DialogTitle, MenuItem, TableCell } from '@mui/material';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    onCloseModal, onOpenModal
} from '../../../redux/slices/calendar';
import { useDispatch, useSelector } from '../../../redux/store';
import axios from '../../../utils/axios';
import {
    CanceledForm, OnReviewForm, PickupForm, ReadyReviewForm, RepairingForm,
    StuckedForm
} from './statusmodeltab';

export default function TestingStatus({ itemId , city }) {
    console.log("itemId", itemId)
    const dispatch = useDispatch();
    const [allstatus, setAllstatus] = useState([]);

    useEffect(() => {
        const onstatusApi = async (itemId) => {
            const response = await axios.get('/mobilestatus/all/' + itemId);
            console.log(response?.data?.mobilestatus);
            setAllstatus(response?.data?.mobilestatus[0].status);
        };
        onstatusApi(itemId);
    }, [itemId]);

    console.log("ok", allstatus)


    const [statusPage, setStatusPage] = useState(null);
    const [statusfor, setStatusfor] = useState();

    useEffect(() => {
        if (allstatus == 'Open') {
            setStatusPage('Open');
        } else if (allstatus == 'Pickup Agent Assigned') {
            setStatusPage('Pickup Agent Assigned');
        } else if (allstatus == 'Repairing') {
            setStatusPage('Repairing');
        } else if (allstatus == 'Stucked') {
            setStatusPage('Stucked');
        } else if (allstatus == 'On Review') {
            setStatusPage('On Review');
        } else if (allstatus == 'Ready To Review') {
            setStatusPage('Ready To Review');
        } else if (allstatus == 'Delivered') {
            setStatusPage('Delivered');
        } else if (allstatus == 'Canceled') {
            setStatusPage('Canceled');
        } else {
            setStatusPage('Reopen');
        }
    }, [allstatus]);

    const onStatus = async (data) => {
        setStatusPage(data);
    };

    const onSubmit = async (value) => {
        console.log("value", itemId)
        setStatusPage(value);
        const payload = {
            status: value,
            user_id: itemId,
        };
        const response = await axios.post('/mobilestatus/add', payload);
        toast.success(response.data?.message);
    };

    const { openModal } = useSelector((state) => state.calendar);

    const handleCloseModal = () => {
        dispatch(onCloseModal());
    };

    const handleAddEvent = (value) => {
        setStatusfor(value)
        dispatch(onOpenModal());
    };


    return (
        <>
            <TableCell align="left">
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
            </TableCell>


            {statusfor == 'Pickup Agent Assigned' ?
                <Dialog fullWidth maxWidth="md" open={openModal} onClose={handleCloseModal}>
                    <DialogTitle>Select a pickup agent for ({city}) </DialogTitle>
                    <PickupForm
                        mobilerepaircity={city}
                        onCancel={handleCloseModal}
                        statusPage={statusPage}
                        id={itemId}
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
                : null}
        </>
    );
}