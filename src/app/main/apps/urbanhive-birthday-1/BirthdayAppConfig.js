import { lazy } from 'react';


const BirthdayOneAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/birthdayone',
      component: lazy(() => import('./BrithdayApp')),
    },
  ],
};

export default BirthdayOneAppConfig;
