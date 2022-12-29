// // @mui
// import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
// import { Typography } from '@mui/material';
// // utils
// import { Paper } from '@mui/material';


// BannerEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;


// export default function BannerEditPage({list}) {


//   return (
//     <div>
//     <Timeline position="right">
//       {list?.map((item, i) => (
//         <TimelineItem key={i}>
//           <TimelineSeparator>
//             {item?.status.status == 'Resolved' ? (
//               <TimelineDot color="success" />
//             ) : item?.status.status == 'Failed' ? (
//               <TimelineDot color="error" />
//             ) : item?.status.status == 'Stuck' ? (
//               <TimelineDot color="warning" />
//             ) : item?.status.status == 'On Progress' ? (
//               <TimelineDot color="info" />
//             ) : (
//               <TimelineDot />
//             )}

//             <TimelineConnector />
//           </TimelineSeparator>
//           <TimelineContent style={{ flex: 100 }}>
//             <Paper
//               sx={{
//                 p: 2,
//                 bgcolor: 'grey.50012',
//               }}
//             >
//               <Typography variant="subtitle2" sx={{ mb: 0.3 }}>
//                 {item?.assigned_officer?.name ? item?.assigned_officer?.name : null}
//               </Typography>

//               {item?.assigned_officer?.department ? (
//                 <Typography variant="subtitle2" sx={{ mb: 0.3 }}>
              
//                 </Typography>
//               ) : null}

//               <div style={{display: "flex", flexDirection: "row"}}>
//               <Typography variant="body2" sx={{ color: 'text.secondary',mb: 0.3  }}>
//                 <Label
//                   variant={theme.palette.mode == 'light' ? 'ghost' : 'filled'}
//                   color={
//                     (item?.status?.status == 'Resolved' && 'success') ||
//                     (item?.status?.status == 'Failed' && 'error') ||
//                     (item?.status?.status == 'Stuck' && 'warning') ||
//                     (item?.status?.status == 'On Progress' && 'info') ||
//                     'default'
//                   }
//                 >
//                   {item?.priority}
//                 </Label>
//               </Typography>

//               {item?.priority ? (
//               <Typography variant="body2" sx={{ color: 'text.secondary',mb: 0.3  }} >
               
//                   <Label variant={theme.palette.mode == 'light' ? 'ghost' : 'filled'} sx={{ ml: 1 }} color="success">
//                     {item?.priority}
//                   </Label>
               
//               </Typography>
//                ) : null}
//               </div>

           

//               <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.3 }}>
//                 {item?.remarks}
//               </Typography>
//               <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.3 }}>
//               {item?.priority}
//               </Typography>
//             </Paper>
//           </TimelineContent>
//         </TimelineItem>
//       ))}
//     </Timeline>
//   </div>
//   );
// }


import PropTypes from 'prop-types';
// @mui
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
// utils
import { fDateTime } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

