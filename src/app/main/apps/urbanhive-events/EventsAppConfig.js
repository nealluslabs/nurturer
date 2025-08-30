import { lazy } from 'react';


const EventsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/events',
      component: lazy(() => import('./EventsApp')),
    },
  ],
}; 

export default EventsAppConfig;