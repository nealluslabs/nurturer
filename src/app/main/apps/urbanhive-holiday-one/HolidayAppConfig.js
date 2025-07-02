import { lazy } from 'react';


const HolidayOneAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/holidayone',
      component: lazy(() => import('./HolidayApp')),
    },
  ],
};

export default HolidayOneAppConfig;
