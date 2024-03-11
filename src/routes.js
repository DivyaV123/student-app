
import Login from './views/Login.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
    {
        meta: {
          title: 'Home'
        },
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        meta: {
          title: 'ClosedBatch'
        },
        path: '/closed_batch',
        name: 'ClosedBatch',
        component: () => import('@/views/ClosedBatch.vue')
      },
    {
        meta: {
          title: 'Registration'
        },
        path: '/registration',
        name: 'Registration',
        component: () => import('@/views/Registration.vue')
      },
      {
        meta: {
          title: 'Add reg code'
        },
        path: '/add_regcode',
        name: 'Add reg code',
        component: () => import('@/views/Add_RegCode.vue')
      },
      {
        meta: {
          title: 'Pay directly'
        },
        path: '/pay_directly',
        name: 'Pay directly',
        component: () => import('@/views/Paydirectly.vue')
      },
      {
        meta: {
          title: 'View profile'
        },
        path: '/view_profile',
        name: 'View profile',
        component: () => import('@/views/ViewProfile.vue')
      },
      {
        meta: {
          title: 'Add batch'
        },
        path: '/add_batch',
        name: 'Add batch',
        component: () => import('@/views/Add_class.vue')
      },
      {
        meta: {
          title: 'Profile'
        },
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/Profile.vue')
      },
      {
        meta: {
          title: 'Requirements'
        },
        path: '/requirements',
        name: 'Requirements',
        component: () => import('@/views/Requirements.vue')
      },
      {
        meta: {
          title: 'Refer friend'
        },
        path: '/referfriend',
        name: 'Refer friend',
        component: () => import('@/views/Refer_Friend.vue')
      },
      {
        meta: {
          title: 'Referral list'
        },
        path: '/referrallist',
        name: 'Referral list',
        component: () => import('@/views/ReferralList.vue')
      },
      {
        meta: {
          title: 'Payment course list'
        },
        path: '/paymentcourselist',
        name: 'Payment course list',
        component: () => import('@/views/PaymentCourselist.vue')
      },
    //   {
    //     meta: {
    //       title: 'Payment course'
    //     },
    //     path: '/paymentcourse',
    //     name: 'Payment course',
    //     component: () => import('@/views/PaymentCourse.vue')
    //   },
      {
        meta: {
          title: 'Payment details list'
        },
        path: '/paymentdetailslist/:id/:branchid/:repeater',
        name: 'Payment details list',
        component: () => import('@/views/PaymentDetailslist.vue')
      },
      {
        meta: {
          title: 'Student Receipt'
        },
        path: '/receipt/:paymentid',
        name: 'Student Receipt',
        component: () => import('@/views/Receipt.vue')
      },
      {
        meta: {
          title: 'Failed Payment List'
        },
        path: '/failedpaymentlist',
        name: 'Failed Payment List',
        component: () => import('@/views/FailedPaymentlist.vue')
      },
      {
        path: '/classroom/:id',
        meta: { title: 'Classroom' },
        component: () => import('@/views/Stream.vue'),
      },
      {
        path: '/room/:id',
        meta: { title: 'Classroom' },
        component: () => import('@/views/StreamView.vue'),
      },
    {
        meta: {
            title: 'Login',
            formScreen: true
        },
        path: '/login',
        name: 'login',
        component: Login
    },
    { path: '/:path(.*)', component: NotFound },


]