AnalyticsOrderTimeline.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function AnalyticsOrderTimeline({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <Timeline>
          {list?.map((item, index) => (
            <OrderItem key={item.id} item={item} isLast={index === list.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    time: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    type: PropTypes.string,
  }),
};

function OrderItem({ item, isLast }) {
  const { type, status, updated_at ,user, canceled_comment, review_comment, stucked_comment, ready_comment, repairing, pickup} = item;
  console.log("pickup",item.pickup)
  return (
    <TimelineItem>
      <TimelineSeparator>

     
            { status == 'Repairing' ? (
               <TimelineDot color="success" />
            ) : status == 'Pickup Agent Assigned' ? (
              <TimelineDot color="error" />
           ) : status == 'Open' ? (
             <TimelineDot color="warning" />
            ) : status == 'Stucked' ? (
              <TimelineDot color="info" />
            ) : status == 'On Review' ? (
              <TimelineDot color="error" />
           ) : status == 'Ready To Review' ? (
             <TimelineDot color="warning" />
            ) :  status == 'Delivered' ? (
              <TimelineDot color="error" />
           ) : status == 'Canceled' ? (
             <TimelineDot color="warning" />
            ) : status == 'Reopen' ? (
              <TimelineDot color="warning" />
             ) :(
             <TimelineDot />
            )}


           <TimelineConnector /> 

        {/* <TimelineDot
          color={
            (type === 'order1' && 'primary') ||
            (type === 'order2' && 'success') ||
            (type === 'order3' && 'info') ||
            (type === 'order4' && 'warning') ||
            'error'
          }
        /> */}

        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{status}</Typography>

        { repairing != "" ? 
           <Typography variant="subtitle2">{repairing}</Typography>
        : null }

        { pickup !=  "" ? 
           <Typography variant="subtitle2">{pickup}</Typography>
        : null }


        { ready_comment !=  "" ? 
           <Typography variant="subtitle2">{ready_comment}</Typography>
        : null }

        { canceled_comment !=  "" ? 
           <Typography variant="subtitle2">{canceled_comment}</Typography>
        : null }

         { review_comment !=  "" ? 
           <Typography variant="subtitle2">{review_comment}</Typography>
        : null }

         { stucked_comment !=  "" ? 
           <Typography variant="subtitle2">{stucked_comment}</Typography>
        : null }

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {user[0].name}
        </Typography>
        <br/>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(updated_at)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}


// @mui

// import {
//   Timeline, TimelineConnector, TimelineContent, TimelineDot,
//   TimelineItem, TimelineSeparator
// } from '@mui/lab';
// import { Paper, Typography } from '@mui/material';
// import { styled } from '@mui/material/styles';
// // routes
// // layouts
// import Layout from '../../../layouts';
// // components
// // sections
// import { useTheme } from '@mui/material/styles';
// import moment from 'moment';
// import Label from '../../../components/Label';

// // ----------------------------------------------------------------------

// const RootStyle = styled('div')(({ theme }) => ({
//   paddingTop: theme.spacing(11),
//   paddingBottom: theme.spacing(15),
// }));

// // ----------------------------------------------------------------------

// ApplicationManagementTimeline.getLayout = function getLayout(page) {
//   return <Layout variant="main">{page}</Layout>;
// };

// // ----------------------------------------------------------------------

// export default function ApplicationManagementTimeline({ applicationproceeding, translate, currentLang }) {
//   const theme = useTheme();
//   return (
//     <div>
//       <Timeline position="right">
//         {applicationproceeding.map((item, i) => (
//           <TimelineItem key={i}>
//             <TimelineSeparator>
//               {item?.status.status == 'Resolved' ? (
//                 <TimelineDot color="success" />
//               ) : item?.status.status == 'Failed' ? (
//                 <TimelineDot color="error" />
//               ) : item?.status.status == 'Stuck' ? (
//                 <TimelineDot color="warning" />
//               ) : item?.status.status == 'On Progress' ? (
//                 <TimelineDot color="info" />
//               ) : (
//                 <TimelineDot />
//               )}

//               <TimelineConnector />
//             </TimelineSeparator>
//             <TimelineContent style={{ flex: 100 }}>
//               <Paper
//                 sx={{
//                   p: 2,
//                   bgcolor: 'grey.50012',
//                 }}
//               >
//                 <Typography variant="subtitle2" sx={{ mb: 0.3 }}>
//                   {item?.assigned_officer?.name ? item?.assigned_officer?.name : null}
//                 </Typography>

//                 {item?.assigned_officer?.department ? (
//                   <Typography variant="subtitle2" sx={{ mb: 0.3 }}>
//                     {currentLang?.label == 'हिन्दी'
//                       ? item?.assigned_officer?.department?.department_hi +
//                         ' - ' +
//                         item?.assigned_officer?.designation?.designation_hi
//                       : item?.assigned_officer?.department?.department +
//                         ' - ' +
//                         item?.assigned_officer?.designation?.designation}
//                   </Typography>
//                 ) : null}

//                 <div style={{display: "flex", flexDirection: "row"}}>
//                 <Typography variant="body2" sx={{ color: 'text.secondary',mb: 0.3  }}>
//                   <Label
//                     variant={theme.palette.mode == 'light' ? 'ghost' : 'filled'}
//                     color={
//                       (item?.status?.status == 'Resolved' && 'success') ||
//                       (item?.status?.status == 'Failed' && 'error') ||
//                       (item?.status?.status == 'Stuck' && 'warning') ||
//                       (item?.status?.status == 'On Progress' && 'info') ||
//                       'default'
//                     }
//                   >
//                     {currentLang?.label == 'हिन्दी' ? item?.status?.status_hi : item?.status?.status}
//                   </Label>
//                 </Typography>

//                 {item?.priority ? (
//                 <Typography variant="body2" sx={{ color: 'text.secondary',mb: 0.3  }} >
                 
//                     <Label variant={theme.palette.mode == 'light' ? 'ghost' : 'filled'} sx={{ ml: 1 }} color="success">
//                       {item?.priority}
//                     </Label>
                 
//                 </Typography>
//                  ) : null}
//                 </div>

             

//                 <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.3 }}>
//                   {item?.remarks}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.3 }}>
//                   {item?.status?.status == 'Resolved'
//                     ? moment(item?.close_date).format('DD MMM YYYY')
//                     : moment(item?.assigned_date).format('DD MMM YYYY') +
//                       ' - ' +
//                       moment(item?.last_date).format('DD MMM YYYY')}
//                 </Typography>
//               </Paper>
//             </TimelineContent>
//           </TimelineItem>
//         ))}
//       </Timeline>
//     </div>
//   );
// }
