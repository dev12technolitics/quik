// import PropTypes from 'prop-types';
// // @mui
// import { Card, Typography, CardHeader, CardContent } from '@mui/material';
// import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
// // utils
// import { fDateTime } from '../../../utils/formatTime';
// import Iconify from '../../../components/iconify';
// import { Paper } from '@mui/material';

// // AnalyticsOrderTimeline.propTypes = {
// //   list: PropTypes.array,
// //   title: PropTypes.string,
// //   subheader: PropTypes.string,
// // };

// // export default function AnalyticsOrderTimeline({ title, subheader, list, ...other }) {
// //   return (
// //     <Card {...other}>
// //       <CardHeader title={title} subheader={subheader} />

// //       <CardContent
// //         sx={{
// //           '& .MuiTimelineItem-missingOppositeContent:before': {
// //             display: 'none',
// //           },
// //         }}
// //       >
// //         <Timeline>
// //           {list.map((item, index) => (
// //             <OrderItem key={item.id} item={item} isLast={index === list.length - 1} />
// //           ))}
// //         </Timeline>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// // // ----------------------------------------------------------------------

// // OrderItem.propTypes = {
// //   isLast: PropTypes.bool,
// //   item: PropTypes.shape({
// //     time: PropTypes.instanceOf(Date),
// //     title: PropTypes.string,
// //     type: PropTypes.string,
// //   }),
// // };

// // function OrderItem({ item, isLast }) {
// //   const { type, title, time } = item;
// //   return (
// //     <TimelineItem>
// //       <TimelineSeparator>
// //         <TimelineDot
// //           color={
// //             (type === 'order1' && 'primary') ||
// //             (type === 'order2' && 'success') ||
// //             (type === 'order3' && 'info') ||
// //             (type === 'order4' && 'warning') ||
// //             'error'
// //           }
// //         />
// //         {isLast ? null : <TimelineConnector />}
// //       </TimelineSeparator>

// //       <TimelineContent>
// //         <Typography variant="subtitle2">{title}</Typography>

// //         <Typography variant="caption" sx={{ color: 'text.secondary' }}>
// //           {fDateTime(time)}
// //         </Typography>
// //       </TimelineContent>
// //     </TimelineItem>
// //   );
// // }




// BannerEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;


// export default function BannerEditPage({_analyticOrderTimeline}) {


//   return (
//     <div>
//       <Timeline position="right">
//         {/* {_analyticOrderTimeline.map((item, i) => ( */}
//         {/* key={i} */}
//           <TimelineItem >
//             <TimelineSeparator>
//               <TimelineDot><Iconify icon="healthicons:officer" width={24} height={24} /></TimelineDot>
//               <TimelineConnector />
//             </TimelineSeparator>
//             <TimelineContent style={{ flex: 100 }}>
//               <Paper
//                 sx={{
//                   p: 2,
//                   bgcolor: 'grey.50012',
//                 }}
//               >
//                 <Typography variant="subtitle2">
//                    asdfg
//                     </Typography>

//                 <Typography variant="subtitle2">
//                  hello
//                 </Typography>
//                 <Typography variant="subtitle2">
//                   {/* {item?.contact_no} */}wsadsfgh
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                     dfghj
//                   {/* {moment(item?.joinDate).format('DD MMM YYYY') + ' - ' + moment(item?.endDate).format('DD MMM YYYY')} */}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                   {/* {item?.remarks} */}defgrhgj
//                 </Typography>
//               </Paper>
//             </TimelineContent>
//           </TimelineItem>
//         {/* ))} */}
//       </Timeline>
//     </div>
//   );
// }


import PropTypes from 'prop-types';
// @mui
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
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
          {list.map((item, index) => (
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
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (type === 'order1' && 'primary') ||
            (type === 'order2' && 'success') ||
            (type === 'order3' && 'info') ||
            (type === 'order4' && 'warning') ||
            'error'
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
