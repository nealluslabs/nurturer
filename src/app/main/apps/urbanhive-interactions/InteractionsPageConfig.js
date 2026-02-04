import { lazy } from 'react';


const InteractionPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/interactions',
      component: lazy(() => import('./InboxApp')),
    },
  ],
}; 

export default InteractionPageConfig;