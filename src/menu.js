import {

  mdiAccountSettings,
  mdiBookEducationOutline,
  mdiHomeAccount,
  mdiAccountCog,
  mdiAccountBox,
  mdiPlusThick,
  mdiFormatListBulleted,
  mdiPlaylistPlus,
  mdiCalendarMonthOutline,
  mdiTable,
  mdiAccountMultiplePlusOutline,
  mdiCashMultiple,
  mdiCashRemove

} from '@mdi/js'

export default [
 
  // 'New Course',
  // [
  //   {
  //     to: '/new_course',
  //     icon: mdiPlusThick,
  //     label: 'New Course'
  //   }
  // ],
  // 'New Course List',
  // [
  //   {
  //     to: '/new_course_list',
  //     icon: mdiFormatListBulleted,
  //     label: 'New Course List'
  //   }
  // ],

  'Add Class',
  [
    {
      to: '/add_batch',
      icon: mdiPlaylistPlus,
      label: 'Add Class'
    }
  ],
  // 'Calendar',
  // [
  //   {
  //     to: '/calendar',
  //     icon: mdiCalendarMonthOutline,
  //     label: 'Calendar'
  //   }
  // ],

  'Refer',
  [
    {
      to: '/referfriend',
      icon: mdiAccountMultiplePlusOutline,
      label: 'Refer Friend'
    },
    {
      to: '/referrallist',
      icon: mdiTable,
      label: 'Referral List'
    }
  ],

  'Payments',
  [
    {
      to: '/paymentcourselist',
      icon: mdiCashMultiple,
      label: 'Pay for a Course'
    }
  ],
  // 'Failed Payments',
  // [
  //   {
  //     to: '/failedpaymentlist',
  //     icon: mdiCashRemove,
  //     label: 'Failed Payments List'
  //   }
  // ],

  // 'Refer',
  // [
  //   {
  //       label: 'Refer',
  //       icon: mdiAccountMultiplePlusOutline,
  //       menu: [
  //         {
  //           label: 'Refer Friend',
  //           to: '/referfriend',
  //           icon: mdiAccountMultiplePlusOutline,
  //         },
  //         {
  //           label: 'Referral List',
  //           to: '/referrallist',
  //           icon: mdiTable,
  //         }
  //       ]
  //     },
  // ]



]
