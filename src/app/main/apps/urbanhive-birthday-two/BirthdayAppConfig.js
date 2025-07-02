import { lazy } from 'react';


const BirthdayTwoAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/birthdaytwo',
      component: lazy(() => import('./BrithdayApp')),
    },
  ],
};

export default BirthdayTwoAppConfig;
