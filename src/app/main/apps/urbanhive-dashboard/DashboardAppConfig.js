import { lazy } from 'react';


const DashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/dashboard',
      component: lazy(() => import('./DashboardApp')),
    },
  ],
};

export default DashboardAppConfig;
